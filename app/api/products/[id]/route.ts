import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/serializers";

// "[id]" is the route param name, but we look products up by slug — the
// frontend's product detail page has always used slugs in the URL
// (/products/classic-vanilla-bean-cake), matching the mock data's shape in
// data/products.ts. Renaming the folder to [slug] would be more accurate,
// but Next.js route param names don't need to match your domain vocabulary,
// and keeping "[id]" matches the existing frontend route file structure.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { sizeOptions: true, flavorOptions: true },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ product: serializeProduct(product) });
}
