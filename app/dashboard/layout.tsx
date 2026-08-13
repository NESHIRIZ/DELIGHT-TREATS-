import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { LogoutButton } from "@/components/dashboard/logout-button";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  // Defense in depth: middleware already redirects unauthenticated visitors
  // before they reach this layout, but we check again here since this is
  // the actual source of truth (the middleware only checks cookie presence,
  // not validity).
  if (!user) {
    redirect("/login?redirectTo=/dashboard");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-text">My Account</h1>
          <p className="mt-1 text-text-muted">Manage your orders, events, and profile.</p>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <DashboardNav />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
