"use client";
import { motion } from "framer-motion";

type BadgeProps = {
  label: string;
  variant?: "pink" | "green" | "yellow" | "gray" | "dark";
};

export default function Badge({ label, variant = "pink" }: BadgeProps) {
  const variants: Record<string, React.CSSProperties> = {
    pink: { background: "#EC4899", color: "white" },
    green: { background: "#D1FAE5", color: "#065F46" },
    yellow: { background: "#FEF3C7", color: "#92400E" },
    gray: { background: "#E5E7EB", color: "#1F2937" },
    dark: { background: "#1F2937", color: "white" },
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
      style={variants[variant]}
    >
      {label}
    </motion.span>
  );
}