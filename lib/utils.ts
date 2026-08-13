import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CustomizationSelection, Product } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function calculateUnitPrice(
  product: Product,
  customization: Pick<CustomizationSelection, "sizeId" | "flavorId">
): number {
  let price = product.basePrice;
  if (customization.sizeId && product.sizeOptions) {
    const size = product.sizeOptions.find((s) => s.id === customization.sizeId);
    if (size) price += size.priceModifier;
  }
  if (customization.flavorId && product.flavorOptions) {
    const flavor = product.flavorOptions.find((f) => f.id === customization.flavorId);
    if (flavor) price += flavor.priceModifier;
  }
  return price;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}
