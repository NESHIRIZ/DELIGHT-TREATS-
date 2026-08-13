import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { isValidEmail } from "@/lib/validation";

export async function PATCH(request: NextRequest) {
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

  const { name, email, phone } = body as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (typeof email !== "string" || !isValidEmail(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (phone !== undefined && phone !== null && typeof phone !== "string") {
    return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail !== user.email) {
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return NextResponse.json(
        { error: "That email is already in use by another account." },
        { status: 409 }
      );
    }
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: name.trim(),
      email: normalizedEmail,
      phone: typeof phone === "string" && phone.trim() ? phone.trim() : null,
    },
  });

  return NextResponse.json({
    user: { id: updated.id, name: updated.name, email: updated.email, phone: updated.phone },
  });
}
