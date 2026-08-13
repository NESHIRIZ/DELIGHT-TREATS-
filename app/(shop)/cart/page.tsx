"use client";

import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { LinkButton } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { getOptionLabels } from "@/lib/customization";
import { Cake } from "lucide-react";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
        <div className="rounded-full bg-primary-light p-5">
          <ShoppingBag className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-display text-2xl font-semibold text-text">Your cart is empty</h1>
        <p className="text-text-muted">
          Looks like you haven&apos;t added anything yet. Let&apos;s find something sweet.
        </p>
        <LinkButton href="/products" className="mt-2">
          Browse the Bakery
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/products" className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Continue Shopping
      </Link>

      <h1 className="font-display text-3xl font-semibold text-text">Your Cart</h1>
      <p className="mt-1 text-text-muted">{items.length} {items.length === 1 ? "item" : "items"}</p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <ul className="lg:col-span-2 divide-y divide-accent border-y border-accent">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 py-5">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                <Cake className="h-8 w-8 text-primary/30" />
              </div>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="font-display text-base font-semibold text-text hover:text-primary"
                    >
                      {item.product.name}
                    </Link>
                    <p className="mt-1 text-sm text-text-muted">
                      {getOptionLabels(item.product, item.customization)}
                    </p>
                    {item.customization.specialRequests && (
                      <p className="mt-1 text-xs italic text-text-muted">
                        “{item.customization.specialRequests}”
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="shrink-0 rounded-full p-1.5 text-text-muted hover:bg-error-light hover:text-error"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center gap-2 rounded-full border border-accent px-1.5 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.customization.quantity - 1)}
                      disabled={item.customization.quantity <= 1}
                      className="rounded-full p-1 text-text-muted hover:text-primary disabled:opacity-30"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-5 text-center text-sm font-medium">
                      {item.customization.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.customization.quantity + 1)}
                      className="rounded-full p-1 text-text-muted hover:text-primary"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="font-semibold text-text">{formatCurrency(item.lineTotal)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-accent p-6">
            <h2 className="font-display text-lg font-semibold text-text">Order Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-text-muted">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <div className="ticket-notch mt-4 border-t border-dashed border-accent pt-4">
              <div className="flex justify-between">
                <span className="font-medium text-text">Total</span>
                <span className="font-display text-xl font-semibold text-primary">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            </div>
            <LinkButton href="/checkout" fullWidth size="lg" className="mt-6">
              Proceed to Checkout
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
