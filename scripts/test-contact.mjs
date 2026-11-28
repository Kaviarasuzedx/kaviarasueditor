/** Node 22+ integration tests without an email account or network connection.
 * Uses native TypeScript type-stripping to exercise the real TS validator and API.
 */
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import {
  EMPTY_CONTACT,
  CONTACT_CAPTCHA_ACTION,
  PROJECT_TYPES,
  BUDGET_OPTIONS,
  parseContactPayload,
  validateContactFields,
} from "../lib/contact.ts";

const valid = {
  ...EMPTY_CONTACT,
  name: "Test Client",
  email: "contact@example.com",
  projectType: PROJECT_TYPES[0],
  budget: BUDGET_OPTIONS[1],
  message: "We need a 30-second campaign edit for our brand.",
  consent: true,
};

assert.deepEqual(validateContactFields(valid), {});
assert.equal(parseContactPayload(valid).ok, true);
assert.equal(parseContactPayload({ ...valid, name: "X" }).ok, false);
assert.equal(parseContactPayload({ ...valid, email: "broken-address" }).ok, false);
assert.equal(parseContactPayload({ ...valid, projectType: "fake" }).ok, false);
assert.equal(parseContactPayload({ ...valid, budget: "∞" }).ok, false);
assert.equal(parseContactPayload({ ...valid, consent: false }).ok, false);
assert.equal(parseContactPayload({ ...valid, website: "spambot" }).ok, false);
assert.equal(parseContactPayload({ ...valid, email: 123 }).ok, false);
assert.equal(parseContactPayload(null).ok, false);
assert.equal(parseContactPayload({ ...valid, message: "A".repeat(2501) }).ok, false);
console.log("Validator: 10 cases passed");

// Exercise the actual source of the Next.js handler without needing Next.js installed.
// Only the path alias is rewritten in a *temporary* file to work in native Node ESM.
const routePath = fileURLToPath(new URL("../app/api/contact/route.ts", import.meta.url));
const temporary = path.join(path.dirname(routePath), "__contact_test_route.ts");
writeFileSync(temporary, readFileSync(routePath, "utf8").replace('from "@/lib/contact"', 'from "../../../lib/contact.ts"'));
let POST;
try {
  ({ POST } = await import(pathToFileURL(temporary).href));
} finally {
  unlinkSync(temporary);
}

const url = "http://localhost:3000/api/contact";
function request(value, override = {}) {
  return new Request(url, {
    method: "POST",
    headers: { origin: "http://localhost:3000", "content-type": "application/json", ...override },
    body: JSON.stringify(value),
  });
}
process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
delete process.env.RESEND_API_KEY;
delete process.env.CONTACT_FROM_EMAIL;
delete process.env.CONTACT_TO_EMAIL;
delete process.env.TURNSTILE_SECRET_KEY;

assert.equal((await POST(request(valid, { origin: "https://other-site.example" }))).status, 403);
assert.equal((await POST(request(valid, { "content-type": "text/plain" }))).status, 415);
assert.equal((await POST(request({ ...valid, message: "too short" }))).status, 422);
assert.equal((await POST(request(valid))).status, 503, "Unconfigured inbox must never report success");
assert.equal((await POST(request({ ...valid, message: "x".repeat(17000) }))).status, 413);

process.env.RESEND_API_KEY = "test-only-do-not-send";
process.env.CONTACT_FROM_EMAIL = "website@portfolio.example";
process.env.CONTACT_TO_EMAIL = "owner@portfolio.example";
assert.equal((await POST(request(valid))).status, 422, "Missing CAPTCHA must be rejected");
process.env.TURNSTILE_SECRET_KEY = "mock-turnstile-secret";
const verifiedForm = { ...valid, captchaToken: "mock-turnstile-token" };
const originalFetch = globalThis.fetch;
const sent = [];
const verifyEndpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const verification = { success: true, action: CONTACT_CAPTCHA_ACTION, hostname: "localhost" };
try {
  let verificationResult = Response.json(verification);
  let mailStatus = 200;
  globalThis.fetch = async (endpoint, options) => {
    if (endpoint === verifyEndpoint) {
      assert.equal(options.body.get("secret"), "mock-turnstile-secret");
      assert.equal(options.body.get("response"), verifiedForm.captchaToken);
      return verificationResult.clone();
    }
    sent.push({ endpoint, options });
    return Response.json({ id: "mocked-message" }, { status: mailStatus });
  };
  const success = await POST(request(verifiedForm, { "x-real-ip": "198.51.100.11" }));
  assert.equal(success.status, 200);
  assert.equal((await success.json()).ok, true);
  assert.equal(sent[0].endpoint, "https://api.resend.com/emails");
  const payload = JSON.parse(sent[0].options.body);
  assert.equal(payload.reply_to, "contact@example.com");
  assert.equal(payload.to[0], "owner@portfolio.example");
  assert.match(payload.text, /30-second campaign/);
  assert.doesNotMatch(payload.text, /mock-turnstile-token/);

  mailStatus = 401;
  assert.equal((await POST(request(verifiedForm, { "x-real-ip": "198.51.100.12" }))).status, 502);

  for (const result of [
    { success: false, "error-codes": ["timeout-or-duplicate"] },
    { ...verification, action: "different-form" },
    { ...verification, hostname: "other-site.example" },
  ]) {
    verificationResult = Response.json(result);
    assert.equal((await POST(request(verifiedForm, { "x-real-ip": "198.51.100.13" }))).status, 422);
  }
  verificationResult = new Response(null, { status: 503 });
  assert.equal((await POST(request(verifiedForm, { "x-real-ip": "198.51.100.13" }))).status, 503);
  assert.equal(sent.length, 2, "CAPTCHA failures must prevent email delivery");
} finally {
  globalThis.fetch = originalFetch;
}
console.log("API: 12 cases passed, including required CAPTCHA, rejected or reused tokens, hostname and action checks, and provider failures");
console.log("No real email was sent.");
