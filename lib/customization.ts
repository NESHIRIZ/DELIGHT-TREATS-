import { CustomizationSelection, Product } from "@/types";

export function getOptionLabels(
  product: Product,
  customization: CustomizationSelection
): string {
  const parts: string[] = [];

  // Prefer the frozen label (set when a cart line is persisted server-side)
  // over an ID lookup against the product's *current* options — the ID
  // might not resolve anymore if the product's options changed since this
  // item was added. See the comment on CustomizationSelection.
  if (customization.sizeLabel) {
    parts.push(customization.sizeLabel);
  } else if (customization.sizeId && product.sizeOptions) {
    const size = product.sizeOptions.find((s) => s.id === customization.sizeId);
    if (size) parts.push(size.label);
  }

  if (customization.flavorLabel) {
    parts.push(customization.flavorLabel);
  } else if (customization.flavorId && product.flavorOptions) {
    const flavor = product.flavorOptions.find((f) => f.id === customization.flavorId);
    if (flavor) parts.push(flavor.label);
  }

  parts.push(`Qty ${customization.quantity}`);

  return parts.join(" · ");
}
