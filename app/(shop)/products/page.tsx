import { Suspense } from "react";
import { PackageSearch } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { serializeProduct, categoryToDb } from "@/lib/serializers";
import { ProductCard } from "@/components/product/product-card";
import { CatalogueFilters } from "@/components/product/catalogue-filters";
import type { ProductCategory } from "@/types";
import type { Prisma } from "@/generated/prisma/client";

export const metadata = {
  title: "Shop | Delight Treats",
};

async function fetchProducts(search: string, category: string) {
  const where: Prisma.ProductWhereInput = {};

  if (category && category in categoryToDb) {
    where.category = categoryToDb[category as ProductCategory] as Prisma.ProductWhereInput["category"];
  }

  if (search) {
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

  return products.map(serializeProduct);
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const params = await searchParams;
  const search = params.search ?? "";
  const category = params.category ?? "";
  const results = await fetchProducts(search, category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-text sm:text-4xl">
          The Bakery Case
        </h1>
        <p className="mt-2 max-w-xl text-text-muted">
          Everything is baked in-house, from scratch. Browse by category or search for
          something specific.
        </p>
      </div>

      <Suspense>
        <CatalogueFilters initialQuery={search} initialCategory={category} />
      </Suspense>

      <p className="mt-6 mb-4 text-sm text-text-muted">
        {results.length} {results.length === 1 ? "item" : "items"}
      </p>

      {results.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-accent py-20 text-center">
          <PackageSearch className="h-10 w-10 text-text-muted" strokeWidth={1.25} />
          <p className="font-medium text-text">No items found</p>
          <p className="max-w-sm text-sm text-text-muted">
            Try a different search term or browse another category — new treats are added
            often.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
