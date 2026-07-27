"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          />

          {/* Modal Box */}
          <motion.div
            className={`fixed z-50 w-full ${sizes[size]} bg-white rounded-2xl shadow-2xl overflow-hidden`}
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid #E5E7EB" }}
            >
              <h2 className="text-lg font-bold" style={{ color: "#1F2937" }}>
                {title}
              </h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{ background: "#F3F4F6" }}
              >
                <X size={16} color="#1F2937" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="px-6 py-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}