import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cake, Croissant, Wheat, Cookie, CalendarHeart } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/serializers";
import { categoryLabels } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { LinkButton } from "@/components/ui/button";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  cakes: Cake,
  cupcakes: Cake,
  pastries: Croissant,
  breads: Wheat,
  cookies: Cookie,
  seasonal: Cake,
};

export default async function HomePage() {
  const featuredRaw = await prisma.product.findMany({
    where: { featured: true },
    include: { sizeOptions: true, flavorOptions: true },
    orderBy: { name: "asc" },
  });
  const featured = featuredRaw.map(serializeProduct);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-accent">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
          <div className="animate-fade-in">
            <span className="inline-flex items-center rounded-full bg-primary-light px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              Baked fresh, every single day
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-6xl">
              Cakes worth
              <br />
              <span className="italic text-primary">the occasion.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-text-muted">
              From everyday croissants to custom wedding cakes — order online, customize
              every detail, and pick up warm from the oven.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/products" size="lg">
                Order Now <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/dashboard/events/new" variant="outline" size="lg">
                Plan an Event
              </LinkButton>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-full bg-primary-light" />
            <div className="absolute inset-8 overflow-hidden rounded-full border border-primary/15 bg-background">
  {heroImage ? (
    <Image
      src={heroImage}
      alt="Freshly baked treat"
      fill
      priority
      className="object-cover"
      sizes="(max-width: 1024px) 80vw, 400px"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center">
      <Cake className="h-28 w-28 text-primary/70" strokeWidth={1} />
    </div>
  )}
</div>
            <div className="absolute -right-2 top-8 rounded-2xl border border-accent bg-background px-4 py-3 shadow-sm sm:right-2">
              <p className="text-xs text-text-muted">Order #DT-2841</p>
              <p className="text-sm font-semibold text-success">Ready for Pickup ✓</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-text">Shop by Category</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Object.entries(categoryLabels).map(([key, label]) => {
            const Icon = categoryIcons[key] ?? Cake;
            return (
              <Link
                key={key}
                href={`/products?category=${key}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-accent p-5 text-center transition-colors hover:border-primary hover:bg-primary-light/40"
              >
                <div className="rounded-full bg-primary-light p-3 text-primary transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-text">{label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="border-t border-accent bg-primary-light/20">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-text">Customer Favorites</h2>
              <p className="mt-1 text-text-muted">The treats people come back for.</p>
            </div>
            <Link href="/products" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Events CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-accent bg-background px-6 py-12 text-center sm:px-16">
          <div className="rounded-full bg-primary-light p-4 text-primary">
            <CalendarHeart className="h-6 w-6" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-text sm:text-3xl">
            Planning a wedding, shower, or celebration?
          </h2>
          <p className="max-w-lg text-text-muted">
            Tell us about your event and we&apos;ll help you plan the catering, cake, and
            guest count — all in one place.
          </p>
          <LinkButton href="/dashboard/events/new" size="lg" className="mt-2">
            Start an Event
          </LinkButton>
        </div>
      </section>
    </div>
  );
}

const productsWithImages = await prisma.product.findMany({
  select: {
    images: true,
  },
});

const imagePaths = productsWithImages.flatMap((product) =>
  Array.isArray(product.images)
    ? product.images.filter((image): image is string => typeof image === "string")
    : []
);

const heroImage =
  imagePaths.length > 0
    ? imagePaths[Math.floor(Math.random() * imagePaths.length)]
    : null;