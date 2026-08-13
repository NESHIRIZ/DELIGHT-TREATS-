"use client";
import { motion } from "framer-motion";

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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut" as const } 
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white font-sans overflow-x-hidden">

      {/* ── HERO SECTION ── */}
      <section className="relative bg-white overflow-hidden">
        {/* Animated blobs */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "#FCE7F3", transform: "translate(30%, -30%)" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "#FCE7F3", transform: "translate(-30%, 30%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12">
          {/* Text */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 px-4 py-1 rounded-full"
              style={{ background: "#FCE7F3", color: "#EC4899" }}
            >
              Freshly Baked Daily
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl font-bold leading-tight mb-6"
              style={{ color: "#1F2937" }}
            >
              Every Bite Is{" "}
              <span style={{ color: "#EC4899" }}>A Delight</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg mb-8 max-w-md mx-auto md:mx-0"
              style={{ color: "#6B7280" }}
            >
              Order custom cakes, pastries, and treats made fresh for you — tailored to your taste, delivered with love.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(236,72,153,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full text-white font-semibold text-base"
                style={{ background: "#EC4899" }}
              >
                Order Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, background: "#FCE7F3" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full font-semibold text-base border-2"
                style={{ borderColor: "#EC4899", color: "#EC4899" }}
              >
                Browse Menu
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex gap-8 mt-10 justify-center md:justify-start"
            >
              {[
                { value: "500+", label: "Happy Customers" },
                { value: "50+", label: "Menu Items" },
                { value: "100%", label: "Made Fresh" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold" style={{ color: "#EC4899" }}>{stat.value}</p>
                  <p className="text-xs" style={{ color: "#6B7280" }}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <div className="relative">
              <motion.div
                className="w-80 h-80 rounded-full flex items-center justify-center"
                style={{ background: "#FCE7F3" }}
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.span
                  className="text-9xl select-none"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  🎂
                </motion.span>
              </motion.div>

              <motion.div
                className="absolute top-4 right-0 px-4 py-2 rounded-full shadow-md text-sm font-semibold"
                style={{ background: "white", color: "#1F2937" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                🍓 Fresh Daily
              </motion.div>

              <motion.div
                className="absolute bottom-8 left-0 px-4 py-2 rounded-full shadow-md text-sm font-semibold"
                style={{ background: "white", color: "#1F2937" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                🎀 Custom Orders
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section style={{ background: "#FFF5F7" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-sm font-semibold tracking-widest uppercase mb-3 px-4 py-1 rounded-full"
              style={{ background: "#FCE7F3", color: "#EC4899" }}
            >
              Our Menu
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4" style={{ color: "#1F2937" }}>
              Customer Favourites
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base max-w-md mx-auto" style={{ color: "#6B7280" }}>
              Handpicked treats our customers keep coming back for — made fresh every morning.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={cardVariant}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(236,72,153,0.15)" }}
                className="bg-white rounded-2xl overflow-hidden flex flex-col cursor-pointer"
                style={{ border: "1px solid #E5E7EB" }}
              >
                <div className="h-44 flex items-center justify-center relative" style={{ background: "#FCE7F3" }}>
                  <motion.span
                    className="text-7xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {product.emoji}
                  </motion.span>
                  <span
                    className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white"
                    style={{ background: "#EC4899" }}
                  >
                    {product.badge}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs font-medium mb-1" style={{ color: "#EC4899" }}>{product.category}</span>
                  <h3 className="font-bold text-base mb-2" style={{ color: "#1F2937" }}>{product.name}</h3>
                  <p className="text-sm mb-4 flex-1" style={{ color: "#6B7280" }}>{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold" style={{ color: "#1F2937" }}>${product.price.toFixed(2)}</span>
                    <motion.button
                      whileHover={{ scale: 1.08, boxShadow: "0 4px 15px rgba(236,72,153,0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-full text-white text-sm font-semibold"
                      style={{ background: "#EC4899" }}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, background: "#FCE7F3" }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 rounded-full font-semibold border-2"
              style={{ borderColor: "#EC4899", color: "#EC4899" }}
            >
              View Full Menu
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative">
              <motion.div
                className="w-72 h-72 rounded-3xl flex items-center justify-center"
                style={{ background: "#FCE7F3" }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.span
                  className="text-8xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  👩‍🍳
                </motion.span>
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -right-6 px-6 py-4 rounded-2xl shadow-lg"
                style={{ background: "white", border: "1px solid #E5E7EB" }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <p className="text-2xl font-bold" style={{ color: "#EC4899" }}>5+ Years</p>
                <p className="text-sm" style={{ color: "#6B7280" }}>Baking with love</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 px-4 py-1 rounded-full"
              style={{ background: "#FCE7F3", color: "#EC4899" }}
            >
              Our Story
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-6" style={{ color: "#1F2937" }}>
              Baked With Passion,{" "}
              <span style={{ color: "#EC4899" }}>Served With Love</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base mb-4" style={{ color: "#6B7280", lineHeight: "1.8" }}>
              Delight Treats started as a small home kitchen dream — a love for baking turned into a passion for bringing joy to every table. Every recipe we make is crafted from scratch using only the finest ingredients.
            </motion.p>
            <motion.p variants={fadeUp} className="text-base mb-8" style={{ color: "#6B7280", lineHeight: "1.8" }}>
              Whether it&apos;s a birthday cake, a wedding order, or just a sweet treat for yourself, we pour our heart into every bite. Our mission is simple: make your day a little sweeter.
            </motion.p>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              {[
                { icon: "🌿", label: "Natural Ingredients" },
                { icon: "❤️", label: "Made With Love" },
                { icon: "🎂", label: "Custom Orders" },
                { icon: "🚀", label: "Fast Delivery" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: "#FCE7F3" }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium" style={{ color: "#1F2937" }}>{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <motion.section
        className="py-16 px-6 text-center"
        style={{ background: "#EC4899" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Ready to Order Something Sweet?
        </motion.h2>
        <motion.p
          className="text-white opacity-90 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Browse our full menu and place your custom order today.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="px-10 py-4 rounded-full font-semibold text-base"
          style={{ background: "white", color: "#EC4899" }}
        >
          Shop Now
        </motion.button>
      </motion.section>

    </main>
  );
}