"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BakeryEvent, EventType } from "@/types";

const eventTypes: { id: EventType; label: string }[] = [
  { id: "wedding", label: "Wedding" },
  { id: "birthday", label: "Birthday" },
  { id: "corporate", label: "Corporate" },
  { id: "baby-shower", label: "Baby Shower" },
  { id: "other", label: "Other" },
];

interface EventFormState {
  name: string;
  type: EventType;
  date: string;
  guestCountEstimate: string;
  requirements: string;
}

export function EventForm({
  mode,
  initialEvent,
}: {
  mode: "create" | "edit";
  initialEvent?: BakeryEvent;
}) {
  const router = useRouter();
  const [form, setForm] = useState<EventFormState>({
    name: initialEvent?.name ?? "",
    type: initialEvent?.type ?? "wedding",
    date: initialEvent?.date ? initialEvent.date.slice(0, 10) : "",
    guestCountEstimate: initialEvent?.guestCountEstimate?.toString() ?? "",
    requirements: initialEvent?.requirements ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EventFormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  function validate(): boolean {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Event name is required.";
    if (!form.date) next.date = "Event date is required.";
    if (!form.guestCountEstimate || Number(form.guestCountEstimate) < 1)
      next.guestCountEstimate = "Enter an estimated guest count.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const url = mode === "edit" && initialEvent ? `/api/events/${initialEvent.id}` : "/api/events";
      const method = mode === "edit" ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          type: form.type,
          date: form.date,
          guestCountEstimate: Number(form.guestCountEstimate),
          requirements: form.requirements || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setFormError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      const data = await res.json();
      router.push(`/dashboard/events/${data.event.id}`);
      router.refresh();
    } catch {
      setFormError("Couldn't reach the server. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {formError && (
        <p className="rounded-lg bg-error-light px-3 py-2 text-sm text-error">{formError}</p>
      )}
      <Input
        id="name"
        label="Event name"
        required
        placeholder="e.g. Maya & Sam's Wedding"
        value={form.name}
        error={errors.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <fieldset>
        <legend className="mb-2.5 text-sm font-semibold text-text">
          Event type <span className="text-primary">*</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setForm({ ...form, type: type.id })}
              aria-pressed={form.type === type.id}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                form.type === type.id
                  ? "border-primary bg-primary text-white"
                  : "border-accent text-text hover:border-primary/50"
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="date"
          type="date"
          label="Event date"
          required
          value={form.date}
          error={errors.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <Input
          id="guestCountEstimate"
          type="number"
          min={1}
          label="Estimated guest count"
          required
          value={form.guestCountEstimate}
          error={errors.guestCountEstimate}
          onChange={(e) => setForm({ ...form, guestCountEstimate: e.target.value })}
        />
      </div>

      <Textarea
        id="requirements"
        label="Requirements & notes"
        hint="Cake preferences, dietary restrictions, catering needs, etc. (optional)"
        rows={4}
        value={form.requirements}
        onChange={(e) => setForm({ ...form, requirements: e.target.value })}
      />

      <div className="flex gap-3">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting
            ? "Saving…"
            : mode === "create"
              ? "Create Event"
              : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
