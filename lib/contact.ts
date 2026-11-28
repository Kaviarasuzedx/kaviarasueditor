/**
 * Dependency-free, shared browser/server inquiry schema.
 * Do not assume client-side validation protects the API: the route validates again.
 */
export const PROJECT_TYPES = [
  "Ads & Commercials",
  "Social Media / Reels",
  "Cinematic Editing",
  "YouTube Editing",
  "Sound Design",
  "Motion Graphics",
  "Something else",
] as const;

export const CONTACT_CAPTCHA_ACTION = "contact";

export const BUDGET_OPTIONS = [
  "Under ₹10,000",
  "₹10,000–₹25,000",
  "₹25,000–₹50,000",
  "₹50,000–₹1,00,000",
  "₹1,00,000+",
  "Let's discuss",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type Budget = (typeof BUDGET_OPTIONS)[number];

export type ContactFields = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  consent: boolean;
  website: string; // Honeypot. Real visitors never see this field.
};

export type ContactField = keyof Pick<
  ContactFields,
  "name" | "email" | "projectType" | "budget" | "message" | "consent"
>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const EMPTY_CONTACT: ContactFields = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
  consent: false,
  website: "",
};

export function validateContactFields(value: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  const name = value.name.trim();
  const email = value.email.trim();
  const message = value.message.trim();

  if (name.length < 2 || name.length > 80 || /[\r\n\x00-\x1F]/.test(name)) {
    errors.name = "Enter your name (2–80 characters).";
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!PROJECT_TYPES.some((item) => item === value.projectType)) {
    errors.projectType = "Choose a project type.";
  }
  if (!BUDGET_OPTIONS.some((item) => item === value.budget)) {
    errors.budget = "Choose a budget range.";
  }
  if (message.length < 20 || message.length > 2500) {
    errors.message = "Describe your project in 20–2,500 characters.";
  }
  if (value.consent !== true) {
    errors.consent = "Please agree to be contacted about your inquiry.";
  }
  return errors;
}

function objectLike(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Parse unknown JSON without coercing numbers, arrays or booleans into strings. */
export function parseContactPayload(payload: unknown):
  | { ok: true; data: ContactFields }
  | { ok: false; errors: ContactErrors } {
  if (!objectLike(payload)) {
    return { ok: false, errors: { message: "Invalid request data." } };
  }
  const keys = ["name", "email", "projectType", "budget", "message", "website"] as const;
  for (const key of keys) {
    if (typeof payload[key] !== "string") {
      return { ok: false, errors: { [key === "website" ? "message" : key]: "Invalid field value." } };
    }
  }
  if (typeof payload.consent !== "boolean") {
    return { ok: false, errors: { consent: "Invalid consent value." } };
  }
  const data: ContactFields = {
    name: (payload.name as string).trim(),
    email: (payload.email as string).trim().toLowerCase(),
    projectType: payload.projectType as string,
    budget: payload.budget as string,
    message: (payload.message as string).trim(),
    consent: payload.consent,
    website: payload.website as string,
  };
  // Honeypot values are rejected, never emailed.
  if (data.website !== "") {
    return { ok: false, errors: { message: "Unable to process this inquiry." } };
  }
  const errors = validateContactFields(data);
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data };
}
