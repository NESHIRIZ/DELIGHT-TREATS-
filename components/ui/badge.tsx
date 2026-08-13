import { cn } from "@/lib/utils";
import { OrderStatus, EventStatus } from "@/types";

type BadgeTone = "primary" | "success" | "warning" | "error" | "neutral";

const toneClasses: Record<BadgeTone, string> = {
  primary: "bg-primary-light text-primary",
  success: "bg-success-light text-success",
  warning: "bg-warning-light text-warning",
  error: "bg-error-light text-error",
  neutral: "bg-accent text-text-muted",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

const orderStatusMap: Record<OrderStatus, { label: string; tone: BadgeTone }> = {
  received: { label: "Order Received", tone: "primary" },
  preparing: { label: "Preparing", tone: "warning" },
  ready: { label: "Ready for Pickup", tone: "success" },
  completed: { label: "Completed", tone: "neutral" },
  cancelled: { label: "Cancelled", tone: "error" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { label, tone } = orderStatusMap[status];
  return <Badge tone={tone}>{label}</Badge>;
}

const eventStatusMap: Record<EventStatus, { label: string; tone: BadgeTone }> = {
  planning: { label: "Planning", tone: "warning" },
  confirmed: { label: "Confirmed", tone: "success" },
  completed: { label: "Completed", tone: "neutral" },
  cancelled: { label: "Cancelled", tone: "error" },
};

export function EventStatusBadge({ status }: { status: EventStatus }) {
  const { label, tone } = eventStatusMap[status];
  return <Badge tone={tone}>{label}</Badge>;
}
