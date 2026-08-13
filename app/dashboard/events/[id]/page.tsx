import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { serializeEvent } from "@/lib/serializers";
import { getCurrentUser } from "@/lib/session";
import { EventDetailView } from "@/components/events/event-detail-view";

// No generateStaticParams: events are per-user and change frequently, so
// this renders dynamically per-request rather than being statically
// generated for a fixed list of event IDs at build time.

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirectTo=/dashboard/events");

  const { id } = await params;
  const eventRow = await prisma.event.findUnique({ where: { id }, include: { guests: true } });

  // Same 404 whether the event doesn't exist or belongs to someone else.
  if (!eventRow || eventRow.userId !== user.id) notFound();

  return <EventDetailView event={serializeEvent(eventRow)} />;
}
