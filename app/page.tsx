const featuredProducts = [
  {
    id: 1,
    name: "Strawberry Dream Cake",
    description: "Light vanilla sponge layered with fresh strawberry cream and topped with whole berries.",
    price: 45.99,
    category: "Cakes",
    emoji: "🍓",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Chocolate Truffle Box",
    description: "Handcrafted dark chocolate truffles dusted with cocoa, perfect for gifting.",
    price: 28.50,
    category: "Chocolates",
    emoji: "🍫",
    badge: "New",
  },
  {
    id: 3,
    name: "Blueberry Cheesecake",
    description: "Creamy New York-style cheesecake on a buttery biscuit base with blueberry compote.",
    price: 38.00,
    category: "Cheesecakes",
    emoji: "🫐",
    badge: "Popular",
  },
  {
    id: 4,
    name: "Cinnamon Swirl Buns",
    description: "Soft, pillowy buns swirled with cinnamon sugar and drizzled with cream cheese glaze.",
    price: 18.00,
    category: "Pastries",
    emoji: "🌀",
    badge: "Fan Favourite",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white font-sans">

      {/* ── HERO SECTION ── */}
      <section className="relative bg-white overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30 pointer-events-none"
          style={{ background: "#FCE7F3", transform: "translate(30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
          style={{ background: "#FCE7F3", transform: "translate(-30%, 30%)" }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <span
              className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 px-4 py-1 rounded-full"
              style={{ background: "#FCE7F3", color: "#EC4899" }}
            >
              Freshly Baked Daily
            </span>

            <h1
              className="text-5xl md:text-6xl font-bold leading-tight mb-6"
              style={{ color: "#1F2937" }}
            >
              Every Bite Is{" "}
              <span style={{ color: "#EC4899" }}>A Delight</span>
            </h1>

            <p className="text-lg mb-8 max-w-md mx-auto md:mx-0" style={{ color: "#6B7280" }}>
              Order custom cakes, pastries, and treats made fresh for you — tailored to your taste, delivered with love.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                className="px-8 py-4 rounded-full text-white font-semibold text-base transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                style={{ background: "#EC4899" }}
              >
                Order Now
              </button>
              <button
                className="px-8 py-4 rounded-full font-semibold text-base border-2 transition-all duration-200 hover:bg-pink-50"
                style={{ borderColor: "#EC4899", color: "#EC4899" }}
              >
                Browse Menu
              </button>
            </div>

            <div className="flex gap-8 mt-10 justify-center md:justify-start">
              {[
                { value: "500+", label: "Happy Customers" },
                { value: "50+", label: "Menu Items" },
                { value: "100%", label: "Made Fresh" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold" style={{ color: "#EC4899" }}>
                    {stat.value}
                  </p>
                  <p className="text-xs" style={{ color: "#6B7280" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div
              className="relative w-80 h-80 rounded-full flex items-center justify-center"
              style={{ background: "#FCE7F3" }}
            >
              <span className="text-9xl select-none">🎂</span>
              <div
                className="absolute top-4 right-0 px-4 py-2 rounded-full shadow-md text-sm font-semibold"
                style={{ background: "white", color: "#1F2937" }}
              >
                🍓 Fresh Daily
              </div>
              <div
                className="absolute bottom-8 left-0 px-4 py-2 rounded-full shadow-md text-sm font-semibold"
                style={{ background: "white", color: "#1F2937" }}
              >
                🎀 Custom Orders
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS SECTION ── */}
      <section style={{ background: "#FFF5F7" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="inline-block text-sm font-semibold tracking-widest uppercase mb-3 px-4 py-1 rounded-full"
              style={{ background: "#FCE7F3", color: "#EC4899" }}
            >
              Our Menu
            </span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#1F2937" }}>
              Customer Favourites
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: "#6B7280" }}>
              Handpicked treats our customers keep coming back for — made fresh every morning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
                style={{ border: "1px solid #E5E7EB" }}
              >
                <div
                  className="h-44 flex items-center justify-center relative"
                  style={{ background: "#FCE7F3" }}
                >
                  <span className="text-7xl">{product.emoji}</span>
                  <span
                    className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white"
                    style={{ background: "#EC4899" }}
                  >
                    {product.badge}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs font-medium mb-1" style={{ color: "#EC4899" }}>
                    {product.category}
                  </span>
                  <h3 className="font-bold text-base mb-2" style={{ color: "#1F2937" }}>
                    {product.name}
                  </h3>
                  <p className="text-sm mb-4 flex-1" style={{ color: "#6B7280" }}>
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold" style={{ color: "#1F2937" }}>
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      className="px-4 py-2 rounded-full text-white text-sm font-semibold transition-opacity hover:opacity-90"
                      style={{ background: "#EC4899" }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              className="px-10 py-4 rounded-full font-semibold border-2 transition-all hover:bg-pink-50"
              style={{ borderColor: "#EC4899", color: "#EC4899" }}
            >
              View Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div
                className="w-72 h-72 rounded-3xl flex items-center justify-center"
                style={{ background: "#FCE7F3" }}
              >
                <span className="text-8xl">👩‍🍳</span>
              </div>
              <div
                className="absolute -bottom-6 -right-6 px-6 py-4 rounded-2xl shadow-lg"
                style={{ background: "white", border: "1px solid #E5E7EB" }}
              >
                <p className="text-2xl font-bold" style={{ color: "#EC4899" }}>5+ Years</p>
                <p className="text-sm" style={{ color: "#6B7280" }}>Baking with love</p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <span
              className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 px-4 py-1 rounded-full"
              style={{ background: "#FCE7F3", color: "#EC4899" }}
            >
              Our Story
            </span>
            <h2 className="text-4xl font-bold mb-6" style={{ color: "#1F2937" }}>
              Baked With Passion,{" "}
              <span style={{ color: "#EC4899" }}>Served With Love</span>
            </h2>
            <p className="text-base mb-4" style={{ color: "#6B7280", lineHeight: "1.8" }}>
              Delight Treats started as a small home kitchen dream — a love for baking turned into a passion for bringing joy to every table. Every recipe we make is crafted from scratch using only the finest ingredients.
            </p>
            <p className="text-base mb-8" style={{ color: "#6B7280", lineHeight: "1.8" }}>
              Whether it&apos;s a birthday cake, a wedding order, or just a sweet treat for yourself, we pour our heart into every bite. Our mission is simple: make your day a little sweeter.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🌿", label: "Natural Ingredients" },
                { icon: "❤️", label: "Made With Love" },
                { icon: "🎂", label: "Custom Orders" },
                { icon: "🚀", label: "Fast Delivery" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: "#FCE7F3" }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium" style={{ color: "#1F2937" }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16 px-6 text-center" style={{ background: "#EC4899" }}>
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Order Something Sweet?
        </h2>
        <p className="text-white opacity-90 mb-8 max-w-md mx-auto">
          Browse our full menu and place your custom order today.
        </p>
        <button
          className="px-10 py-4 rounded-full font-semibold text-base transition-all hover:opacity-90"
          style={{ background: "white", color: "#EC4899" }}
        >
          Shop Now
        </button>
      </section>

    </main>
  );
}