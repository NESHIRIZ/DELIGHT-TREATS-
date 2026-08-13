import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string; guestId: string } }
) {
  try {
    // TODO: replace with real DB delete
    // await db.guest.delete({ where: { id: params.guestId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove guest" },
      { status: 500 }
    );
  }
}