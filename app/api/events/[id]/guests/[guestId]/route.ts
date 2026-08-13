import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; guestId: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { id: eventId, guestId } = await params;

  // Verify the event belongs to this user, and the guest belongs to that
  // event, before deleting — otherwise a user could delete another user's
  // guest by guessing/enumerating guest IDs.
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event || event.userId !== user.id) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }

  const guest = await prisma.guest.findUnique({ where: { id: guestId } });
  if (!guest || guest.eventId !== eventId) {
    return NextResponse.json({ error: "Guest not found." }, { status: 404 });
  }

  await prisma.guest.delete({ where: { id: guestId } });

  return NextResponse.json({ success: true });
}
