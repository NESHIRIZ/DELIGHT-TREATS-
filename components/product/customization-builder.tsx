"use client";

import { useState, useMemo } from "react";
import { Minus, Plus, Check } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { cn, formatCurrency, calculateUnitPrice } from "@/lib/utils";
import { useCart } from "@/context/cart-context";

export function CustomizationBuilder({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [sizeId, setSizeId] = useState(product.sizeOptions?.[0]?.id);
  const [flavorId, setFlavorId] = useState(product.flavorOptions?.[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  const unitPrice = useMemo(
    () => calculateUnitPrice(product, { sizeId, flavorId }),
    [product, sizeId, flavorId]
  );
  const total = unitPrice * quantity;

  const needsSize = !!product.sizeOptions?.length;
  const needsFlavor = !!product.flavorOptions?.length;
  const canAdd = (!needsSize || !!sizeId) && (!needsFlavor || !!flavorId) && quantity >= 1;

  function handleAddToCart() {
    if (!canAdd) return;
    addItem(product, {
      sizeId,
      flavorId,
      quantity,
      specialRequests: specialRequests.trim() || undefined,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6">
      {needsSize && product.sizeOptions && (
        <fieldset>
          <legend className="mb-2.5 text-sm font-semibold text-text">
            Size <span className="text-primary">*</span>
          </legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {product.sizeOptions.map((size) => (
              <button
                key={size.id}
                type="button"
                onClick={() => setSizeId(size.id)}
                aria-pressed={sizeId === size.id}
                className={cn(
                  "flex flex-col items-start gap-0.5 rounded-xl border px-3.5 py-2.5 text-left transition-colors",
                  sizeId === size.id
                    ? "border-primary bg-primary-light"
                    : "border-accent hover:border-primary/50"
                )}
              >
                <span className="flex w-full items-center justify-between text-sm font-medium text-text">
                  {size.label}
                  {sizeId === size.id && <Check className="h-4 w-4 text-primary" />}
                </span>
                {size.servesLabel && (
                  <span className="text-xs text-text-muted">{size.servesLabel}</span>
                )}
                {size.priceModifier > 0 && (
                  <span className="text-xs text-text-muted">+{formatCurrency(size.priceModifier)}</span>
                )}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {needsFlavor && product.flavorOptions && product.flavorOptions.length > 1 && (
        <fieldset>
          <legend className="mb-2.5 text-sm font-semibold text-text">
            Flavor <span className="text-primary">*</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.flavorOptions.map((flavor) => (
              <button
                key={flavor.id}
                type="button"
                onClick={() => setFlavorId(flavor.id)}
                aria-pressed={flavorId === flavor.id}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  flavorId === flavor.id
                    ? "border-primary bg-primary text-white"
                    : "border-accent text-text hover:border-primary/50"
                )}
              >
                {flavor.label}
                {flavor.priceModifier > 0 && ` (+${formatCurrency(flavor.priceModifier)})`}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="mb-2.5 text-sm font-semibold text-text">Quantity</legend>
        <div className="flex items-center gap-3 rounded-xl border border-accent p-1.5 w-fit">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="rounded-lg p-2 text-text-muted hover:bg-accent/60 hover:text-primary disabled:opacity-30"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-6 text-center text-sm font-semibold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="rounded-lg p-2 text-text-muted hover:bg-accent/60 hover:text-primary"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </fieldset>

      <Textarea
        id="special-requests"
        label="Special requests"
        hint="Allergies, message on cake, decoration preferences, etc. (optional)"
        rows={3}
        maxLength={300}
        value={specialRequests}
        onChange={(e) => setSpecialRequests(e.target.value)}
        placeholder="e.g. “Happy Birthday Sam” in pink icing, nut-free please"
      />

      <div className="flex items-center justify-between rounded-xl bg-primary-light/60 px-4 py-3">
        <span className="text-sm font-medium text-text">Total</span>
        <span className="font-display text-xl font-semibold text-primary">
          {formatCurrency(total)}
        </span>
      </div>

      <Button size="lg" onClick={handleAddToCart} disabled={!canAdd} className="relative">
        {justAdded ? (
          <>
            <Check className="h-4 w-4" /> Added to Cart
          </>
        ) : (
          "Add to Cart"
        )}
      </Button>

      {product.leadTimeDays > 0 && (
        <p className="text-center text-xs text-text-muted">
          Requires {product.leadTimeDays} day{product.leadTimeDays > 1 ? "s" : ""} advance notice
        </p>
      )}
    </div>
  );
}
