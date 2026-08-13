import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { serializeCartItem } from "@/lib/serializers";

async function loadOwnedCartItem(userId: string, cartItemId: string) {
  const item = await prisma.cartItem.findUnique({ where: { id: cartItemId } });
  if (!item || item.userId !== userId) return null;
  return item;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await loadOwnedCartItem(user.id, id);
  if (!existing) {
    // Same response whether the line doesn't exist or belongs to someone
    // else — don't confirm the existence of other users' cart lines.
    return NextResponse.json({ error: "Cart item not found." }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { quantity } = body as Record<string, unknown>;
  const qty = typeof quantity === "number" ? Math.floor(quantity) : NaN;
  if (!Number.isFinite(qty) || qty < 1) {
    return NextResponse.json({ error: "Quantity must be a whole number of at least 1." }, { status: 400 });
  }

  const updated = await prisma.cartItem.update({
    where: { id },
    data: { quantity: qty },
    include: { product: { include: { sizeOptions: true, flavorOptions: true } } },
  });

  return NextResponse.json({ item: serializeCartItem(updated) });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await loadOwnedCartItem(user.id, id);
  if (!existing) {
    return NextResponse.json({ error: "Cart item not found." }, { status: 404 });
  }

  await prisma.cartItem.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
