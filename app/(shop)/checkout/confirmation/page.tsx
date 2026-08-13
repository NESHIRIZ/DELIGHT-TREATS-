import { Suspense } from "react";
import { CheckCircle2 } from "lucide-react";
import { LinkButton } from "@/components/ui/button";

function ConfirmationContent({ orderNumber }: { orderNumber: string }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
      <div className="rounded-full bg-success-light p-5">
        <CheckCircle2 className="h-9 w-9 text-success" />
      </div>
      <h1 className="font-display text-3xl font-semibold text-text">Order Confirmed!</h1>
      <p className="text-text-muted">
        Thank you — we&apos;ve received your order and we&apos;re getting started. A confirmation
        has been sent to your email.
      </p>

      <div className="ticket-notch mt-2 w-full rounded-2xl border border-dashed border-accent bg-primary-light/40 px-6 py-5">
        <p className="text-xs uppercase tracking-wide text-text-muted">Order Number</p>
        <p className="font-display text-2xl font-semibold text-primary">{orderNumber}</p>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <LinkButton href="/dashboard/orders" variant="outline">
          View My Orders
        </LinkButton>
        <LinkButton href="/products">Continue Shopping</LinkButton>
      </div>
    </div>
  );
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const params = await searchParams;
  const orderNumber = params.order ?? "DT-UNKNOWN";

  return (
    <Suspense>
      <ConfirmationContent orderNumber={orderNumber} />
    </Suspense>
  );
}
