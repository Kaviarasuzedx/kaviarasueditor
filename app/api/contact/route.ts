import { CONTACT_CAPTCHA_ACTION, parseContactPayload } from "@/lib/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 16 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function json(body: unknown, status: number, extras?: HeadersInit): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extras },
  });
}

/** Per-instance rate limit: useful as a first barrier, not a distributed production limit. */
function isRateLimited(key: string): boolean {
  const now = Date.now();
  if (hits.size > 2000) {
    for (const [id, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(id);
    }
  }
  const current = hits.get(key);
  if (!current || current.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

async function limitedBody(request: Request): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const parts: Uint8Array[] = [];
  let bytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > MAX_BYTES) {
      await reader.cancel();
      return null;
    }
    parts.push(value);
  }
  const result = new Uint8Array(bytes);
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(result);
}

function sameSiteOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin || origin === "null") return false;
  try {
    const submitted = new URL(origin).origin;
    const actual = new URL(request.url).origin;
    const configured = process.env.NEXT_PUBLIC_SITE_URL;
    return submitted === actual || (Boolean(configured) && submitted === new URL(configured!).origin);
  } catch {
    return false;
  }
}

export async function POST(request: Request): Promise<Response> {
  if (!sameSiteOrigin(request)) {
    return json({ ok: false, message: "Cross-site submissions are not accepted." }, 403);
  }
  if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
    return json({ ok: false, message: "Please send JSON data." }, 415);
  }
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BYTES) {
    return json({ ok: false, message: "Request is too large." }, 413);
  }

  let body: unknown;
  try {
    const text = await limitedBody(request);
    if (text === null) return json({ ok: false, message: "Request is too large." }, 413);
    body = JSON.parse(text);
  } catch {
    return json({ ok: false, message: "Invalid JSON body." }, 400);
  }

  const parsed = parseContactPayload(body);
  if (!parsed.ok) {
    return json({ ok: false, message: "Please correct the highlighted fields.", errors: parsed.errors }, 422);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  // Do not claim delivery when no provider/inbox is configured.
  if (!apiKey || !from || !to) {
    return json({ ok: false, message: "The contact inbox isn't connected yet. Please use an available direct contact link." }, 503);
  }

  const { captchaToken } = body as { captchaToken?: unknown };
  if (typeof captchaToken !== "string" || !captchaToken.trim() || captchaToken.length > 2048) {
    return json({ ok: false, message: "Please complete human verification before sending your inquiry." }, 422);
  }
  const configuredSecret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const developmentTestKey = !configuredSecret && process.env.NODE_ENV === "development";
  const secret = configuredSecret || (developmentTestKey ? "1x0000000000000000000000000000000AA" : "");
  if (!secret) {
    return json({ ok: false, message: "Human verification is unavailable. Please use a direct contact link." }, 503);
  }

  // Header is normally supplied by the hosting proxy. This limiter is best effort only.
  const clientId = request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unidentified";
  if (isRateLimited(clientId)) {
    return json({ ok: false, message: "Too many inquiries. Please try again later." }, 429, { "Retry-After": "600" });
  }

  try {
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: captchaToken }),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!verification.ok) throw new Error("Human verification provider unavailable");
    const result = await verification.json() as { success?: boolean; action?: string; hostname?: string };
    const hostname = new URL(request.headers.get("origin")!).hostname;
    if (result.success !== true || (!developmentTestKey && (result.action !== CONTACT_CAPTCHA_ACTION || result.hostname !== hostname))) {
      return json({ ok: false, message: "Human verification could not be confirmed. Please try the challenge again." }, 422);
    }
  } catch {
    return json({ ok: false, message: "Human verification is temporarily unavailable. Please try again." }, 503);
  }

  const { name, email, projectType, budget, message } = parsed.data;
  const text = [
    "New portfolio project inquiry",
    "Name: " + name,
    "Email: " + email,
    "Project: " + projectType,
    "Budget: " + budget,
    "--- Brief ---",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio inquiry: ${projectType}`,
        text,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      // Don't leak provider details, credentials or inquiry content in logs.
      console.error("Contact email provider returned status", response.status);
      return json({ ok: false, message: "Couldn't send the inquiry. Please try another contact method." }, 502);
    }
    return json({ ok: true, message: "Your inquiry was sent successfully. Thank you for reaching out!" }, 200);
  } catch {
    console.error("Contact email provider could not be reached");
    return json({ ok: false, message: "The contact service is temporarily unavailable. Please try again." }, 502);
  }
}
