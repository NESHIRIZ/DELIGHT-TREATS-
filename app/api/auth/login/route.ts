import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { isValidEmail } from "@/lib/validation";

// Simple in-memory rate limiting per server instance. Good enough to blunt
// naive brute-force attempts; for multi-instance production deployments,
// swap this for a shared store (Redis, etc.) keyed the same way.
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = attempts.get(key);

  if (!record || now > record.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  record.count += 1;
  return record.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, password } = body as Record<string, unknown>;

  if (typeof email !== "string" || !isValidEmail(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (typeof password !== "string" || !password) {
    return NextResponse.json({ error: "Password is required." }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Rate limit by email + IP so one bad actor can't lock out a real user
  // by spamming failed attempts against their address from many IPs, while
  // still limiting a single IP hammering many addresses.
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`${ip}:${normalizedEmail}`)) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  // Same generic error whether the email doesn't exist or the password is
  // wrong — don't leak which one it was.
  const genericError = NextResponse.json(
    { error: "Invalid email or password." },
    { status: 401 }
  );

  if (!user) return genericError;

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) return genericError;

  await createSession(user.id);

  return NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email },
  });
}
