import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { serializeCartItem } from "@/lib/serializers";
import type { SizeOption, FlavorOption } from "@/generated/prisma/client";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const items = await prisma.cartItem.findMany({
    where: { userId: user.id },
    include: { product: { include: { sizeOptions: true, flavorOptions: true } } },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ items: items.map(serializeCartItem) });
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

  const { productId, sizeId, flavorId, quantity, specialRequests } = body as Record<string, unknown>;

  if (typeof productId !== "string" || !productId) {
    return NextResponse.json({ error: "productId is required." }, { status: 400 });
  }
  const qty = typeof quantity === "number" ? Math.floor(quantity) : 1;
  if (qty < 1) {
    return NextResponse.json({ error: "Quantity must be at least 1." }, { status: 400 });
  }
  if (specialRequests !== undefined && typeof specialRequests !== "string") {
    return NextResponse.json({ error: "Invalid special requests." }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { sizeOptions: true, flavorOptions: true },
  });
  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  // Server-side price calculation — never trust a client-supplied price.
  // This mirrors calculateUnitPrice() in lib/utils.ts but is intentionally
  // reimplemented here against freshly-fetched DB data rather than shared,
  // since the client-side version operates on the frontend Product type
  // and trusting its output would mean trusting client-supplied numbers.
  let unitPrice = Number(product.basePrice);
  let sizeLabel: string | null = null;
  let flavorLabel: string | null = null;

  if (product.sizeOptions.length > 0) {
    if (typeof sizeId !== "string") {
      return NextResponse.json({ error: "A size selection is required for this product." }, { status: 400 });
    }
    const size = product.sizeOptions.find((s: SizeOption) => s.id === sizeId);
    if (!size) {
      return NextResponse.json({ error: "Invalid size option." }, { status: 400 });
    }
    unitPrice += Number(size.priceModifier);
    sizeLabel = size.label;
  }

  if (product.flavorOptions.length > 0) {
    if (typeof flavorId !== "string") {
      return NextResponse.json({ error: "A flavor selection is required for this product." }, { status: 400 });
    }
    const flavor = product.flavorOptions.find((f: FlavorOption) => f.id === flavorId);
    if (!flavor) {
      return NextResponse.json({ error: "Invalid flavor option." }, { status: 400 });
    }
    unitPrice += Number(flavor.priceModifier);
    flavorLabel = flavor.label;
  }

  const created = await prisma.cartItem.create({
    data: {
      userId: user.id,
      productId: product.id,
      sizeLabel,
      flavorLabel,
      quantity: qty,
      specialRequests: typeof specialRequests === "string" && specialRequests.trim() ? specialRequests.trim() : null,
      unitPrice,
    },
    include: { product: { include: { sizeOptions: true, flavorOptions: true } } },
  });

  return NextResponse.json({ item: serializeCartItem(created) }, { status: 201 });
}
