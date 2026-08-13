"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Event } from "./EventCard";

type Props = {
  event: Partial<Event> | null;
  onSave: (e: Event) => void;
  onClose: () => void;
};

export default function EventFormModal({ event, onSave, onClose }: Props) {
  const [title, setTitle] = useState(event?.title ?? "");
  const [date, setDate] = useState(event?.date ?? "");
  const [type, setType] = useState(event?.type ?? "");

  const handleSave = () => {
    if (!title || !date || !type) return;

    onSave({
      id: event?.id ?? Date.now(),
      title,
      date,
      type,
      status: event?.status ?? "Planning",
      guests: event?.guests ?? [],
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: "rgba(0,0,0,0.45)" }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
        >
          <h3 className="text-xl font-bold mb-6">
            {event?.id ? "Edit Event" : "Create New Event"}
          </h3>

          <div className="space-y-4">
            <input
              className="w-full border rounded-xl px-4 py-3"
              placeholder="Event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="date"
              className="w-full border rounded-xl px-4 py-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              className="w-full border rounded-xl px-4 py-3"
              placeholder="Event type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-full border"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-full bg-pink-500 text-white font-semibold"
            >
              {event?.id ? "Save Changes" : "Create Event"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}