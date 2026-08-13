import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeProduct, categoryToDb } from "@/lib/serializers";
import type { ProductCategory } from "@/types";
import type { Prisma } from "@/generated/prisma/client";

const VALID_CATEGORIES = new Set(Object.keys(categoryToDb));

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search")?.trim() ?? "";
  const category = searchParams.get("category")?.trim() ?? "";

  if (category && !VALID_CATEGORIES.has(category)) {
    return NextResponse.json({ error: "Unknown category." }, { status: 400 });
  }

  const where: Prisma.ProductWhereInput = {};

  if (category) {
    where.category = categoryToDb[category as ProductCategory] as Prisma.ProductWhereInput["category"];
  }

  if (search) {
    // Case-insensitive partial match on name or short description, per
    // DT-08's "improve search relevance (partial matches, case-insensitivity)".
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { shortDescription: { contains: search, mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    include: { sizeOptions: true, flavorOptions: true },
    orderBy: [{ featured: "desc" }, { name: "asc" }],
  });

  return NextResponse.json({
    products: products.map(serializeProduct),
  });
}
