import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { isValidEmail, checkPasswordStrength } from "@/lib/validation";

const SALT_ROUNDS = 12;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, password, phone } = body as Record<string, unknown>;

  // --- Validation -----------------------------------------------------
  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (typeof email !== "string" || !isValidEmail(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (typeof password !== "string") {
    return NextResponse.json({ error: "Password is required." }, { status: 400 });
  }
  const passwordCheck = checkPasswordStrength(password);
  if (!passwordCheck.valid) {
    return NextResponse.json({ error: passwordCheck.message }, { status: 400 });
  }
  if (phone !== undefined && typeof phone !== "string") {
    return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // --- Uniqueness check -------------------------------------------------
  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    // Deliberately vague — don't confirm which emails are registered.
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 }
    );
  }

  // --- Create user --------------------------------------------------------
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      phone: typeof phone === "string" && phone.trim() ? phone.trim() : null,
    },
  });

  await createSession(user.id);

  return NextResponse.json(
    { user: { id: user.id, name: user.name, email: user.email } },
    { status: 201 }
  );
}
