"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash2, Calendar, Users } from "lucide-react";
import { BakeryEvent } from "@/types";
import { Card } from "@/components/ui/card";
import { Button, LinkButton } from "@/components/ui/button";
import { EventStatusBadge } from "@/components/ui/badge";
import { GuestManager } from "@/components/events/guest-manager";
import { DeleteConfirmModal } from "@/components/ui/delete-confirm-modal";
import { formatDate } from "@/lib/utils";

const eventTypeLabels: Record<string, string> = {
  wedding: "Wedding",
  birthday: "Birthday",
  corporate: "Corporate",
  "baby-shower": "Baby Shower",
  other: "Other",
};

export function EventDetailView({ event }: { event: BakeryEvent }) {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  async function handleDelete() {
    setDeleting(true);
    setDeleteError("");
    try {
      const res = await fetch(`/api/events/${event.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setDeleteError(data.error ?? "Couldn't delete this event. Please try again.");
        setDeleting(false);
        return;
      }
      router.push("/dashboard/events");
      router.refresh();
    } catch {
      setDeleteError("Couldn't reach the server. Please check your connection and try again.");
      setDeleting(false);
    }
  }

  return (
    <div>
      <Link
        href="/dashboard/events"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Events
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
            {eventTypeLabels[event.type]}
          </p>
          <h2 className="font-display text-2xl font-semibold text-text">{event.name}</h2>
          <div className="mt-2 flex items-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {formatDate(event.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" /> {event.guestCountEstimate} estimated
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <EventStatusBadge status={event.status} />
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <LinkButton href={`/dashboard/events/${event.id}/edit`} variant="outline" size="sm">
          <Pencil className="h-3.5 w-3.5" /> Edit Event
        </LinkButton>
        <Button variant="outline" size="sm" onClick={() => setDeleteOpen(true)}>
          <Trash2 className="h-3.5 w-3.5" /> Delete
        </Button>
      </div>

      {event.requirements && (
        <Card className="mt-6 p-5">
          <h3 className="font-display text-base font-semibold text-text">Requirements & Notes</h3>
          <p className="mt-2 text-sm text-text-muted">{event.requirements}</p>
        </Card>
      )}

      <Card className="mt-6 p-5">
        <GuestManager eventId={event.id} initialGuests={event.guests} />
      </Card>

      {deleteError && (
        <p className="mt-4 rounded-lg bg-error-light px-3 py-2 text-sm text-error">{deleteError}</p>
      )}

      <DeleteConfirmModal
        open={deleteOpen}
        title="Delete this event?"
        message={`"${event.name}" and all its guest information will be permanently removed. This can't be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
        confirming={deleting}
      />
    </div>
  );
}
