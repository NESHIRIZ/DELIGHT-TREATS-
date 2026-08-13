"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Guest } from "./GuestForm";

type Props = {
  guests: Guest[];
  onRemove: (id: number) => void;
};

export default function GuestList({ guests, onRemove }: Props) {
  if (guests.length === 0) {
    return (
      <p className="text-sm py-2" style={{ color: "#6B7280" }}>
        No guest groups added yet.
      </p>
    );
  }

  return (
    <AnimatePresence>
      {guests.map((guest) => (
        <motion.div
          key={guest.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
          layout
          className="flex items-center justify-between py-2.5 px-4 rounded-xl mb-2"
          style={{ background: "#F9FAFB", border: "1px solid #F3F4F6" }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: "#1F2937" }}>
              {guest.name}{" "}
              <span style={{ color: "#EC4899" }}>· {guest.count} people</span>
            </p>
            {guest.dietary && (
              <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                {guest.dietary}
              </p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRemove(guest.id)}
            aria-label="Remove guest group"
          >
            <Trash2 size={15} color="#9CA3AF" />
          </motion.button>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}