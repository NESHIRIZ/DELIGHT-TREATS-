"use client";
type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const baseStyles: React.CSSProperties = {
    borderRadius: "9999px",
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? "100%" : "auto",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    position: "relative",
    overflow: "hidden",
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: "#EC4899",
      color: "white",
      border: "none",
      boxShadow: "0 4px 14px rgba(236, 72, 153, 0.35)",
    },
    outline: {
      background: "transparent",
      color: "#EC4899",
      border: "2px solid #EC4899",
      boxShadow: "none",
    },
    ghost: {
      background: "#FCE7F3",
      color: "#EC4899",
      border: "none",
      boxShadow: "none",
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${sizes[size]} group`}
      style={{ ...baseStyles, ...variants[variant] }}
      onMouseEnter={(e) => {
        if (disabled) return;
        const el = e.currentTarget;
        if (variant === "primary") {
          el.style.transform = "translateY(-2px)";
          el.style.boxShadow = "0 8px 20px rgba(236, 72, 153, 0.5)";
          el.style.background = "#db2777";
        } else if (variant === "outline") {
          el.style.background = "#FCE7F3";
          el.style.transform = "translateY(-2px)";
        } else {
          el.style.background = "#FBCFE8";
          el.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        if (variant === "primary") {
          el.style.boxShadow = "0 4px 14px rgba(236, 72, 153, 0.35)";
          el.style.background = "#EC4899";
        } else if (variant === "outline") {
          el.style.background = "transparent";
        } else {
          el.style.background = "#FCE7F3";
        }
      }}
      onMouseDown={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = "translateY(0) scale(0.97)";
      }}
      onMouseUp={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
    >
      {children}
    </button>
  );
}