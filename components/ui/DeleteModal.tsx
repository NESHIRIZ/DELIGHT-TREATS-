"use client";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteModal({ title, onConfirm, onCancel }: Props) {
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
          initial={{ scale: 0.88, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -6, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl mb-4"
          >
            🗑️
          </motion.div>
          <h3 className="text-xl font-bold mb-2" style={{ color: "#1F2937" }}>
            Delete Event?
          </h3>
          <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
            Are you sure you want to delete{" "}
            <strong style={{ color: "#1F2937" }}>{title}</strong>?{" "}
            This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={onCancel}
              className="flex-1 py-3 rounded-full font-semibold text-sm transition-all"
              style={{ border: "1px solid #E5E7EB", color: "#6B7280" }}
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(239,68,68,0.35)" }}
              whileTap={{ scale: 0.96 }}
              onClick={onConfirm}
              className="flex-1 py-3 rounded-full font-semibold text-sm text-white"
              style={{ background: "#EF4444" }}
            >
              Yes, Delete
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}