"use client";
import { useEffect, useState } from "react";
import { Event } from "./EventCard";
import { Guest } from "./GuestForm";

/**
 * useEvents
 * ─────────────────────────────────────────────────────────────────────────
 * This hook is the ONLY place that touches event/guest data.
 * EventsTab, EventCard, GuestForm, etc. never talk to storage directly —
 * they call the functions this hook returns.
 *
 * Right now every function below reads/writes an in-memory array (mockEvents),
 * because the database (DT-17/DT-18) isn't ready yet.
 *
 * WHEN THE DATABASE + API ROUTES ARE READY:
 * Every function marked "// TODO: swap for real API call" gets its body
 * replaced with a fetch() to the matching route. The function's name,
 * parameters, and return type stay the same — so EventsTab, EventCard,
 * GuestForm, and GuestList never need to change at all.
 *
 * Expected API routes (per Sprint 3 tickets):
 *   GET    /api/events            -> Event[]
 *   POST   /api/events            -> create event, returns Event
 *   PUT    /api/events/:id        -> update event, returns Event
 *   DELETE /api/events/:id        -> delete event
 *   POST   /api/events/:id/guests -> add guest, returns Guest
 *   DELETE /api/events/:id/guests/:guestId -> remove guest
 * ─────────────────────────────────────────────────────────────────────────
 */

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Birthday Party",
    date: "Aug 20, 2026",
    type: "Birthday",
    status: "Upcoming",
    guests: [
      { id: 1, name: "Adults", count: 20, dietary: "None" },
      { id: 2, name: "Children", count: 10, dietary: "Nut-free" },
    ],
  },
  {
    id: 2,
    title: "Office Celebration",
    date: "Sep 5, 2026",
    type: "Corporate",
    status: "Planning",
    guests: [{ id: 1, name: "Staff", count: 35, dietary: "Vegan options needed" }],
  },
];

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Load all events ──────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function loadEvents() {
      setLoading(true);
      setError(null);
      try {
        // TODO: swap for real API call
        // const res = await fetch("/api/events");
        // if (!res.ok) throw new Error("Failed to load events");
        // const data: Event[] = await res.json();
        const data = await new Promise<Event[]>((resolve) =>
          setTimeout(() => resolve(mockEvents), 200)
        );
        if (!cancelled) setEvents(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load events");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadEvents();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Create or update an event ────────────────────────────────────────
  async function saveEvent(saved: Event): Promise<void> {
    const isNew = !events.some((e) => e.id === saved.id);

    // TODO: swap for real API call
    // const res = await fetch(isNew ? "/api/events" : `/api/events/${saved.id}`, {
    //   method: isNew ? "POST" : "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(saved),
    // });
    // if (!res.ok) throw new Error("Failed to save event");
    // const result: Event = await res.json();

    const result = saved; // stand-in until the API exists

    setEvents((prev) =>
      isNew ? [...prev, result] : prev.map((e) => (e.id === result.id ? result : e))
    );
  }

  // ── Delete an event ───────────────────────────────────────────────────
  async function deleteEvent(eventId: number): Promise<void> {
    // TODO: swap for real API call
    // const res = await fetch(`/api/events/${eventId}`, { method: "DELETE" });
    // if (!res.ok) throw new Error("Failed to delete event");

    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  }

  // ── Add a guest to an event ──────────────────────────────────────────
  async function addGuest(eventId: number, guest: Guest): Promise<void> {
    // TODO: swap for real API call
    // const res = await fetch(`/api/events/${eventId}/guests`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(guest),
    // });
    // if (!res.ok) throw new Error("Failed to add guest");
    // const created: Guest = await res.json();

    const created = guest; // stand-in until the API exists

    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, guests: [...e.guests, created] } : e))
    );
  }

  // ── Remove a guest from an event ─────────────────────────────────────
  async function removeGuest(eventId: number, guestId: number): Promise<void> {
    // TODO: swap for real API call
    // const res = await fetch(`/api/events/${eventId}/guests/${guestId}`, { method: "DELETE" });
    // if (!res.ok) throw new Error("Failed to remove guest");

    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId ? { ...e, guests: e.guests.filter((g) => g.id !== guestId) } : e
      )
    );
  }

  return { events, loading, error, saveEvent, deleteEvent, addGuest, removeGuest };
}