"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Input, Textarea } from "@/components/ui/input";
import { Button, LinkButton } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { getOptionLabels } from "@/lib/customization";
import { cn } from "@/lib/utils";

type Step = "details" | "review";

interface FormState {
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  fulfillment: "pickup" | "delivery";
  date: string;
  address: string;
  notes: string;
}

const initialForm: FormState = {
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  fulfillment: "pickup",
  date: "",
  address: "",
  notes: "",
};

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (items.length === 0 && step === "details") {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-3 px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-text">Nothing to check out</h1>
        <p className="text-text-muted">Your cart is empty, so there&apos;s nothing to order yet.</p>
        <LinkButton href="/products" className="mt-2">Browse the Bakery</LinkButton>
      </div>
    );
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.contactName.trim()) next.contactName = "Name is required.";
    if (!form.contactEmail.trim()) next.contactEmail = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.contactEmail)) next.contactEmail = "Enter a valid email.";
    if (!form.contactPhone.trim()) next.contactPhone = "Phone number is required.";
    if (!form.date) next.date = `Choose a ${form.fulfillment} date.`;
    if (form.fulfillment === "delivery" && !form.address.trim())
      next.address = "Delivery address is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleContinue(e: FormEvent) {
    e.preventDefault();
    if (validate()) setStep("review");
  }

  async function handlePlaceOrder() {
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            sizeId: item.customization.sizeId,
            flavorId: item.customization.flavorId,
            quantity: item.customization.quantity,
            specialRequests: item.customization.specialRequests,
          })),
          contactName: form.contactName,
          contactEmail: form.contactEmail,
          contactPhone: form.contactPhone,
          fulfillmentType: form.fulfillment,
          pickupOrDeliveryDate: form.date,
          deliveryAddress: form.address,
          notes: form.notes,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSubmitError(data.error ?? "Something went wrong placing your order. Please try again.");
        setSubmitting(false);
        return;
      }

      const data = await res.json();
      clearCart();
      router.push(`/checkout/confirmation?order=${data.order.orderNumber}`);
    } catch {
      setSubmitError("Couldn't reach the server. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/cart" className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Cart
      </Link>

      <div className="mb-8 flex items-center gap-3">
        <StepPill active={step === "details"} done={step === "review"} label="1. Details" />
        <div className="h-px flex-1 bg-accent" />
        <StepPill active={step === "review"} done={false} label="2. Review & Place Order" />
      </div>

      {step === "details" ? (
        <form onSubmit={handleContinue} className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section>
              <h2 className="font-display text-lg font-semibold text-text">Contact Information</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  id="contactName"
                  label="Full name"
                  required
                  value={form.contactName}
                  error={errors.contactName}
                  onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                />
                <Input
                  id="contactPhone"
                  label="Phone number"
                  type="tel"
                  required
                  value={form.contactPhone}
                  error={errors.contactPhone}
                  onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                />
                <div className="sm:col-span-2">
                  <Input
                    id="contactEmail"
                    label="Email address"
                    type="email"
                    required
                    value={form.contactEmail}
                    error={errors.contactEmail}
                    onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-lg font-semibold text-text">Pickup or Delivery</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {(["pickup", "delivery"] as const).map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => setForm({ ...form, fulfillment: option })}
                    aria-pressed={form.fulfillment === option}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-sm font-medium capitalize transition-colors",
                      form.fulfillment === option
                        ? "border-primary bg-primary-light text-primary"
                        : "border-accent text-text hover:border-primary/50"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  id="date"
                  label={form.fulfillment === "pickup" ? "Pickup date" : "Delivery date"}
                  type="date"
                  required
                  value={form.date}
                  error={errors.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
                {form.fulfillment === "delivery" && (
                  <Input
                    id="address"
                    label="Delivery address"
                    required
                    value={form.address}
                    error={errors.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                )}
              </div>
            </section>

            <section>
              <Textarea
                id="notes"
                label="Order notes"
                hint="Anything else we should know? (optional)"
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </section>

            <Button type="submit" size="lg" fullWidth className="lg:hidden">
              Continue to Review
            </Button>
          </div>

          <OrderSummary items={items} subtotal={subtotal} action={
            <Button type="submit" size="lg" fullWidth className="hidden lg:inline-flex">
              Continue to Review
            </Button>
          } />
        </form>
      ) : (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {submitError && (
              <p className="rounded-lg bg-error-light px-3 py-2 text-sm text-error">{submitError}</p>
            )}
            <section className="rounded-2xl border border-accent p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-text">Contact & Fulfillment</h2>
                <button onClick={() => setStep("details")} className="text-sm font-medium text-primary hover:underline">
                  Edit
                </button>
              </div>
              <dl className="mt-3 space-y-1.5 text-sm text-text-muted">
                <div className="flex gap-2"><dt className="font-medium text-text">Name:</dt><dd>{form.contactName}</dd></div>
                <div className="flex gap-2"><dt className="font-medium text-text">Email:</dt><dd>{form.contactEmail}</dd></div>
                <div className="flex gap-2"><dt className="font-medium text-text">Phone:</dt><dd>{form.contactPhone}</dd></div>
                <div className="flex gap-2 capitalize">
                  <dt className="font-medium text-text">{form.fulfillment}:</dt>
                  <dd>{form.date} {form.fulfillment === "delivery" && `· ${form.address}`}</dd>
                </div>
                {form.notes && <div className="flex gap-2"><dt className="font-medium text-text">Notes:</dt><dd>{form.notes}</dd></div>}
              </dl>
            </section>

            <section>
              <h2 className="font-display text-lg font-semibold text-text">Order Items</h2>
              <ul className="mt-3 divide-y divide-accent border-y border-accent">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between gap-4 py-3 text-sm">
                    <div>
                      <p className="font-medium text-text">{item.product.name}</p>
                      <p className="text-text-muted">{getOptionLabels(item.product, item.customization)}</p>
                    </div>
                    <span className="shrink-0 font-medium text-text">{formatCurrency(item.lineTotal)}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <OrderSummary
            items={items}
            subtotal={subtotal}
            action={
              <Button size="lg" fullWidth onClick={handlePlaceOrder} disabled={submitting}>
                {submitting ? "Placing Order…" : "Place Order"}
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}

function StepPill({ active, done, label }: { active: boolean; done: boolean; label: string }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium",
        active && "bg-primary text-white",
        done && !active && "bg-success-light text-success",
        !active && !done && "bg-accent/50 text-text-muted"
      )}
    >
      {done && !active && <Check className="h-3.5 w-3.5" />}
      {label}
    </div>
  );
}

function OrderSummary({
  items,
  subtotal,
  action,
}: {
  items: ReturnType<typeof useCart>["items"];
  subtotal: number;
  action: React.ReactNode;
}) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 rounded-2xl border border-accent p-6">
        <h2 className="font-display text-lg font-semibold text-text">Order Summary</h2>
        <p className="mt-1 text-sm text-text-muted">{items.length} {items.length === 1 ? "item" : "items"}</p>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between text-text-muted">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-text-muted">
            <span>Tax</span>
            <span>—</span>
          </div>
        </div>
        <div className="mt-4 border-t border-dashed border-accent pt-4">
          <div className="flex justify-between">
            <span className="font-medium text-text">Total</span>
            <span className="font-display text-xl font-semibold text-primary">
              {formatCurrency(subtotal)}
            </span>
          </div>
        </div>
        <div className="mt-6">{action}</div>
      </div>
    </div>
  );
}
