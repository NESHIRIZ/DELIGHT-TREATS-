import Link from "next/link";
import { redirect } from "next/navigation";
import { Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { OrderStatusBadge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { serializeOrder } from "@/lib/serializers";
import { getCurrentUser } from "@/lib/session";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function OrdersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirectTo=/dashboard/orders");

  const ordersRaw = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
  const orders = ordersRaw.map(serializeOrder);

  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-text">Order History</h2>

      {orders.length === 0 ? (
        <Card className="mt-4 flex flex-col items-center gap-2 p-10 text-center">
          <Package className="h-8 w-8 text-text-muted" strokeWidth={1.25} />
          <p className="font-medium text-text">No orders yet</p>
          <p className="text-sm text-text-muted">Your order history will show up here.</p>
        </Card>
      ) : (
        <div className="mt-4 space-y-3">
          {orders.map((order) => (
            <Link key={order.id} href={`/dashboard/orders/${order.id}`}>
              <Card className="flex flex-col gap-3 p-4 transition-colors hover:border-primary sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-text">{order.orderNumber}</p>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <p className="mt-1 text-xs text-text-muted">
                    Placed {formatDate(order.createdAt)} · {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"}
                  </p>
                </div>
                <p className="font-display text-base font-semibold text-primary">
                  {formatCurrency(order.total)}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
