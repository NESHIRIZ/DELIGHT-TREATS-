import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { OrderStatusBadge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { serializeOrder } from "@/lib/serializers";
import { getCurrentUser } from "@/lib/session";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirectTo=/dashboard/orders");

  const { id } = await params;
  const orderRow = await prisma.order.findUnique({ where: { id }, include: { items: true } });

  // Same 404 whether the order doesn't exist or belongs to someone else —
  // this page shouldn't confirm the existence of other users' orders.
  if (!orderRow || orderRow.userId !== user.id) notFound();

  const order = serializeOrder(orderRow);

  const steps: Array<{ key: string; label: string }> = [
    { key: "received", label: "Received" },
    { key: "preparing", label: "Preparing" },
    { key: "ready", label: "Ready" },
    { key: "completed", label: "Completed" },
  ];
  const currentIndex = steps.findIndex((s) => s.key === order.status);

  return (
    <div>
      <Link href="/dashboard/orders" className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Orders
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-text">{order.orderNumber}</h2>
          <p className="mt-1 text-sm text-text-muted">Placed {formatDate(order.createdAt)}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {order.status !== "cancelled" && (
        <Card className="mt-6 p-5">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={step.key} className="flex flex-1 flex-col items-center gap-2 last:flex-none">
                <div className="flex w-full items-center">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      i <= currentIndex ? "bg-primary" : "bg-accent"
                    }`}
                  />
                  {i < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 ${i < currentIndex ? "bg-primary" : "bg-accent"}`} />
                  )}
                </div>
                <span
                  className={`text-xs font-medium ${
                    i <= currentIndex ? "text-text" : "text-text-muted"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h3 className="font-display text-base font-semibold text-text">Items</h3>
          <ul className="mt-3 divide-y divide-accent border-y border-accent">
            {order.items.map((item) => {
              const labelParts = [
                item.customization.sizeLabel,
                item.customization.flavorLabel,
                `Qty ${item.customization.quantity}`,
              ].filter(Boolean);
              return (
                <li key={item.id} className="flex justify-between gap-4 py-3 text-sm">
                  <div>
                    <p className="font-medium text-text">{item.productName}</p>
                    <p className="text-text-muted">{labelParts.join(" · ")}</p>
                    {item.customization.specialRequests && (
                      <p className="mt-0.5 text-xs italic text-text-muted">
                        &ldquo;{item.customization.specialRequests}&rdquo;
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 font-medium text-text">{formatCurrency(item.lineTotal)}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <Card className="p-5">
            <h3 className="font-display text-base font-semibold text-text">Details</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-text-muted">Contact</dt>
                <dd className="text-text">{order.contactName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-muted">Date</dt>
                <dd className="text-text">
                  {order.pickupOrDeliveryDate ? formatDate(order.pickupOrDeliveryDate) : "—"}
                </dd>
              </div>
              <div className="flex justify-between border-t border-dashed border-accent pt-2 font-medium">
                <dt className="text-text">Total</dt>
                <dd className="text-primary">{formatCurrency(order.total)}</dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>
    </div>
  );
}
