// Seeds the database with the same catalogue currently in data/products.ts,
// so the app has real data to render immediately after migration.
//
// Run with: pnpm run db:seed
// (wired up via the "seed" key in prisma.config.ts)

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ProductCategory } from "../generated/prisma/client";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is missing in your .env file!");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

const categoryMap: Record<string, ProductCategory> = {
  cakes: "CAKES",
  cupcakes: "CUPCAKES",
  pastries: "PASTRIES",
  breads: "BREADS",
  cookies: "COOKIES",
  seasonal: "SEASONAL",
};

const products = [
  {
    slug: "classic-vanilla-bean-cake",
    name: "Classic Vanilla Bean Cake",
    category: "cakes",
    shortDescription: "Buttery vanilla sponge with Madagascar bean specks and silky buttercream.",
    description:
      "Our best-seller for a reason: layers of buttery vanilla-bean sponge, brushed with a light syrup, and finished with smooth vanilla buttercream. A blank canvas for any celebration — dress it up with fresh flowers or keep it simple.",
    basePrice: 38,
    images: ["/products/vanilla-cake.jpg"],
    isCustomizable: true,
    sizeOptions: [
      { label: "6-inch", priceModifier: 0, servesLabel: "Serves 6–8" },
      { label: "8-inch", priceModifier: 14, servesLabel: "Serves 10–12" },
      { label: "10-inch", priceModifier: 30, servesLabel: "Serves 16–20" },
    ],
    flavorOptions: [
      { label: "Classic Vanilla", priceModifier: 0 },
      { label: "Lemon Vanilla", priceModifier: 3 },
      { label: "Almond Vanilla", priceModifier: 3 },
    ],
    allergens: ["gluten", "dairy", "eggs"],
    leadTimeDays: 2,
    featured: true,
    rating: 4.8,
    reviewCount: 214,
  },
  {
    slug: "midnight-chocolate-fudge-cake",
    name: "Midnight Chocolate Fudge Cake",
    category: "cakes",
    shortDescription: "Deep dark chocolate sponge with a rich fudge ganache.",
    description:
      "Rich, dense, and unapologetically chocolate. Three layers of dark cocoa sponge filled and finished with silky fudge ganache. For the chocolate purist in your life.",
    basePrice: 42,
    images: ["/products/chocolate-cake.jpg"],
    isCustomizable: true,
    sizeOptions: [
      { label: "6-inch", priceModifier: 0, servesLabel: "Serves 6–8" },
      { label: "8-inch", priceModifier: 16, servesLabel: "Serves 10–12" },
      { label: "10-inch", priceModifier: 34, servesLabel: "Serves 16–20" },
    ],
    flavorOptions: [
      { label: "70% Dark Chocolate", priceModifier: 0 },
      { label: "Salted Caramel Swirl", priceModifier: 4 },
      { label: "Raspberry Ganache", priceModifier: 4 },
    ],
    allergens: ["gluten", "dairy", "eggs"],
    leadTimeDays: 2,
    featured: true,
    rating: 4.9,
    reviewCount: 331,
  },
  {
    slug: "red-velvet-dream-cake",
    name: "Red Velvet Dream Cake",
    category: "cakes",
    shortDescription: "Velvety cocoa layers with tangy cream cheese frosting.",
    description:
      "A Southern classic done right — velvety red cocoa sponge with a delicate crumb, layered with tangy-sweet cream cheese frosting.",
    basePrice: 40,
    images: ["/products/red-velvet-cake.jpg"],
    isCustomizable: true,
    sizeOptions: [
      { label: "6-inch", priceModifier: 0, servesLabel: "Serves 6–8" },
      { label: "8-inch", priceModifier: 15, servesLabel: "Serves 10–12" },
      { label: "10-inch", priceModifier: 32, servesLabel: "Serves 16–20" },
    ],
    flavorOptions: [{ label: "Classic Red Velvet", priceModifier: 0 }],
    allergens: ["gluten", "dairy", "eggs"],
    leadTimeDays: 2,
    featured: false,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    slug: "salted-caramel-cupcakes",
    name: "Salted Caramel Cupcakes",
    category: "cupcakes",
    shortDescription: "Brown butter cupcakes filled with salted caramel.",
    description:
      "Brown-butter cupcakes with a molten salted caramel center, topped with swirled caramel buttercream and a flake of sea salt.",
    basePrice: 4.5,
    images: ["/products/caramel-cupcakes.jpg"],
    isCustomizable: true,
    sizeOptions: [
      { label: "Half Dozen (6)", priceModifier: 0 },
      { label: "Dozen (12)", priceModifier: 22 },
    ],
    flavorOptions: [{ label: "Classic Salted Caramel", priceModifier: 0 }],
    allergens: ["gluten", "dairy", "eggs"],
    leadTimeDays: 1,
    featured: true,
    rating: 4.9,
    reviewCount: 98,
  },
  {
    slug: "red-velvet-cupcakes",
    name: "Red Velvet Cupcakes",
    category: "cupcakes",
    shortDescription: "Mini versions of our beloved red velvet cake.",
    description: "All the flavor of our signature red velvet cake, in perfectly portioned single servings.",
    basePrice: 4,
    images: ["/products/red-velvet-cupcakes.jpg"],
    isCustomizable: true,
    sizeOptions: [
      { label: "Half Dozen (6)", priceModifier: 0 },
      { label: "Dozen (12)", priceModifier: 20 },
    ],
    flavorOptions: [{ label: "Classic", priceModifier: 0 }],
    allergens: ["gluten", "dairy", "eggs"],
    leadTimeDays: 1,
    featured: false,
    rating: 4.6,
    reviewCount: 71,
  },
  {
    slug: "butter-croissants",
    name: "Butter Croissants",
    category: "pastries",
    shortDescription: "Laminated, flaky, and baked fresh every morning.",
    description:
      "72 hours of lamination for a shatteringly crisp exterior and a soft, buttery interior. Baked in small batches every morning.",
    basePrice: 3.5,
    images: ["/products/croissants.jpg"],
    isCustomizable: false,
    sizeOptions: [],
    flavorOptions: [],
    allergens: ["gluten", "dairy"],
    leadTimeDays: 0,
    featured: false,
    rating: 4.8,
    reviewCount: 189,
  },
  {
    slug: "almond-croissants",
    name: "Almond Croissants",
    category: "pastries",
    shortDescription: "Twice-baked croissants filled with almond cream.",
    description:
      "Day-old croissants get a second life: soaked in almond syrup, filled with almond frangipane, and topped with sliced almonds.",
    basePrice: 4.75,
    images: ["/products/almond-croissants.jpg"],
    isCustomizable: false,
    sizeOptions: [],
    flavorOptions: [],
    allergens: ["gluten", "dairy", "eggs", "tree nuts"],
    leadTimeDays: 0,
    featured: false,
    rating: 4.7,
    reviewCount: 64,
  },
  {
    slug: "sourdough-loaf",
    name: "Country Sourdough Loaf",
    category: "breads",
    shortDescription: "Naturally leavened, 24-hour fermented sourdough.",
    description:
      "A crackling crust and open, tangy crumb from our 8-year-old starter. Naturally leavened and fermented for 24 hours.",
    basePrice: 8,
    images: ["/products/sourdough.jpg"],
    isCustomizable: false,
    sizeOptions: [],
    flavorOptions: [],
    allergens: ["gluten"],
    leadTimeDays: 1,
    featured: false,
    rating: 4.9,
    reviewCount: 142,
  },
  {
    slug: "chocolate-chip-cookies",
    name: "Brown Butter Chocolate Chip Cookies",
    category: "cookies",
    shortDescription: "Crisp edges, gooey center, brown butter depth.",
    description:
      "Browned butter, dark brown sugar, and three kinds of chocolate. Rested 48 hours for maximum flavor.",
    basePrice: 3,
    images: ["/products/choc-chip-cookies.jpg"],
    isCustomizable: true,
    sizeOptions: [
      { label: "Half Dozen (6)", priceModifier: 0 },
      { label: "Dozen (12)", priceModifier: 14 },
    ],
    flavorOptions: [{ label: "Classic", priceModifier: 0 }],
    allergens: ["gluten", "dairy", "eggs"],
    leadTimeDays: 0,
    featured: true,
    rating: 4.9,
    reviewCount: 267,
  },
  {
    slug: "pumpkin-spice-cake",
    name: "Pumpkin Spice Layer Cake",
    category: "seasonal",
    shortDescription: "Warm spiced pumpkin cake with maple cream cheese frosting.",
    description:
      "A seasonal favorite: moist pumpkin spice layers with maple cream cheese frosting and a candied pecan crunch.",
    basePrice: 44,
    images: ["/products/pumpkin-cake.jpg"],
    isCustomizable: true,
    sizeOptions: [
      { label: "6-inch", priceModifier: 0, servesLabel: "Serves 6–8" },
      { label: "8-inch", priceModifier: 16, servesLabel: "Serves 10–12" },
    ],
    flavorOptions: [{ label: "Classic", priceModifier: 0 }],
    allergens: ["gluten", "dairy", "eggs", "tree nuts"],
    leadTimeDays: 2,
    featured: false,
    rating: 4.8,
    reviewCount: 88,
  },
  {
    slug: "cinnamon-rolls",
    name: "Brown Sugar Cinnamon Rolls",
    category: "pastries",
    shortDescription: "Soft-baked rolls with brown sugar cinnamon filling.",
    description:
      "Pillowy soft dough rolled with brown sugar and cinnamon, finished with a cream cheese glaze while still warm.",
    basePrice: 5,
    images: ["/products/cinnamon-rolls.jpg"],
    isCustomizable: true,
    sizeOptions: [
      { label: "Single", priceModifier: 0 },
      { label: "Box of 4", priceModifier: 14 },
      { label: "Box of 6", priceModifier: 22 },
    ],
    flavorOptions: [{ label: "Classic", priceModifier: 0 }],
    allergens: ["gluten", "dairy", "eggs"],
    leadTimeDays: 1,
    featured: false,
    rating: 4.8,
    reviewCount: 133,
  },
  {
    slug: "lemon-bars",
    name: "Lemon Bars",
    category: "cookies",
    shortDescription: "Tangy lemon curd over a buttery shortbread crust.",
    description: "Bright, tangy lemon curd baked over a buttery shortbread base, dusted with powdered sugar.",
    basePrice: 3.75,
    images: ["/products/lemon-bars.jpg"],
    isCustomizable: true,
    sizeOptions: [
      { label: "Half Dozen (6)", priceModifier: 0 },
      { label: "Dozen (12)", priceModifier: 16 },
    ],
    flavorOptions: [{ label: "Classic", priceModifier: 0 }],
    allergens: ["gluten", "dairy", "eggs"],
    leadTimeDays: 0,
    featured: false,
    rating: 4.6,
    reviewCount: 52,
  },
];

async function main() {
  console.log("Seeding database…");

  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        category: categoryMap[p.category],
        shortDescription: p.shortDescription,
        description: p.description,
        basePrice: p.basePrice,
        images: p.images,
        isCustomizable: p.isCustomizable,
        allergens: p.allergens,
        leadTimeDays: p.leadTimeDays,
        featured: p.featured,
        rating: p.rating,
        reviewCount: p.reviewCount,
        sizeOptions: {
          create: p.sizeOptions.map((s, i) => ({ ...s, sortOrder: i })),
        },
        flavorOptions: {
          create: p.flavorOptions.map((f, i) => ({ ...f, sortOrder: i })),
        },
      },
    });
    console.log(`  ✓ ${product.name}`);
  }

  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
