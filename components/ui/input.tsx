import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FieldWrapperProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

const fieldBaseClasses =
  "w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted transition-colors focus:outline-none disabled:bg-accent/40 disabled:text-text-muted";

function fieldBorder(error?: string) {
  return error
    ? "border-error focus:border-error"
    : "border-accent focus:border-primary";
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperProps & { id: string };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, required, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text">
            {label} {required && <span className="text-primary">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(fieldBaseClasses, fieldBorder(error), className)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className="mt-1.5 text-xs text-error">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-xs text-text-muted">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  FieldWrapperProps & { id: string };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, required, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text">
            {label} {required && <span className="text-primary">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(fieldBaseClasses, fieldBorder(error), "resize-none", className)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className="mt-1.5 text-xs text-error">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-xs text-text-muted">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
