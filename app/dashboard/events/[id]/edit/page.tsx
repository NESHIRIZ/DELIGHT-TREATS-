import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { serializeEvent } from "@/lib/serializers";
import { getCurrentUser } from "@/lib/session";
import { Card } from "@/components/ui/card";
import { EventForm } from "@/components/events/event-form";

// No generateStaticParams: events are per-user and change frequently, so
// this renders dynamically per-request.

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirectTo=/dashboard/events");

  const { id } = await params;
  const eventRow = await prisma.event.findUnique({ where: { id } });
  if (!eventRow || eventRow.userId !== user.id) notFound();

  const event = serializeEvent({ ...eventRow, guests: [] });

  return (
    <div>
      <Link
        href={`/dashboard/events/${event.id}`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Event
      </Link>

      <h2 className="font-display text-2xl font-semibold text-text">Edit Event</h2>
      <p className="mt-1 text-text-muted">Update the details for {event.name}.</p>

      <Card className="mt-6 max-w-2xl p-6">
        <EventForm mode="edit" initialEvent={event} />
      </Card>
    </div>
  );
}
