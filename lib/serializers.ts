import type {
  Product as PrismaProduct,
  SizeOption as PrismaSizeOption,
  FlavorOption as PrismaFlavorOption,
  CartItem as PrismaCartItem,
  Order as PrismaOrder,
  OrderItem as PrismaOrderItem,
  Event as PrismaEvent,
  Guest as PrismaGuest,
} from "@/generated/prisma/client";
import type {
  Product,
  ProductCategory,
  SizeOption,
  FlavorOption,
  CartItem,
  Order,
  OrderItem,
  OrderStatus,
  BakeryEvent,
  Guest,
  EventType,
  EventStatus,
} from "@/types";

type ProductWithOptions = PrismaProduct & {
  sizeOptions: PrismaSizeOption[];
  flavorOptions: PrismaFlavorOption[];
};

// Prisma enums are UPPER_SNAKE_CASE (matches Postgres convention); the
// frontend's ProductCategory type is lower-kebab-case (matches the original
// mock data and URL query params like ?category=cakes). This is the single
// place that translation happens.
const categoryFromDb: Record<string, ProductCategory> = {
  CAKES: "cakes",
  CUPCAKES: "cupcakes",
  PASTRIES: "pastries",
  BREADS: "breads",
  COOKIES: "cookies",
  SEASONAL: "seasonal",
};

export const categoryToDb: Record<ProductCategory, string> = {
  cakes: "CAKES",
  cupcakes: "CUPCAKES",
  pastries: "PASTRIES",
  breads: "BREADS",
  cookies: "COOKIES",
  seasonal: "SEASONAL",
};

function serializeSizeOption(option: PrismaSizeOption): SizeOption {
  return {
    id: option.id,
    label: option.label,
    priceModifier: Number(option.priceModifier),
    servesLabel: option.servesLabel ?? undefined,
  };
}

function serializeFlavorOption(option: PrismaFlavorOption): FlavorOption {
  return {
    id: option.id,
    label: option.label,
    priceModifier: Number(option.priceModifier),
  };
}

export function serializeProduct(product: ProductWithOptions): Product {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: categoryFromDb[product.category] ?? "cakes",
    shortDescription: product.shortDescription,
    description: product.description,
    basePrice: Number(product.basePrice),
    images: product.images,
    isCustomizable: product.isCustomizable,
    sizeOptions: product.sizeOptions
      .sort((a: PrismaSizeOption, b: PrismaSizeOption) => a.sortOrder - b.sortOrder)
      .map(serializeSizeOption),
    flavorOptions: product.flavorOptions
      .sort((a: PrismaFlavorOption, b: PrismaFlavorOption) => a.sortOrder - b.sortOrder)
      .map(serializeFlavorOption),
    allergens: product.allergens,
    leadTimeDays: product.leadTimeDays,
    featured: product.featured,
    rating: product.rating ? Number(product.rating) : undefined,
    reviewCount: product.reviewCount,
  };
}

type CartItemWithProduct = PrismaCartItem & {
  product: ProductWithOptions;
};

export function serializeCartItem(item: CartItemWithProduct): CartItem {
  const unitPrice = Number(item.unitPrice);
  return {
    id: item.id,
    productId: item.productId,
    product: serializeProduct(item.product),
    customization: {
      // sizeId/flavorId aren't stored on CartItem (see schema.prisma's
      // comment on the model) — only the frozen labels are. The frontend's
      // getOptionLabels() already prefers these labels over an ID lookup,
      // so leaving sizeId/flavorId undefined here is intentional, not a gap.
      sizeLabel: item.sizeLabel ?? undefined,
      flavorLabel: item.flavorLabel ?? undefined,
      quantity: item.quantity,
      specialRequests: item.specialRequests ?? undefined,
    },
    unitPrice,
    lineTotal: unitPrice * item.quantity,
  };
}

const orderStatusFromDb: Record<string, OrderStatus> = {
  RECEIVED: "received",
  PREPARING: "preparing",
  READY: "ready",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const orderStatusToDb: Record<OrderStatus, string> = {
  received: "RECEIVED",
  preparing: "PREPARING",
  ready: "READY",
  completed: "COMPLETED",
  cancelled: "CANCELLED",
};

function serializeOrderItem(item: PrismaOrderItem): OrderItem {
  const unitPrice = Number(item.unitPrice);
  return {
    id: item.id,
    productName: item.productName,
    customization: {
      sizeLabel: item.sizeLabel ?? undefined,
      flavorLabel: item.flavorLabel ?? undefined,
      quantity: item.quantity,
      specialRequests: item.specialRequests ?? undefined,
    },
    unitPrice,
    lineTotal: Number(item.lineTotal),
  };
}

type OrderWithItems = PrismaOrder & { items: PrismaOrderItem[] };

export function serializeOrder(order: OrderWithItems): Order {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    customerId: order.userId,
    items: order.items.map(serializeOrderItem),
    subtotal: Number(order.subtotal),
    total: Number(order.total),
    status: orderStatusFromDb[order.status] ?? "received",
    createdAt: order.createdAt.toISOString(),
    pickupOrDeliveryDate: order.pickupOrDeliveryDate?.toISOString(),
    contactName: order.contactName,
    contactPhone: order.contactPhone,
    contactEmail: order.contactEmail,
    notes: order.notes ?? undefined,
  };
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

const eventTypeFromDb: Record<string, EventType> = {
  WEDDING: "wedding",
  BIRTHDAY: "birthday",
  CORPORATE: "corporate",
  BABY_SHOWER: "baby-shower",
  OTHER: "other",
};

export const eventTypeToDb: Record<EventType, string> = {
  wedding: "WEDDING",
  birthday: "BIRTHDAY",
  corporate: "CORPORATE",
  "baby-shower": "BABY_SHOWER",
  other: "OTHER",
};

const eventStatusFromDb: Record<string, EventStatus> = {
  PLANNING: "planning",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const eventStatusToDb: Record<EventStatus, string> = {
  planning: "PLANNING",
  confirmed: "CONFIRMED",
  completed: "COMPLETED",
  cancelled: "CANCELLED",
};

function serializeGuest(guest: PrismaGuest): Guest {
  return {
    id: guest.id,
    name: guest.name,
    count: guest.count,
    dietaryNotes: guest.dietaryNotes ?? undefined,
  };
}

type EventWithGuests = PrismaEvent & { guests: PrismaGuest[] };

export function serializeEvent(event: EventWithGuests): BakeryEvent {
  return {
    id: event.id,
    customerId: event.userId,
    name: event.name,
    type: eventTypeFromDb[event.type] ?? "other",
    status: eventStatusFromDb[event.status] ?? "planning",
    date: event.date.toISOString(),
    guestCountEstimate: event.guestCountEstimate,
    guests: event.guests.map(serializeGuest),
    requirements: event.requirements ?? undefined,
    createdAt: event.createdAt.toISOString(),
  };
}
