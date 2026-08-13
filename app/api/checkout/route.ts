import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { serializeOrder } from "@/lib/serializers";
import { isValidEmail } from "@/lib/validation";
import type { Product, SizeOption, FlavorOption, Prisma } from "@/generated/prisma/client";

type ProductWithOptions = Product & { sizeOptions: SizeOption[]; flavorOptions: FlavorOption[] };

interface CheckoutLineInput {
  productId: string;
  sizeId?: string;
  flavorId?: string;
  quantity: number;
  specialRequests?: string;
}

function generateOrderNumber(): string {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `DT-${random}`;
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const {
    items,
    contactName,
    contactEmail,
    contactPhone,
    fulfillmentType,
    pickupOrDeliveryDate,
    deliveryAddress,
    notes,
  } = body as Record<string, unknown>;

  // --- Validation ---------------------------------------------------------
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }
  if (typeof contactName !== "string" || !contactName.trim()) {
    return NextResponse.json({ error: "Contact name is required." }, { status: 400 });
  }
  if (typeof contactEmail !== "string" || !isValidEmail(contactEmail)) {
    return NextResponse.json({ error: "A valid contact email is required." }, { status: 400 });
  }
  if (typeof contactPhone !== "string" || !contactPhone.trim()) {
    return NextResponse.json({ error: "Contact phone is required." }, { status: 400 });
  }
  const fulfillment = fulfillmentType === "delivery" ? "DELIVERY" : "PICKUP";
  if (fulfillment === "DELIVERY" && (typeof deliveryAddress !== "string" || !deliveryAddress.trim())) {
    return NextResponse.json({ error: "A delivery address is required." }, { status: 400 });
  }
  let parsedDate: Date | null = null;
  if (typeof pickupOrDeliveryDate === "string" && pickupOrDeliveryDate) {
    const d = new Date(pickupOrDeliveryDate);
    if (Number.isNaN(d.getTime())) {
      return NextResponse.json({ error: "Invalid date." }, { status: 400 });
    }
    parsedDate = d;
  }

  const lines = items as CheckoutLineInput[];
  for (const line of lines) {
    if (typeof line.productId !== "string" || !line.productId) {
      return NextResponse.json({ error: "Each item needs a productId." }, { status: 400 });
    }
    if (typeof line.quantity !== "number" || line.quantity < 1) {
      return NextResponse.json({ error: "Each item needs a valid quantity." }, { status: 400 });
    }
  }

  // --- Server-side price recalculation ------------------------------------
  // Never trust client-supplied prices or totals. Re-fetch every product
  // fresh and recompute, so a stale cart (or a tampered request) can't
  // under- or over-charge. This is the same integrity concern DT-20 in the
  // project plan calls out: "Handle product price or availability changes
  // between add-to-cart and checkout."
  const productIds = [...new Set(lines.map((l) => l.productId))];
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    include: { sizeOptions: true, flavorOptions: true },
  });
  const productsById = new Map<string, ProductWithOptions>(products.map((p: ProductWithOptions) => [p.id, p]));

  const orderItemsData: {
    productId: string;
    productName: string;
    sizeLabel: string | null;
    flavorLabel: string | null;
    quantity: number;
    specialRequests: string | null;
    unitPrice: number;
    lineTotal: number;
  }[] = [];

  for (const line of lines) {
    const product = productsById.get(line.productId);
    if (!product) {
      return NextResponse.json(
        { error: `One of the items in your cart is no longer available.` },
        { status: 409 }
      );
    }

    let unitPrice = Number(product.basePrice);
    let sizeLabel: string | null = null;
    let flavorLabel: string | null = null;

    if (product.sizeOptions.length > 0) {
      const size = product.sizeOptions.find((s: SizeOption) => s.id === line.sizeId);
      if (!size) {
        return NextResponse.json(
          { error: `Please select a valid size for ${product.name}.` },
          { status: 400 }
        );
      }
      unitPrice += Number(size.priceModifier);
      sizeLabel = size.label;
    }

    if (product.flavorOptions.length > 0) {
      const flavor = product.flavorOptions.find((f: FlavorOption) => f.id === line.flavorId);
      if (!flavor) {
        return NextResponse.json(
          { error: `Please select a valid flavor for ${product.name}.` },
          { status: 400 }
        );
      }
      unitPrice += Number(flavor.priceModifier);
      flavorLabel = flavor.label;
    }

    const quantity = Math.floor(line.quantity);
    orderItemsData.push({
      productId: product.id,
      productName: product.name,
      sizeLabel,
      flavorLabel,
      quantity,
      specialRequests:
        typeof line.specialRequests === "string" && line.specialRequests.trim()
          ? line.specialRequests.trim()
          : null,
      unitPrice,
      lineTotal: unitPrice * quantity,
    });
  }

  const subtotal = orderItemsData.reduce((sum, item) => sum + item.lineTotal, 0);
  const total = subtotal; // tax/delivery fees are a future enhancement — see project plan's "Future Improvements"

  // --- Create order + clear cart atomically -------------------------------
  // A transaction ensures we never end up with an order that was created
  // but whose cart wasn't cleared (or vice versa) if something fails
  // partway through.
  const order = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const created = await tx.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: user.id,
        fulfillmentType: fulfillment,
        pickupOrDeliveryDate: parsedDate,
        deliveryAddress: fulfillment === "DELIVERY" ? (deliveryAddress as string).trim() : null,
        contactName: contactName.trim(),
        contactPhone: contactPhone.trim(),
        contactEmail: contactEmail.trim().toLowerCase(),
        notes: typeof notes === "string" && notes.trim() ? notes.trim() : null,
        subtotal,
        total,
        items: { create: orderItemsData },
      },
      include: { items: true },
    });

    // Clear the user's server-side cart, if they had one persisted there.
    // (The frontend's primary cart is currently sessionStorage-based — see
    // README-BACKEND.md — so this is a no-op for most checkouts today, but
    // keeps the two in sync for anything that did use the cart API.)
    await tx.cartItem.deleteMany({ where: { userId: user.id } });

    return created;
  });

  return NextResponse.json({ order: serializeOrder(order) }, { status: 201 });
}
