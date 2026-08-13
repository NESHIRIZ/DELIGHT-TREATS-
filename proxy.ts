import { NextRequest, NextResponse } from "next/server";

// Note: proxy.ts runs in the Edge runtime, which can't use Prisma directly.
// So this does a lightweight check — "is there a session cookie at all" —
// and redirects if not. The actual session validity (expired? tampered?)
// is checked server-side by getCurrentUser() in each protected page/route,
// which is the real source of truth. This is a fast first pass that avoids
// rendering protected pages for obviously-logged-out visitors.

const SESSION_COOKIE = "delight_treats_session";

const PROTECTED_PREFIXES = ["/dashboard", "/checkout"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (!isProtected) return NextResponse.next();

  const sessionCookie = request.cookies.get(SESSION_COOKIE);
  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/checkout/:path*"],
};
