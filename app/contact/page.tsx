export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="py-20 px-6 text-center" style={{ background: "#FFF5F7" }}>
        <span
          className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 px-4 py-1 rounded-full"
          style={{ background: "#FCE7F3", color: "#EC4899" }}
        >
          Get In Touch
        </span>
        <h1 className="text-5xl font-bold mb-6" style={{ color: "#1F2937" }}>
          Contact <span style={{ color: "#EC4899" }}>Us</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
          Have a question or want to place a custom order? We would love to hear from you.
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">

          {/* Contact Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-8" style={{ color: "#1F2937" }}>
              Our Details
            </h2>
            <div className="flex flex-col gap-6">
              {[
                { icon: "📍", label: "Address", value: "123 Bakery Lane, Sweet City" },
                { icon: "📞", label: "Phone", value: "+1 (555) 123-4567" },
                { icon: "✉️", label: "Email", value: "hello@delighttreats.com" },
                { icon: "🕐", label: "Hours", value: "Monday – Saturday: 8am – 7pm" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: "#FCE7F3" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#1F2937" }}>
                      {item.label}
                    </p>
                    <p className="text-sm" style={{ color: "#6B7280" }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="flex-1 rounded-2xl p-8"
            style={{ background: "#FFF5F7", border: "1px solid #E5E7EB" }}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#1F2937" }}>
              Send Us a Message
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: "#1F2937" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    border: "1px solid #E5E7EB",
                    background: "white",
                    color: "#1F2937",
                  }}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: "#1F2937" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    border: "1px solid #E5E7EB",
                    background: "white",
                    color: "#1F2937",
                  }}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: "#1F2937" }}>
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What is this about?"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    border: "1px solid #E5E7EB",
                    background: "white",
                    color: "#1F2937",
                  }}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: "#1F2937" }}>
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                  style={{
                    border: "1px solid #E5E7EB",
                    background: "white",
                    color: "#1F2937",
                  }}
                />
              </div>

              <button
                className="w-full py-4 rounded-full text-white font-semibold text-base transition-all hover:opacity-90"
                style={{ background: "#EC4899" }}
              >
                Send Message
              </button>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}