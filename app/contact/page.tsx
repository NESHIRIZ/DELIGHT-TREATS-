"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, User, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters.";
    if (!formData.email.trim()) newErrors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    else if (formData.subject.trim().length < 3) newErrors.subject = "Subject must be at least 3 characters.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactDetails = [
    { icon: <MapPin size={20} color="white" />, label: "Address", value: "123 Bakery Lane, Sweet City" },
    { icon: <Phone size={20} color="white" />, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: <Mail size={20} color="white" />, label: "Email", value: "hello@delighttreats.com" },
    { icon: <Clock size={20} color="white" />, label: "Hours", value: "Monday – Saturday: 8am – 7pm" },
  ];

  const inputStyle = (error?: string) => ({
    paddingLeft: "2.5rem",
    paddingRight: "1rem",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
    border: error ? "1.5px solid #EF4444" : "1px solid #E5E7EB",
    background: "white",
    color: "#1F2937",
    width: "100%",
    borderRadius: "0.75rem",
    fontSize: "0.875rem",
    outline: "none",
    transition: "all 0.2s",
  });

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, hasError?: string) => {
    if (!hasError) {
      e.target.style.border = "1.5px solid #EC4899";
      e.target.style.boxShadow = "0 0 0 3px rgba(236,72,153,0.1)";
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, hasError?: string) => {
    if (!hasError) {
      e.target.style.border = "1px solid #E5E7EB";
      e.target.style.boxShadow = "none";
    }
  };

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
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="relative"
        >
          <motion.span variants={fadeUp} className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 px-4 py-1 rounded-full" style={{ background: "#FCE7F3", color: "#EC4899" }}>
            Get In Touch
          </motion.span>
          <motion.h1 variants={fadeUp} className="text-5xl font-bold mb-6" style={{ color: "#1F2937" }}>
            Contact <span style={{ color: "#EC4899" }}>Us</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
            Have a question or want to place a custom order? We would love to hear from you.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">

          {/* Contact Info */}
          <motion.div className="flex-1" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold mb-8" style={{ color: "#1F2937" }}>
              Our Details
            </motion.h2>
            <div className="flex flex-col gap-6">
              {contactDetails.map((item) => (
                <motion.div key={item.label} variants={fadeUp} whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 300 }} className="flex items-start gap-4">
                  <motion.div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#EC4899" }} whileHover={{ scale: 1.15, rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                    {item.icon}
                  </motion.div>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#1F2937" }}>{item.label}</p>
                    <p className="text-sm" style={{ color: "#6B7280" }}>{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div className="flex-1 rounded-2xl p-8" style={{ background: "#FFF5F7", border: "1px solid #E5E7EB" }} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#1F2937" }}>Send Us a Message</h2>

            <AnimatePresence>
              {submitted && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-6 px-4 py-4 rounded-xl text-sm font-medium" style={{ background: "#D1FAE5", color: "#065F46", border: "1px solid #6EE7B7" }}>
                  ✅ Your message has been sent! We will get back to you shortly.
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-4">

              {/* Name */}
              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: "#1F2937" }}>
                  Full Name <span style={{ color: "#EC4899" }}>*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <User size={16} color="#9CA3AF" />
                  </div>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" style={inputStyle(errors.name)} onFocus={(e) => handleFocus(e, errors.name)} onBlur={(e) => handleBlur(e, errors.name)} />
                </div>
                <AnimatePresence>
                  {errors.name && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.name}</motion.p>}
                </AnimatePresence>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: "#1F2937" }}>
                  Email Address <span style={{ color: "#EC4899" }}>*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Mail size={16} color="#9CA3AF" />
                  </div>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle(errors.email)} onFocus={(e) => handleFocus(e, errors.email)} onBlur={(e) => handleBlur(e, errors.email)} />
                </div>
                <AnimatePresence>
                  {errors.email && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.email}</motion.p>}
                </AnimatePresence>
              </div>

              {/* Subject */}
              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: "#1F2937" }}>
                  Subject <span style={{ color: "#EC4899" }}>*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <MessageCircle size={16} color="#9CA3AF" />
                  </div>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is this about?" style={inputStyle(errors.subject)} onFocus={(e) => handleFocus(e, errors.subject)} onBlur={(e) => handleBlur(e, errors.subject)} />
                </div>
                <AnimatePresence>
                  {errors.subject && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.subject}</motion.p>}
                </AnimatePresence>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: "#1F2937" }}>
                  Message <span style={{ color: "#EC4899" }}>*</span>
                </label>
                <textarea rows={5} name="message" value={formData.message} onChange={handleChange} placeholder="Tell us how we can help..." className="resize-none" style={inputStyle(errors.message)} onFocus={(e) => handleFocus(e, errors.message)} onBlur={(e) => handleBlur(e, errors.message)} />
                <AnimatePresence>
                  {errors.message && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.message}</motion.p>}
                </AnimatePresence>
              </div>

              {/* Submit */}
              <motion.button onClick={handleSubmit} whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(236,72,153,0.4)" }} whileTap={{ scale: 0.97 }} disabled={loading} className="w-full py-4 rounded-full text-white font-semibold text-base" style={{ background: loading ? "#F9A8D4" : "#EC4899", cursor: loading ? "not-allowed" : "pointer" }}>
                {loading ? "Sending..." : "Send Message"}
              </motion.button>

            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}