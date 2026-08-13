import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { serializeEvent } from "@/lib/serializers";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { id: eventId } = await params;
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event || event.userId !== user.id) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, count, dietaryNotes } = body as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Guest group name is required." }, { status: 400 });
  }
  const parsedCount = typeof count === "number" ? Math.floor(count) : NaN;
  if (!Number.isFinite(parsedCount) || parsedCount < 1) {
    return NextResponse.json({ error: "Guest count must be at least 1." }, { status: 400 });
  }
  if (dietaryNotes !== undefined && dietaryNotes !== null && typeof dietaryNotes !== "string") {
    return NextResponse.json({ error: "Invalid dietary notes." }, { status: 400 });
  }

  await prisma.guest.create({
    data: {
      eventId,
      name: name.trim(),
      count: parsedCount,
      dietaryNotes: typeof dietaryNotes === "string" && dietaryNotes.trim() ? dietaryNotes.trim() : null,
    },
  });

  // Return the whole event (with the updated guest list) so the client can
  // refresh its view in one round trip, rather than needing a second fetch.
  const updated = await prisma.event.findUnique({ where: { id: eventId }, include: { guests: true } });
  return NextResponse.json({ event: serializeEvent(updated!) }, { status: 201 });
}
