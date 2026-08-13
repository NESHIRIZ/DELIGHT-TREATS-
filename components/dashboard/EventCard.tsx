"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, Users, ChevronDown } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import GuestList from "./GuestList";
import GuestForm, { Guest } from "./GuestForm";

export type Event = {
  id: number;
  title: string;
  date: string;
  type: string;
  status: "Upcoming" | "Planning" | "Completed";
  guests: Guest[];
};

type Props = {
  event: Event;
  onEdit: (e: Event) => void;
  onDelete: (e: Event) => void;
  onAddGuest: (eventId: number, guest: Guest) => void;
  onRemoveGuest: (eventId: number, guestId: number) => void;
};

export default function EventCard({ event, onEdit, onDelete, onAddGuest, onRemoveGuest }: Props) {
  const [expanded, setExpanded] = useState(false);
  const totalGuests = event.guests.reduce((s, g) => s + g.count, 0);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      className="rounded-2xl mb-4 overflow-hidden"
      style={{ border: "1px solid #E5E7EB" }}
      whileHover={{ boxShadow: "0 4px 24px rgba(236,72,153,0.09)" }}
    >
      {/* Card Header */}
      <div
        className="flex items-center justify-between p-5 transition-colors"
        style={{ background: expanded ? "#FFF5F7" : "white" }}
      >
        <div>
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <span className="font-bold text-base" style={{ color: "#1F2937" }}>
              {event.title}
            </span>
            <StatusBadge status={event.status} />
          </div>
          <p className="text-xs mb-1" style={{ color: "#6B7280" }}>
            {event.type} · {event.date}
          </p>
          <p className="text-xs font-medium flex items-center gap-1" style={{ color: "#EC4899" }}>
            <Users size={11} />
            {totalGuests} total guests
          </p>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(event)}
            aria-label="Edit event"
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "#FCE7F3" }}
          >
            <Edit2 size={14} color="#EC4899" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(event)}
            aria-label="Delete event"
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "#FEE2E2" }}
          >
            <Trash2 size={14} color="#EF4444" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ background: "#FCE7F3", color: "#EC4899" }}
          >
            Guests
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={13} />
            </motion.span>
          </motion.button>
        </div>
      </div>

      {/* Guest Panel */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="guests"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ borderTop: "1px solid #F3F4F6", overflow: "hidden" }}
          >
            <div className="px-5 pb-5 pt-4">
              <p className="text-sm font-semibold mb-3" style={{ color: "#1F2937" }}>
                Guest Groups
              </p>
              <GuestList
                guests={event.guests}
                onRemove={(guestId) => onRemoveGuest(event.id, guestId)}
              />
              <GuestForm onAdd={(g) => onAddGuest(event.id, g)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}