import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { Card } from "@/components/ui/card";
import { EventForm } from "@/components/events/event-form";

export const metadata = { title: "Plan an Event | Delight Treats" };

export default async function NewEventPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirectTo=/dashboard/events/new");

  return (
    <div>
      <Link
        href="/dashboard/events"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Events
      </Link>

      <h2 className="font-display text-2xl font-semibold text-text">Plan a New Event</h2>
      <p className="mt-1 max-w-lg text-text-muted">
        Tell us about your event and we&apos;ll help you plan the cake, catering, and guest
        list — all in one place.
      </p>

      <Card className="mt-6 max-w-2xl p-6">
        <EventForm mode="create" />
      </Card>
    </div>
  );
}
