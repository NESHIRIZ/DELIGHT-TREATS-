"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeleteConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirming,
}: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirming?: boolean;
}) {
  if (!open) return null;

  return (
    <>
      <button
        aria-label="Close dialog"
        onClick={onCancel}
        className="fixed inset-0 z-50 bg-text/30 backdrop-blur-[1px] animate-fade-in"
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-background p-6 shadow-2xl animate-slide-up"
      >
        <div className="flex items-start gap-3">
          <div className="shrink-0 rounded-full bg-error-light p-2.5 text-error">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h2 id="delete-modal-title" className="font-display text-lg font-semibold text-text">
              {title}
            </h2>
            <p className="mt-1 text-sm text-text-muted">{message}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={confirming}>
            {confirming ? "Deleting…" : "Delete"}
          </Button>
        </div>
      </div>
    </>
  );
}
