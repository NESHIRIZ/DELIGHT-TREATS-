"use client";
import { motion } from "framer-motion";
import StatusBadge from "@/components/ui/StatusBadge";

type Order = {
  id: string;
  date: string;
  items: string;
  total: number;
  status: "Delivered" | "Processing" | "Pending";
};

const mockOrders: Order[] = [
  { id: "#DT-001", date: "Aug 10, 2026", items: "Strawberry Dream Cake, Cinnamon Buns", total: 63.99, status: "Delivered" },
  { id: "#DT-002", date: "Aug 12, 2026", items: "Chocolate Truffle Box", total: 28.50, status: "Processing" },
  { id: "#DT-003", date: "Aug 13, 2026", items: "Vanilla Cupcakes (12)", total: 34.00, status: "Pending" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

export default function OrdersTab() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <h2 className="text-xl font-bold mb-6" style={{ color: "#1F2937" }}>
        Order History
      </h2>

      {mockOrders.length === 0 ? (
        <motion.div variants={fadeUp} className="text-center py-20">
          <div className="text-6xl mb-4">📦</div>
          <p className="font-semibold text-lg" style={{ color: "#1F2937" }}>No orders yet</p>
          <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
            Your orders will appear here once you place one.
          </p>
        </motion.div>
      ) : (
        mockOrders.map((order) => (
          <motion.div
            key={order.id}
            variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl mb-4"
            style={{ border: "1px solid #E5E7EB" }}
            whileHover={{ boxShadow: "0 4px 20px rgba(236,72,153,0.08)" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <span className="font-bold text-sm" style={{ color: "#EC4899" }}>
                  {order.id}
                </span>
                <StatusBadge status={order.status} />
              </div>
              <p className="text-sm font-medium" style={{ color: "#1F2937" }}>{order.items}</p>
              <p className="text-xs mt-1" style={{ color: "#6B7280" }}>{order.date}</p>
            </div>
            <span className="font-bold text-base" style={{ color: "#1F2937" }}>
              ${order.total.toFixed(2)}
            </span>
          </motion.div>
        ))
      )}
    </motion.div>
  );
}