import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarHeart, Plus, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { EventStatusBadge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { serializeEvent } from "@/lib/serializers";
import { getCurrentUser } from "@/lib/session";
import { formatDate } from "@/lib/utils";

const eventTypeLabels: Record<string, string> = {
  wedding: "Wedding",
  birthday: "Birthday",
  corporate: "Corporate",
  "baby-shower": "Baby Shower",
  other: "Other",
};

export default async function EventsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirectTo=/dashboard/events");

  const eventsRaw = await prisma.event.findMany({
    where: { userId: user.id },
    include: { guests: true },
    orderBy: { date: "asc" },
  });
  const events = eventsRaw.map(serializeEvent);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-text">My Events</h2>
        <LinkButton href="/dashboard/events/new" size="sm">
          <Plus className="h-4 w-4" /> New Event
        </LinkButton>
      </div>

      {events.length === 0 ? (
        <Card className="mt-4 flex flex-col items-center gap-2 p-10 text-center">
          <CalendarHeart className="h-8 w-8 text-text-muted" strokeWidth={1.25} />
          <p className="font-medium text-text">No events yet</p>
          <p className="max-w-xs text-sm text-text-muted">
            Planning a wedding, birthday, or celebration? Create an event to start
            organizing catering and guests.
          </p>
          <LinkButton href="/dashboard/events/new" className="mt-2">
            Create Your First Event
          </LinkButton>
        </Card>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {events.map((event) => (
            <Link key={event.id} href={`/dashboard/events/${event.id}`}>
              <Card className="flex h-full flex-col gap-3 p-5 transition-colors hover:border-primary">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                      {eventTypeLabels[event.type]}
                    </p>
                    <h3 className="font-display text-lg font-semibold text-text">{event.name}</h3>
                  </div>
                  <EventStatusBadge status={event.status} />
                </div>
                <div className="mt-auto flex items-center gap-4 text-sm text-text-muted">
                  <span>{formatDate(event.date)}</span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {event.guestCountEstimate}
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
