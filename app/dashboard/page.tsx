import Link from "next/link";
import { redirect } from "next/navigation";
import { Package, CalendarHeart, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { OrderStatusBadge, EventStatusBadge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { serializeOrder, serializeEvent } from "@/lib/serializers";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getCurrentUser } from "@/lib/session";

export default async function DashboardOverviewPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirectTo=/dashboard");

  const [recentOrdersRaw, upcomingEventsRaw] = await Promise.all([
    prisma.order.findMany({
      where: { userId: user.id },
      include: { items: true },
      orderBy: { createdAt: "desc" },
      take: 2,
    }),
    prisma.event.findMany({
      where: {
        userId: user.id,
        status: { notIn: ["COMPLETED", "CANCELLED"] },
      },
      include: { guests: true },
      orderBy: { date: "asc" },
      take: 2,
    }),
  ]);

  const recentOrders = recentOrdersRaw.map(serializeOrder);
  const upcomingEvents = upcomingEventsRaw.map(serializeEvent);

  return (
    <div className="space-y-8">
      <Card className="bg-primary-light/40 p-6">
        <p className="text-sm text-text-muted">Welcome back,</p>
        <p className="font-display text-xl font-semibold text-text">{user.name}</p>
      </Card>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-text">Recent Orders</h2>
          <Link href="/dashboard/orders" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {recentOrders.length === 0 ? (
            <Card className="p-6 text-center text-sm text-text-muted">
              No orders yet.{" "}
              <Link href="/products" className="font-medium text-primary hover:underline">
                Start shopping
              </Link>
              .
            </Card>
          ) : (
            recentOrders.map((order) => (
              <Link key={order.id} href={`/dashboard/orders/${order.id}`}>
                <Card className="flex items-center justify-between p-4 transition-colors hover:border-primary">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary-light p-2.5 text-primary">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text">{order.orderNumber}</p>
                      <p className="text-xs text-text-muted">
                        {order.items.length} items · {formatCurrency(order.total)}
                      </p>
                    </div>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </Card>
              </Link>
            ))
          )}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-text">Upcoming Events</h2>
          <Link href="/dashboard/events" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {upcomingEvents.length === 0 ? (
            <Card className="p-6 text-center text-sm text-text-muted">
              No upcoming events.{" "}
              <Link href="/dashboard/events/new" className="font-medium text-primary hover:underline">
                Plan one
              </Link>
              .
            </Card>
          ) : (
            upcomingEvents.map((event) => (
              <Link key={event.id} href={`/dashboard/events/${event.id}`}>
                <Card className="flex items-center justify-between p-4 transition-colors hover:border-primary">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary-light p-2.5 text-primary">
                      <CalendarHeart className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text">{event.name}</p>
                      <p className="text-xs text-text-muted">
                        {formatDate(event.date)} · {event.guestCountEstimate} guests
                      </p>
                    </div>
                  </div>
                  <EventStatusBadge status={event.status} />
                </Card>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
