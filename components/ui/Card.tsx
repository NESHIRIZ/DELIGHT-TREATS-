"use client";
import { motion } from "framer-motion";

type CardProps = {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined" | "pink";
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function Card({
  children,
  variant = "default",
  hoverable = false,
  className = "",
  onClick,
}: CardProps) {
  const variants: Record<string, React.CSSProperties> = {
    default: {
      background: "white",
      border: "1px solid #E5E7EB",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    },
    elevated: {
      background: "white",
      border: "none",
      boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    },
    outlined: {
      background: "transparent",
      border: "2px solid #EC4899",
      boxShadow: "none",
    },
    pink: {
      background: "#FFF5F7",
      border: "1px solid #FCE7F3",
      boxShadow: "none",
    },
  };

  return (
    <motion.div
      onClick={onClick}
      className={`rounded-2xl p-6 ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={variants[variant]}
      whileHover={
        hoverable
          ? {
              y: -6,
              boxShadow: "0 20px 40px rgba(236,72,153,0.15)",
            }
          : {}
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}