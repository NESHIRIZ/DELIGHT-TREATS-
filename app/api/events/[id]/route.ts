import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { serializeEvent, eventTypeToDb } from "@/lib/serializers";
import type { EventType } from "@/types";
import type { Prisma } from "@/generated/prisma/client";

const VALID_TYPES = new Set(Object.keys(eventTypeToDb));

async function loadOwnedEvent(userId: string, eventId: string) {
  const event = await prisma.event.findUnique({ where: { id: eventId }, include: { guests: true } });
  if (!event || event.userId !== userId) return null;
  return event;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { id } = await params;
  const event = await loadOwnedEvent(user.id, id);
  if (!event) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }

  return NextResponse.json({ event: serializeEvent(event) });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await loadOwnedEvent(user.id, id);
  if (!existing) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, type, date, guestCountEstimate, requirements, status } = body as Record<string, unknown>;

  const data: Prisma.EventUpdateInput = {};

  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Event name cannot be empty." }, { status: 400 });
    }
    data.name = name.trim();
  }

  if (type !== undefined) {
    if (typeof type !== "string" || !VALID_TYPES.has(type)) {
      return NextResponse.json({ error: "Invalid event type." }, { status: 400 });
    }
    data.type = eventTypeToDb[type as EventType] as Prisma.EventUpdateInput["type"];
  }

  if (date !== undefined) {
    if (typeof date !== "string" || !date) {
      return NextResponse.json({ error: "Invalid event date." }, { status: 400 });
    }
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      return NextResponse.json({ error: "Invalid event date." }, { status: 400 });
    }
    data.date = parsedDate;
  }

  if (guestCountEstimate !== undefined) {
    const guestCount = typeof guestCountEstimate === "number" ? Math.floor(guestCountEstimate) : NaN;
    if (!Number.isFinite(guestCount) || guestCount < 1) {
      return NextResponse.json({ error: "Estimated guest count must be at least 1." }, { status: 400 });
    }
    data.guestCountEstimate = guestCount;
  }

  if (requirements !== undefined) {
    if (requirements !== null && typeof requirements !== "string") {
      return NextResponse.json({ error: "Invalid requirements." }, { status: 400 });
    }
    data.requirements = typeof requirements === "string" && requirements.trim() ? requirements.trim() : null;
  }

  if (status !== undefined) {
    const validStatuses = ["planning", "confirmed", "completed", "cancelled"];
    if (typeof status !== "string" || !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid event status." }, { status: 400 });
    }
    data.status = status.toUpperCase() as Prisma.EventUpdateInput["status"];
  }

  const updated = await prisma.event.update({
    where: { id },
    data,
    include: { guests: true },
  });

  return NextResponse.json({ event: serializeEvent(updated) });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await loadOwnedEvent(user.id, id);
  if (!existing) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }

  // Guests cascade-delete automatically per the onDelete: Cascade relation
  // in schema.prisma — no need to delete them separately here.
  await prisma.event.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
