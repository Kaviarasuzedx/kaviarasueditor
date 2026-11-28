"use client";

import { forwardRef, useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label: string;
  hint?: string;
  error?: string;
};

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
  error?: string;
  autoResize?: boolean;
};

const fieldClass = "w-full rounded-xl border border-white/15 bg-[#171717] px-4 py-3.5 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-60";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, id, className, required, ...props }, ref
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const descriptionId = `${fieldId}-description`;

  return (
    <div className="space-y-2.5">
      <label htmlFor={fieldId} className="block text-sm font-medium text-foreground">
        {label}{required && <span className="ml-1 text-accent" aria-hidden="true">*</span>}
      </label>
      <input
        id={fieldId}
        ref={ref}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error || hint ? descriptionId : undefined}
        className={cn(fieldClass, error && "border-red-400 focus:border-red-400 focus:ring-red-400/15", className)}
        {...props}
      />
      {(error || hint) && (
        <p id={descriptionId} role={error ? "alert" : undefined} className={cn("text-xs", error ? "text-red-300" : "text-muted")}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, id, className, required, rows = 5, autoResize = false, ...props }, ref
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const descriptionId = `${fieldId}-description`;

  return (
    <div className="space-y-2.5">
      <label htmlFor={fieldId} className="block text-sm font-medium text-foreground">
        {label}{required && <span className="ml-1 text-accent" aria-hidden="true">*</span>}
      </label>
      <textarea
        id={fieldId}
        ref={ref}
        required={required}
        rows={rows}
        onInput={(event) => {
          props.onInput?.(event);
          if (autoResize) {
            event.currentTarget.style.height = "auto";
            event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
          }
        }}
        aria-invalid={Boolean(error)}
        aria-describedby={error || hint ? descriptionId : undefined}
        className={cn(fieldClass, autoResize ? "resize-none overflow-hidden" : "resize-y", error && "border-red-400 focus:border-red-400 focus:ring-red-400/15", className)}
        {...props}
      />
      {(error || hint) && (
        <p id={descriptionId} role={error ? "alert" : undefined} className={cn("text-xs", error ? "text-red-300" : "text-muted")}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
});
