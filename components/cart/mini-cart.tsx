"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { LinkButton } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { getOptionLabels } from "@/lib/customization";

export function MiniCart() {
  const { items, isMiniCartOpen, setMiniCartOpen, subtotal, updateQuantity, removeItem } =
    useCart();

  if (!isMiniCartOpen) return null;

  return (
    <>
      <button
        aria-label="Close cart"
        onClick={() => setMiniCartOpen(false)}
        className="fixed inset-0 z-40 bg-text/20 backdrop-blur-[1px] animate-fade-in"
      />
      <div
        role="dialog"
        aria-label="Shopping cart"
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-background shadow-2xl animate-slide-up sm:right-4 sm:top-4 sm:h-[calc(100%-2rem)] sm:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-accent px-5 py-4">
          <h2 className="font-display text-lg font-semibold">Your Cart</h2>
          <button
            onClick={() => setMiniCartOpen(false)}
            className="rounded-full p-1.5 text-text-muted hover:bg-accent/60 hover:text-text"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="rounded-full bg-primary-light p-4">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <p className="font-medium text-text">Your cart is empty</p>
            <p className="text-sm text-text-muted">
              Add something sweet from our catalogue to get started.
            </p>
            <LinkButton href="/products" onClick={() => setMiniCartOpen(false)} className="mt-2">
              Browse the Bakery
            </LinkButton>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 border-b border-accent pb-4 last:border-0">
                  <div className="h-16 w-16 shrink-0 rounded-xl bg-primary-light" aria-hidden />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-text">{item.product.name}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 text-text-muted hover:text-error"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-text-muted">
                      {getOptionLabels(item.product, item.customization)}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-accent px-1.5 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.customization.quantity - 1)}
                          className="rounded-full p-0.5 text-text-muted hover:text-primary disabled:opacity-40"
                          disabled={item.customization.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-4 text-center text-xs font-medium">
                          {item.customization.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.customization.quantity + 1)}
                          className="rounded-full p-0.5 text-text-muted hover:text-primary"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-text">
                        {formatCurrency(item.lineTotal)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-accent px-5 py-4">
              <div className="mb-4 flex items-center justify-between text-sm font-medium">
                <span className="text-text-muted">Subtotal</span>
                <span className="text-base font-semibold text-text">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex flex-col gap-2">
                <LinkButton href="/cart" fullWidth variant="outline" onClick={() => setMiniCartOpen(false)}>
                  View Cart
                </LinkButton>
                <LinkButton href="/checkout" fullWidth onClick={() => setMiniCartOpen(false)}>
                  Checkout
                </LinkButton>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
