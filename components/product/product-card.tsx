import Link from "next/link";
import { Star, Cake } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { categoryLabels } from "@/data/products";
import Image from "next/image";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-accent transition-shadow hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-primary-light">
        {product.images?.[0] ? (
    <Image
      src={product.images[0]}
      alt={product.name}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center text-primary/25">
      <Cake className="h-16 w-16" strokeWidth={1.25} />
    </div>
  )}
        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-white">
            Bestseller
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
          {categoryLabels[product.category]}
        </span>
        <h3 className="font-display text-lg font-semibold leading-snug text-text">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-text-muted">{product.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-base font-semibold text-primary">
            {formatCurrency(product.basePrice)}
            {product.isCustomizable && <span className="text-xs font-normal text-text-muted"> +</span>}
          </span>
          {product.rating && (
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              {product.rating} ({product.reviewCount})
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
