"use client";

import { useState, FormEvent } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.message.trim()) next.message = "Message is required.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }, 500);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-display text-4xl font-semibold text-text">Get in Touch</h1>
        <p className="mx-auto mt-3 max-w-md text-text-muted">
          Questions about an order, a custom cake, or an event? We&apos;d love to hear
          from you.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <ContactRow icon={MapPin} label="Visit Us" value="142 Baker Street, Riverside" />
          <ContactRow icon={Phone} label="Call Us" value="(555) 019-2837" />
          <ContactRow icon={Mail} label="Email Us" value="hello@delighttreats.com" />
          <ContactRow icon={Clock} label="Hours" value="Tue–Sun, 7am–6pm · Closed Mondays" />
        </div>

        <Card className="p-6 lg:col-span-3">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <CheckCircle2 className="h-9 w-9 text-success" />
              <p className="font-display text-lg font-semibold text-text">Message sent!</p>
              <p className="text-sm text-text-muted">We&apos;ll get back to you within a day.</p>
              <Button variant="outline" size="sm" onClick={() => setSubmitted(false)} className="mt-2">
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                id="name"
                label="Your name"
                required
                value={form.name}
                error={errors.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                id="email"
                type="email"
                label="Email address"
                required
                value={form.email}
                error={errors.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Textarea
                id="message"
                label="Message"
                required
                rows={5}
                value={form.message}
                error={errors.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <Button type="submit" size="lg" disabled={submitting} className="mt-2">
                {submitting ? "Sending…" : "Send Message"}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-full bg-primary-light p-2.5 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-medium text-text">{label}</p>
        <p className="text-sm text-text-muted">{value}</p>
      </div>
    </div>
  );
}
