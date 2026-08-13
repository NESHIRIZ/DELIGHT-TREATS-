// Domain types for Delight Treats.
// These mirror the eventual Prisma schema so the frontend can be
// wired to real API routes later with minimal changes.

export type ProductCategory =
  | "cakes"
  | "cupcakes"
  | "pastries"
  | "breads"
  | "cookies"
  | "seasonal";

export interface SizeOption {
  id: string;
  label: string;
  priceModifier: number; // added to base price
  servesLabel?: string; // e.g. "Serves 8–10"
}

export interface FlavorOption {
  id: string;
  label: string;
  priceModifier: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  basePrice: number;
  images: string[];
  isCustomizable: boolean;
  sizeOptions?: SizeOption[];
  flavorOptions?: FlavorOption[];
  allergens?: string[];
  leadTimeDays: number; // how far ahead this must be ordered
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface CustomizationSelection {
  sizeId?: string;
  flavorId?: string;
  // Frozen display labels, set once a selection is persisted to the cart
  // API. The DB stores labels directly (not just IDs) so a cart line's
  // description survives even if the product's size/flavor options change
  // later. When present, these take priority over looking the ID up
  // against the product's *current* options (see lib/customization.ts).
  sizeLabel?: string;
  flavorLabel?: string;
  quantity: number;
  specialRequests?: string;
}

export interface CartItem {
  id: string; // unique cart line id
  productId: string;
  product: Product;
  customization: CustomizationSelection;
  unitPrice: number; // base + modifiers, computed at add-time
  lineTotal: number;
}

export type OrderStatus =
  | "received"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export interface OrderItem {
  id: string;
  productName: string;
  customization: CustomizationSelection;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  pickupOrDeliveryDate?: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  notes?: string;
}

export type EventType = "wedding" | "birthday" | "corporate" | "baby-shower" | "other";
export type EventStatus = "planning" | "confirmed" | "completed" | "cancelled";

export interface Guest {
  id: string;
  name: string;
  dietaryNotes?: string;
  count: number;
}

export interface BakeryEvent {
  id: string;
  customerId: string;
  name: string;
  type: EventType;
  status: EventStatus;
  date: string;
  guestCountEstimate: number;
  guests: Guest[];
  requirements?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}
