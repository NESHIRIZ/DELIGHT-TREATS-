"use client";

import { useState, FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!email.trim()) next.email = "Email is required.";
    if (!password) next.password = "Password is required.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrors({ form: data.error ?? "Something went wrong. Please try again." });
        setSubmitting(false);
        return;
      }

      const redirectTo = searchParams.get("redirectTo") || "/dashboard";
      router.push(redirectTo);
      router.refresh();
    } catch {
      setErrors({ form: "Couldn't reach the server. Please check your connection and try again." });
      setSubmitting(false);
    }
  }

  return (
    <Card className="p-8">
      <h1 className="font-display text-2xl font-semibold text-text">Welcome back</h1>
      <p className="mt-1 text-sm text-text-muted">Log in to view your orders and events.</p>

      {errors.form && (
        <p className="mt-4 rounded-lg bg-error-light px-3 py-2 text-sm text-error">{errors.form}</p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <Input
          id="email"
          type="email"
          label="Email address"
          required
          autoComplete="email"
          value={email}
          error={errors.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <Input
            id="password"
            type="password"
            label="Password"
            required
            autoComplete="current-password"
            value={password}
            error={errors.password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-1.5 text-right">
            <Link href="#" className="text-xs font-medium text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button type="submit" size="lg" disabled={submitting} className="mt-2">
          {submitting ? "Logging in…" : "Log In"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </Card>
  );
}
