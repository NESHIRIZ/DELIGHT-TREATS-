import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover active:bg-primary-hover disabled:bg-accent disabled:text-text-muted",
  secondary:
    "bg-primary-light text-primary hover:bg-[#f9d0e6] disabled:bg-accent disabled:text-text-muted",
  outline:
    "border border-accent text-text bg-background hover:border-primary hover:text-primary disabled:text-text-muted disabled:border-accent",
  ghost: "text-text hover:bg-accent/60 disabled:text-text-muted",
  danger: "bg-error text-white hover:bg-red-800 disabled:bg-accent disabled:text-text-muted",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2.5 gap-2",
  lg: "text-base px-6 py-3 gap-2",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-medium transition-colors duration-150 disabled:cursor-not-allowed cursor-pointer";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonBaseProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

interface LinkButtonProps extends ButtonBaseProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function LinkButton({
  href,
  className,
  variant = "primary",
  size = "md",
  fullWidth,
  children,
  onClick,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </Link>
  );
}
