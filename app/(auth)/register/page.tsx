"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormState {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.password) next.password = "Password is required.";
    else if (form.password.length < 8) next.password = "Password must be at least 8 characters.";
    if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords don't match.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setFormError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setFormError("Couldn't reach the server. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <Card className="p-8">
      <h1 className="font-display text-2xl font-semibold text-text">Create your account</h1>
      <p className="mt-1 text-sm text-text-muted">Order faster and track everything in one place.</p>

      {formError && (
        <p className="mt-4 rounded-lg bg-error-light px-3 py-2 text-sm text-error">{formError}</p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <Input
          id="name"
          label="Full name"
          required
          autoComplete="name"
          value={form.name}
          error={errors.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          id="email"
          type="email"
          label="Email address"
          required
          autoComplete="email"
          value={form.email}
          error={errors.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          id="phone"
          type="tel"
          label="Phone number"
          hint="Optional — helps us reach you about your order"
          autoComplete="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          required
          autoComplete="new-password"
          hint="At least 8 characters"
          value={form.password}
          error={errors.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Input
          id="confirmPassword"
          type="password"
          label="Confirm password"
          required
          autoComplete="new-password"
          value={form.confirmPassword}
          error={errors.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        />

        <Button type="submit" size="lg" disabled={submitting} className="mt-2">
          {submitting ? "Creating account…" : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Log in
        </Link>
      </p>
    </Card>
  );
}
