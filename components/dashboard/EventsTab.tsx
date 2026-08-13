"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import EventCard, { Event } from "./EventCard";
import { Guest } from "./GuestForm";
import DeleteModal from "@/components/ui/DeleteModal";
import EventFormModal from "./EventFormModal";

const mockEvents: Event[] = [
  {
    id: 1, title: "Birthday Party", date: "Aug 20, 2026", type: "Birthday", status: "Upcoming",
    guests: [
      { id: 1, name: "Adults", count: 20, dietary: "None" },
      { id: 2, name: "Children", count: 10, dietary: "Nut-free" },
    ],
  },
  {
    id: 2, title: "Office Celebration", date: "Sep 5, 2026", type: "Corporate", status: "Planning",
    guests: [{ id: 1, name: "Staff", count: 35, dietary: "Vegan options needed" }],
  },
];

export default function EventsTab() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [deleteTarget, setDeleteTarget] = useState<Event | null>(null);
  const [formState, setFormState] = useState<{ open: boolean; event: Partial<Event> | null }>({ open: false, event: null });

  const handleSaveEvent = (saved: Event) => {
    setEvents((prev) =>
      prev.some((e) => e.id === saved.id)
        ? prev.map((e) => (e.id === saved.id ? saved : e))
        : [...prev, saved]
    );
    setFormState({ open: false, event: null });
  };

  const handleAddGuest = (eventId: number, guest: Guest) =>
    setEvents((prev) => prev.map((e) => e.id === eventId ? { ...e, guests: [...e.guests, guest] } : e));

  const handleRemoveGuest = (eventId: number, guestId: number) =>
    setEvents((prev) => prev.map((e) => e.id === eventId ? { ...e, guests: e.guests.filter((g) => g.id !== guestId) } : e));

  return (
    <>
      <AnimatePresence>
        {deleteTarget && (
          <DeleteModal
            title={deleteTarget.title}
            onConfirm={() => { setEvents((prev) => prev.filter((e) => e.id !== deleteTarget.id)); setDeleteTarget(null); }}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
        {formState.open && (
          <EventFormModal event={formState.event} onSave={handleSaveEvent} onClose={() => setFormState({ open: false, event: null })} />
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold" style={{ color: "#1F2937" }}>My Events</h2>
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(236,72,153,0.3)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setFormState({ open: true, event: null })}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold"
          style={{ background: "#EC4899" }}
        >
          <Plus size={16} /> New Event
        </motion.button>
      </div>

      {events.length === 0 ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
          <div className="text-6xl mb-4">🎉</div>
          <p className="font-semibold text-lg" style={{ color: "#1F2937" }}>No events yet</p>
          <p className="text-sm mt-1" style={{ color: "#6B7280" }}>Create your first event to get started.</p>
        </motion.div>
      ) : (
        <AnimatePresence>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={(e) => setFormState({ open: true, event: e })}
              onDelete={setDeleteTarget}
              onAddGuest={handleAddGuest}
              onRemoveGuest={handleRemoveGuest}
            />
          ))}
        </AnimatePresence>
      )}
    </>
  );
}