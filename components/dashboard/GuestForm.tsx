"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export type Guest = {
  id: number;
  name: string;
  count: number;
  dietary: string;
};

export default function GuestForm({ onAdd }: { onAdd: (g: Guest) => void }) {
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [dietary, setDietary] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inputStyle = (field: string) => ({
    border: `1px solid ${errors[field] ? "#EF4444" : "#E5E7EB"}`,
    borderRadius: "10px",
    padding: "9px 13px",
    width: "100%",
    fontSize: "13px",
    outline: "none",
    color: "#1F2937",
    background: "white",
  });

  const handleAdd = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Group name is required";
    if (!count || Number(count) <= 0) e.count = "Enter a valid guest count";
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    onAdd({ id: Date.now(), name, count: Number(count), dietary });
    setName(""); setCount(""); setDietary(""); setErrors({});
  };

  return (
    <div className="rounded-2xl p-4 mt-4" style={{ background: "#FFF5F7", border: "1px solid #FCE7F3" }}>
      <p className="text-sm font-semibold mb-3" style={{ color: "#1F2937" }}>
        Add Guest Group
      </p>
      <div className="flex flex-col gap-2">
        <div>
          <input style={inputStyle("name")} placeholder="Group name (e.g. Adults) *" value={name} onChange={e => setName(e.target.value)} />
          {errors.name && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs mt-1" style={{ color: "#EF4444" }}>
              {errors.name}
            </motion.p>
          )}
        </div>
        <div>
          <input type="number" min={1} style={inputStyle("count")} placeholder="Guest count *" value={count} onChange={e => setCount(e.target.value)} />
          {errors.count && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs mt-1" style={{ color: "#EF4444" }}>
              {errors.count}
            </motion.p>
          )}
        </div>
        <input style={inputStyle("")} placeholder="Dietary notes (optional)" value={dietary} onChange={e => setDietary(e.target.value)} />
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 6px 18px rgba(236,72,153,0.3)" }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAdd}
          className="w-full py-2.5 rounded-full text-white text-sm font-semibold flex items-center justify-center gap-2 mt-1"
          style={{ background: "#EC4899" }}
        >
          <Plus size={15} /> Add Group
        </motion.button>
      </div>
    </div>
  );
}