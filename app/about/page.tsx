"use client";
import { motion } from "framer-motion";

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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="py-20 px-6 text-center relative overflow-hidden" style={{ background: "#FFF5F7" }}>
        <motion.div
          className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "#FCE7F3", transform: "translate(30%, -30%)" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: "#FCE7F3", transform: "translate(-30%, 30%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 px-4 py-1 rounded-full"
            style={{ background: "#FCE7F3", color: "#EC4899" }}
          >
            Who We Are
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-5xl font-bold mb-6"
            style={{ color: "#1F2937" }}
          >
            About <span style={{ color: "#EC4899" }}>Delight Treats</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#6B7280" }}
          >
            We are a passionate team of bakers dedicated to creating unforgettable treats for every occasion.
          </motion.p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
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
          </motion.div>

          <motion.div
            className="flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-6" style={{ color: "#1F2937" }}>
              Our Story
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base mb-4" style={{ color: "#6B7280", lineHeight: "1.8" }}>
              Delight Treats was born from a simple love of baking. What started as weekend experiments in a small home kitchen quickly grew into something much bigger — a community of people who believe that good food brings people together.
            </motion.p>
            <motion.p variants={fadeUp} className="text-base mb-4" style={{ color: "#6B7280", lineHeight: "1.8" }}>
              Over the past 5 years, we have served hundreds of happy customers across birthdays, weddings, corporate events, and everyday celebrations. Every item we bake is made from scratch using only the finest, freshest ingredients.
            </motion.p>
            <motion.p variants={fadeUp} className="text-base" style={{ color: "#6B7280", lineHeight: "1.8" }}>
              Our mission is simple — to make your day a little sweeter, one bite at a time.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6" style={{ background: "#FFF5F7" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-bold" style={{ color: "#1F2937" }}>
              What We Stand For
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {[
              { icon: "🌿", title: "Natural Ingredients", desc: "We use only fresh, natural ingredients with no artificial preservatives." },
              { icon: "❤️", title: "Made With Love", desc: "Every product is handcrafted with care and attention to detail." },
              { icon: "🎂", title: "Custom Orders", desc: "We tailor every order to your exact taste and occasion." },
              { icon: "🚀", title: "Fast Delivery", desc: "Fresh treats delivered to your door quickly and reliably." },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(236,72,153,0.15)" }}
                className="bg-white rounded-2xl p-6 text-center"
                style={{ border: "1px solid #E5E7EB" }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"
                  style={{ background: "#FCE7F3" }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="font-bold mb-2" style={{ color: "#1F2937" }}>{item.title}</h3>
                <p className="text-sm" style={{ color: "#6B7280" }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
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
          transition={{ delay: 0.2 }}
        >
          Ready to Place an Order?
        </motion.h2>
        <motion.p
          className="text-white opacity-90 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Browse our menu or get in touch to discuss a custom order.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="px-10 py-4 rounded-full font-semibold text-base"
          style={{ background: "white", color: "#EC4899" }}
        >
          Contact Us
        </motion.button>
      </motion.section>

    </main>
  );
}