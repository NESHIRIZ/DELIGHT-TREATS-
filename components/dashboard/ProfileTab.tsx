"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut" as const } 
  },
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

type Profile = { name: string; email: string; phone: string; address: string };

export default function ProfileTab() {
  const [profile, setProfile] = useState<Profile>({
    name: "Emmanuel", email: "emmanuel@example.com",
    phone: "+234 801 234 5678", address: "Lagos, Nigeria",
  });
  const [errors, setErrors] = useState<Partial<Profile>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const validate = () => {
    const e: Partial<Profile> = {};
    if (!profile.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) e.email = "Valid email required";
    if (profile.phone.trim().length < 7) e.phone = "Valid phone number required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fields = [
    { key: "name", label: "Full Name", type: "text" },
    { key: "email", label: "Email Address", type: "email" },
    { key: "phone", label: "Phone Number", type: "tel" },
    { key: "address", label: "Address", type: "text" },
  ] as const;

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <motion.div
        variants={fadeUp}
        className="rounded-2xl p-8 max-w-lg"
        style={{ border: "1px solid #E5E7EB" }}
      >
        <h2 className="text-xl font-bold mb-6" style={{ color: "#1F2937" }}>
          Personal Information
        </h2>

        {fields.map(({ key, label, type }) => (
          <motion.div key={key} variants={fadeUp} className="mb-5">
            <label className="text-sm font-medium mb-1.5 block" style={{ color: "#374151" }}>
              {label}{key !== "address" ? " *" : ""}
            </label>
            <input
              type={type}
              value={profile[key]}
              onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
              className="w-full text-sm rounded-xl px-4 py-3 transition-all"
              style={{
                border: `1px solid ${errors[key] ? "#EF4444" : "#E5E7EB"}`,
                color: "#1F2937",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#EC4899")}
              onBlur={(e) => (e.target.style.borderColor = errors[key] ? "#EF4444" : "#E5E7EB")}
            />
            {errors[key] && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs mt-1"
                style={{ color: "#EF4444" }}
              >
                {errors[key]}
              </motion.p>
            )}
          </motion.div>
        ))}

        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(236,72,153,0.3)" }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          className="mt-2 px-8 py-3 rounded-full text-white font-semibold text-sm"
          style={{ background: saving ? "#F9A8D4" : "#EC4899", transition: "background 0.3s" }}
        >
          {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}