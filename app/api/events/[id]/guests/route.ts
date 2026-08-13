import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    // TODO: replace with real DB insert
    // await db.guest.create({ data: { ...body, eventId: params.id } });

    return NextResponse.json({ success: true, guest: body });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add guest" },
      { status: 500 }
    );
  }
}