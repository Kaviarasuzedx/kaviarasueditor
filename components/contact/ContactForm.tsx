"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, RotateCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import {
  BUDGET_OPTIONS, EMPTY_CONTACT, PROJECT_TYPES, validateContactFields,
  type ContactErrors, type ContactField, type ContactFields,
} from "@/lib/contact";

const fieldClass = "w-full appearance-none rounded-xl border border-white/15 bg-[#171717] px-4 py-3.5 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/15 disabled:opacity-60";
const fieldsOrder: ContactField[] = ["name", "email", "projectType", "budget", "message", "consent"];

type ServerResponse = {
  ok: boolean;
  message?: string;
  errors?: ContactErrors;
};

export function ContactForm() {
  const [values, setValues] = useState<ContactFields>({ ...EMPTY_CONTACT });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function update<K extends keyof ContactFields>(key: K, value: ContactFields[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key as ContactField]) {
      const result = validateContactFields(next);
      setErrors((previous) => ({ ...previous, [key]: result[key as ContactField] }));
    }
    if (status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  }

  function blur(key: ContactField) {
    setTouched((previous) => ({ ...previous, [key]: true }));
    const result = validateContactFields(values);
    setErrors((previous) => ({ ...previous, [key]: result[key] }));
  }

  function focusFirstError(problem: ContactErrors) {
    const first = fieldsOrder.find((key) => Boolean(problem[key]));
    if (first) {
      window.requestAnimationFrame(() => {
        const element = formRef.current?.elements.namedItem(first);
        if (element instanceof HTMLElement) element.focus();
      });
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "success") return;
    const issues = validateContactFields(values);
    setTouched({ name: true, email: true, projectType: true, budget: true, message: true, consent: true });
    setErrors(issues);
    if (Object.keys(issues).length > 0) {
      focusFirstError(issues);
      setFeedback("Please correct the highlighted fields.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as ServerResponse;
      if (!response.ok || !data.ok) {
        if (data.errors) {
          setErrors(data.errors);
          focusFirstError(data.errors);
        }
        throw new Error(data.message || "We couldn't send your inquiry. Please try again.");
      }
      setStatus("success");
      setFeedback(data.message || "Your inquiry was delivered.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Couldn't connect to the contact service.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="flex min-h-[540px] flex-col items-start justify-center rounded-[24px] border border-emerald-400/20 bg-emerald-400/[0.055] p-8 sm:p-12">
        <CheckCircle2 size={48} className="text-emerald-300" aria-hidden="true" />
        <p className="eyebrow mt-8 text-emerald-300">Message delivered</p>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">The first frame is in.</h2>
        <p className="mt-5 max-w-md leading-7 text-secondary">{feedback} I&apos;ll review your project details and respond as availability permits.</p>
        <button type="button" onClick={() => { setValues({ ...EMPTY_CONTACT }); setErrors({}); setTouched({}); setFeedback(""); setStatus("idle"); }} className="btn-secondary mt-10 gap-2">
          <RotateCcw size={16} aria-hidden="true" /> Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="relative rounded-[24px] border border-white/10 bg-[#111111] p-6 shadow-[0_20px_100px_rgba(0,0,0,.3)] sm:p-9 lg:p-11" aria-label="Project inquiry form">
      <div className="mb-9 flex items-start justify-between gap-5 border-b border-white/10 pb-7">
        <div>
          <p className="eyebrow">Tell me the story</p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">Let&apos;s make something great.</h2>
          <p className="mt-2 text-sm leading-6 text-secondary">Fields marked <span className="text-accent">*</span> are required.</p>
        </div>
        <span className="hidden rounded-full border border-accent/20 bg-accent/5 p-3 text-accent sm:block" aria-hidden="true"><ArrowUpRight size={24} /></span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Your name" id="name" name="name" required autoComplete="name" maxLength={80} value={values.name} onChange={(event: ChangeEvent<HTMLInputElement>) => update("name", event.target.value)} onBlur={() => blur("name")} error={errors.name} placeholder="How should I call you?" disabled={status === "sending"} />
        <Input label="Email address" id="email" name="email" required type="email" autoComplete="email" maxLength={254} value={values.email} onChange={(event: ChangeEvent<HTMLInputElement>) => update("email", event.target.value)} onBlur={() => blur("email")} error={errors.email} placeholder="you@company.com" disabled={status === "sending"} />
        <div className="space-y-2.5">
          <label htmlFor="projectType" className="block text-sm font-medium">Project type <span aria-hidden="true" className="text-accent">*</span></label>
          <select id="projectType" name="projectType" required value={values.projectType} onChange={(event) => update("projectType", event.target.value)} onBlur={() => blur("projectType")} className={fieldClass} aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? "type-error" : undefined} disabled={status === "sending"}>
            <option value="" disabled>What are you creating?</option>
            {PROJECT_TYPES.map((choice) => <option key={choice} value={choice}>{choice}</option>)}
          </select>
          {errors.projectType && <p id="type-error" role="alert" className="text-xs text-red-300">{errors.projectType}</p>}
        </div>
        <div className="space-y-2.5">
          <label htmlFor="budget" className="block text-sm font-medium">Estimated budget <span aria-hidden="true" className="text-accent">*</span></label>
          <select id="budget" name="budget" required value={values.budget} onChange={(event) => update("budget", event.target.value)} onBlur={() => blur("budget")} className={fieldClass} aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? "budget-error" : undefined} disabled={status === "sending"}>
            <option value="" disabled>Choose a range</option>
            {BUDGET_OPTIONS.map((choice) => <option key={choice} value={choice}>{choice}</option>)}
          </select>
          {errors.budget && <p id="budget-error" role="alert" className="text-xs text-red-300">{errors.budget}</p>}
        </div>
      </div>

      <div className="mt-6">
        <Textarea label="Tell me about your project" id="message" name="message" required rows={7} maxLength={2500} value={values.message} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => update("message", event.target.value)} onBlur={() => blur("message")} error={errors.message} placeholder="What's the idea? Who's the audience? Timeline, references, deliverables…" disabled={status === "sending"} />
        <p className="mt-2 text-right text-xs tabular-nums text-muted">{values.message.length.toLocaleString("en-IN")} / 2,500</p>
      </div>

      <div className="absolute left-[-99999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update("website", event.target.value)} />
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-4">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-secondary">
          <input type="checkbox" name="consent" checked={values.consent} onChange={(event) => update("consent", event.target.checked)} onBlur={() => blur("consent")} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : "consent-explanation"} className="mt-1.5 h-4 w-4 shrink-0 accent-[#FFB800]" disabled={status === "sending"} />
          <span>I agree to be contacted about my project inquiry. <span className="text-accent">*</span></span>
        </label>
        <p id="consent-explanation" className="ml-7 mt-1 text-xs leading-5 text-muted">Details go to the configured contact inbox only. They are not publicly displayed or stored by this website.</p>
        {errors.consent && <p id="consent-error" role="alert" className="ml-7 mt-2 text-xs text-red-300">{errors.consent}</p>}
      </div>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs leading-5 text-muted"><ShieldCheck size={18} className="shrink-0 text-accent" aria-hidden="true" /> Private project inquiry. No mailing lists.</div>
        <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto" size="lg">
          {status === "sending" ? <><Loader2 size={17} className="animate-spin" aria-hidden="true" /> Sending…</> : <>Send inquiry <ArrowUpRight size={17} aria-hidden="true" /></>}
        </Button>
      </div>
      {feedback && <p role="status" aria-live="polite" className={`mt-6 rounded-xl border px-4 py-3 text-sm leading-6 ${status === "error" ? "border-red-400/30 bg-red-400/5 text-red-200" : "border-white/10 text-secondary"}`}>{feedback}</p>}
    </form>
  );
}
