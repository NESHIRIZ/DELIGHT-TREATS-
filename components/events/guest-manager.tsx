"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Users } from "lucide-react";
import { Guest } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function GuestManager({ eventId, initialGuests }: { eventId: string; initialGuests: Guest[] }) {
  const router = useRouter();
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [count, setCount] = useState("1");
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const totalGuests = guests.reduce((sum, g) => sum + g.count, 0);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Guest group name is required.");
      return;
    }
    const parsedCount = Number(count);
    if (!parsedCount || parsedCount < 1) {
      setError("Enter a valid guest count.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/events/${eventId}/guests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, count: parsedCount, dietaryNotes: dietaryNotes || undefined }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Couldn't add that guest group. Please try again.");
        setSubmitting(false);
        return;
      }

      const data = await res.json();
      setGuests(data.event.guests);
      setName("");
      setCount("1");
      setDietaryNotes("");
      setShowForm(false);
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRemove(id: string) {
    const previous = guests;
    setRemovingId(id);
    // Optimistic update — remove immediately, roll back if the request fails.
    setGuests((prev) => prev.filter((g) => g.id !== id));

    try {
      const res = await fetch(`/api/events/${eventId}/guests/${id}`, { method: "DELETE" });
      if (!res.ok) {
        setGuests(previous);
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Couldn't remove that guest group. Please try again.");
        return;
      }
      router.refresh();
    } catch {
      setGuests(previous);
      setError("Couldn't reach the server. Please check your connection and try again.");
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-base font-semibold text-text">
          <Users className="h-4 w-4 text-primary" /> Guests
          <span className="text-sm font-normal text-text-muted">({totalGuests} total)</span>
        </h3>
        {!showForm && (
          <Button size="sm" variant="outline" onClick={() => setShowForm(true)}>
            <Plus className="h-3.5 w-3.5" /> Add Group
          </Button>
        )}
      </div>

      {guests.length === 0 && !showForm ? (
        <p className="mt-3 text-sm text-text-muted">
          No guest groups added yet. Add one to help us plan quantities.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {guests.map((guest) => (
            <li key={guest.id}>
              <Card className="flex items-center justify-between p-3.5">
                <div>
                  <p className="text-sm font-medium text-text">{guest.name}</p>
                  <p className="text-xs text-text-muted">
                    {guest.count} {guest.count === 1 ? "guest" : "guests"}
                    {guest.dietaryNotes && ` · ${guest.dietaryNotes}`}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(guest.id)}
                  disabled={removingId === guest.id}
                  className="rounded-full p-1.5 text-text-muted hover:bg-error-light hover:text-error disabled:opacity-40"
                  aria-label={`Remove ${guest.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </Card>
            </li>
          ))}
        </ul>
      )}

      {showForm && (
        <Card className="mt-3 p-4">
          <form onSubmit={handleAdd} className="flex flex-col gap-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                id="guestName"
                label="Group name"
                placeholder="e.g. Bride's Family"
                value={name}
                error={error && !name.trim() ? error : undefined}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                id="guestCount"
                type="number"
                min={1}
                label="Guest count"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
            </div>
            <Input
              id="dietaryNotes"
              label="Dietary notes"
              hint="Optional"
              placeholder="e.g. 2 vegetarian, 1 nut allergy"
              value={dietaryNotes}
              onChange={(e) => setDietaryNotes(e.target.value)}
            />
            {error && name.trim() && <p className="text-xs text-error">{error}</p>}
            <div className="flex gap-2">
              <Button type="submit" size="sm" disabled={submitting}>
                {submitting ? "Adding…" : "Add Guest Group"}
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => setShowForm(false)} disabled={submitting}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
