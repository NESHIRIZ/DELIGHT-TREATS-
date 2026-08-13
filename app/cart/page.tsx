"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";

type CartItem = {
  id: number;
  name: string;
  category: string;
  emoji: string;
  price: number;
  quantity: number;
  customization: string;
};

const initialItems: CartItem[] = [
  {
    id: 1,
    name: "Strawberry Dream Cake",
    category: "Cakes",
    emoji: "🍓",
    price: 45.99,
    quantity: 1,
    customization: "Size: Large, Flavor: Vanilla",
  },
  {
    id: 2,
    name: "Chocolate Truffle Box",
    category: "Chocolates",
    emoji: "🍫",
    price: 28.50,
    quantity: 2,
    customization: "Box of 12",
  },
  {
    id: 3,
    name: "Cinnamon Swirl Buns",
    category: "Pastries",
    emoji: "🌀",
    price: 18.00,
    quantity: 1,
    customization: "Pack of 6",
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
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 5.99;
  const total = subtotal + delivery;

  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="py-12 px-6 text-center" style={{ background: "#FFF5F7" }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 px-4 py-1 rounded-full"
            style={{ background: "#FCE7F3", color: "#EC4899" }}
          >
            Your Order
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold"
            style={{ color: "#1F2937" }}
          >
            Shopping <span style={{ color: "#EC4899" }}>Cart</span>
          </motion.h1>
        </motion.div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Empty Cart */}
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-8xl mb-6"
              >
                🛒
              </motion.div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#1F2937" }}>
                Your cart is empty
              </h2>
              <p className="mb-8" style={{ color: "#6B7280" }}>
                Looks like you haven&apos;t added anything yet.
              </p>
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(236,72,153,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-full text-white font-semibold"
                  style={{ background: "#EC4899" }}
                >
                  Browse Products
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-10">

              {/* Cart Items */}
              <motion.div
                className="flex-1"
                initial="hidden"
                animate="visible"
                variants={stagger}
              >
                <h2 className="text-xl font-bold mb-6" style={{ color: "#1F2937" }}>
                  {items.length} {items.length === 1 ? "Item" : "Items"} in your cart
                </h2>

                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={fadeUp}
                      exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                      layout
                      className="flex items-start gap-4 mb-4 p-4 rounded-2xl"
                      style={{ border: "1px solid #E5E7EB", background: "white" }}
                      whileHover={{ boxShadow: "0 4px 20px rgba(236,72,153,0.1)" }}
                    >
                      {/* Product Image */}
                      <div
                        className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl flex-shrink-0"
                        style={{ background: "#FCE7F3" }}
                      >
                        {item.emoji}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <span className="text-xs font-medium" style={{ color: "#EC4899" }}>
                          {item.category}
                        </span>
                        <h3 className="font-bold text-base mb-1" style={{ color: "#1F2937" }}>
                          {item.name}
                        </h3>
                        <p className="text-xs mb-3" style={{ color: "#6B7280" }}>
                          {item.customization}
                        </p>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div
                            className="flex items-center gap-3 rounded-full px-3 py-1"
                            style={{ border: "1px solid #E5E7EB" }}
                          >
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ background: item.quantity === 1 ? "#F3F4F6" : "#FCE7F3" }}
                            >
                              <Minus size={12} color={item.quantity === 1 ? "#9CA3AF" : "#EC4899"} />
                            </motion.button>
                            <span className="text-sm font-bold w-4 text-center" style={{ color: "#1F2937" }}>
                              {item.quantity}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ background: "#FCE7F3" }}
                            >
                              <Plus size={12} color="#EC4899" />
                            </motion.button>
                          </div>

                          {/* Price + Remove */}
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-base" style={{ color: "#1F2937" }}>
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1, color: "#EF4444" }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 size={18} color="#9CA3AF" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Continue Shopping */}
                <Link href="/products">
                  <motion.button
                    whileHover={{ x: -4 }}
                    className="text-sm font-medium mt-4 flex items-center gap-2"
                    style={{ color: "#EC4899" }}
                  >
                    ← Continue Shopping
                  </motion.button>
                </Link>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                className="lg:w-80"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div
                  className="rounded-2xl p-6 sticky top-24"
                  style={{ background: "#FFF5F7", border: "1px solid #E5E7EB" }}
                >
                  <h2 className="text-xl font-bold mb-6" style={{ color: "#1F2937" }}>
                    Order Summary
                  </h2>

                  <div className="flex flex-col gap-3 mb-6">
                    <div className="flex justify-between text-sm" style={{ color: "#6B7280" }}>
                      <span>Subtotal ({items.length} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm" style={{ color: "#6B7280" }}>
                      <span>Delivery Fee</span>
                      <span>${delivery.toFixed(2)}</span>
                    </div>
                    <div
                      className="flex justify-between font-bold text-base pt-3 mt-1"
                      style={{ borderTop: "1px solid #E5E7EB", color: "#1F2937" }}
                    >
                      <span>Total</span>
                      <span style={{ color: "#EC4899" }}>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(236,72,153,0.4)" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 rounded-full text-white font-semibold text-base flex items-center justify-center gap-2"
                    style={{ background: "#EC4899" }}
                  >
                    <ShoppingBag size={18} />
                    Proceed to Checkout
                  </motion.button>

                  <p className="text-xs text-center mt-4" style={{ color: "#9CA3AF" }}>
                    Secure checkout. Free returns on all orders.
                  </p>
                </div>
              </motion.div>

            </div>
          )}
        </div>
      </section>

    </main>
  );
}