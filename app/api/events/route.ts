import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { serializeEvent, eventTypeToDb } from "@/lib/serializers";
import type { EventType } from "@/types";
import type { Prisma } from "@/generated/prisma/client";

const VALID_TYPES = new Set(Object.keys(eventTypeToDb));

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const events = await prisma.event.findMany({
    where: { userId: user.id },
    include: { guests: true },
    orderBy: { date: "asc" },
  });

  return NextResponse.json({ events: events.map(serializeEvent) });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, type, date, guestCountEstimate, requirements } = body as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Event name is required." }, { status: 400 });
  }
  if (typeof type !== "string" || !VALID_TYPES.has(type)) {
    return NextResponse.json({ error: "A valid event type is required." }, { status: 400 });
  }
  if (typeof date !== "string" || !date) {
    return NextResponse.json({ error: "Event date is required." }, { status: 400 });
  }
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return NextResponse.json({ error: "Invalid event date." }, { status: 400 });
  }
  const guestCount =
    typeof guestCountEstimate === "number" ? Math.floor(guestCountEstimate) : NaN;
  if (!Number.isFinite(guestCount) || guestCount < 1) {
    return NextResponse.json({ error: "Estimated guest count must be at least 1." }, { status: 400 });
  }
  if (requirements !== undefined && typeof requirements !== "string") {
    return NextResponse.json({ error: "Invalid requirements." }, { status: 400 });
  }

  const created = await prisma.event.create({
    data: {
      userId: user.id,
      name: name.trim(),
      type: eventTypeToDb[type as EventType] as Prisma.EventCreateInput["type"],
      date: parsedDate,
      guestCountEstimate: guestCount,
      requirements: typeof requirements === "string" && requirements.trim() ? requirements.trim() : null,
    },
    include: { guests: true },
  });

  return NextResponse.json({ event: serializeEvent(created) }, { status: 201 });
}
