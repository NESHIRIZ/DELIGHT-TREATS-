import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "delight_treats_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

/**
 * Creates a new session row for a user and sets the session cookie.
 * Call after successful register/login.
 */
export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  const session = await prisma.session.create({
    data: { userId, expiresAt },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return session;
}

/**
 * Reads the session cookie, validates it against the database, and returns
 * the associated user. Returns null if there's no session, it's expired, or
 * it doesn't match a real row (e.g. cookie was tampered with).
 *
 * Use this in Server Components, Route Handlers, and Server Actions to
 * check "who is logged in" — never trust client-supplied user IDs directly.
 */
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session) return null;

  if (session.expiresAt < new Date()) {
    // Expired — clean it up so it doesn't linger in the table.
    await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  return session.user;
}

/**
 * Destroys the current session (both the DB row and the cookie).
 * Call on logout.
 */
export async function destroySession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  if (sessionId) {
    await prisma.session.delete({ where: { id: sessionId } }).catch(() => {
      // Session already gone — fine, that's the end state we want anyway.
    });
  }

  cookieStore.delete(SESSION_COOKIE);
}
