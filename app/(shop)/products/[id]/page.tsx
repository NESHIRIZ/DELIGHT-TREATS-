import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Cake, Star, Info } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { serializeProduct, categoryToDb } from "@/lib/serializers";
import { categoryLabels } from "@/data/products";
import { CustomizationBuilder } from "@/components/product/customization-builder";
import { ProductCard } from "@/components/product/product-card";
import { formatCurrency } from "@/lib/utils";
import type { Prisma } from "@/generated/prisma/client";

// No generateStaticParams here: products now come from Postgres and can
// change without a rebuild (new items, price updates, etc.), so this page
// renders dynamically per-request rather than being statically generated
// at build time for a fixed list of slugs.

async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { sizeOptions: true, flavorOptions: true },
  });
  return product ? serializeProduct(product) : null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductBySlug(id);
  if (!product) return { title: "Product Not Found | Delight Treats" };
  return {
    title: `${product.name} | Delight Treats`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductBySlug(id);

  if (!product) notFound();

  const relatedRaw = await prisma.product.findMany({
    where: {
      category: categoryToDb[product.category] as Prisma.ProductWhereInput["category"],
      id: { not: product.id },
    },
    include: { sizeOptions: true, flavorOptions: true },
    take: 4,
  });
  const related = relatedRaw.map(serializeProduct);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-text-muted">
        <Link href="/products" className="hover:text-primary">Shop</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href={`/products?category=${product.category}`} className="hover:text-primary">
          {categoryLabels[product.category]}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-text">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-primary-light">
  {product.images?.[0] ? (
    <Image
      src={product.images[0]}
      alt={product.name}
      fill
      priority
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 50vw"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center text-primary/25">
      <Cake className="h-32 w-32" strokeWidth={1} />
    </div>
  )}
</div>

        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
            {categoryLabels[product.category]}
          </span>
          <h1 className="mt-1 font-display text-3xl font-semibold text-text sm:text-4xl">
            {product.name}
          </h1>

          {product.rating && (
            <div className="mt-2 flex items-center gap-1.5 text-sm text-text-muted">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium text-text">{product.rating}</span>
              <span>({product.reviewCount} reviews)</span>
            </div>
          )}

          <p className="mt-4 text-base leading-relaxed text-text-muted">{product.description}</p>

          <p className="mt-4 font-display text-2xl font-semibold text-primary">
            From {formatCurrency(product.basePrice)}
          </p>

          {product.allergens && product.allergens.length > 0 && (
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-accent/40 px-3.5 py-2.5 text-xs text-text-muted">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>Contains: {product.allergens.join(", ")}</span>
            </div>
          )}

          <div className="mt-6 border-t border-accent pt-6">
            <CustomizationBuilder product={product} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-text">You Might Also Like</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
