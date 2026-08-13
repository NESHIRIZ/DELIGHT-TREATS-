type Status = "Delivered" | "Processing" | "Pending" | "Upcoming" | "Planning" | "Completed";

const statusColors: Record<Status, { bg: string; text: string }> = {
  Delivered:  { bg: "#D1FAE5", text: "#065F46" },
  Processing: { bg: "#FEF3C7", text: "#92400E" },
  Pending:    { bg: "#FCE7F3", text: "#9D174D" },
  Upcoming:   { bg: "#FCE7F3", text: "#9D174D" },
  Planning:   { bg: "#FEF3C7", text: "#92400E" },
  Completed:  { bg: "#D1FAE5", text: "#065F46" },
};

export default function StatusBadge({ status }: { status: Status }) {
  const colors = statusColors[status] ?? { bg: "#F3F4F6", text: "#374151" };
  return (
    <span
      className="text-xs font-semibold px-3 py-1 rounded-full"
      style={{ background: colors.bg, color: colors.text }}
    >
      {status}
    </span>
  );
}