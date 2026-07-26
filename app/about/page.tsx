export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="py-20 px-6 text-center" style={{ background: "#FFF5F7" }}>
        <span
          className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 px-4 py-1 rounded-full"
          style={{ background: "#FCE7F3", color: "#EC4899" }}
        >
          Who We Are
        </span>
        <h1 className="text-5xl font-bold mb-6" style={{ color: "#1F2937" }}>
          About <span style={{ color: "#EC4899" }}>Delight Treats</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
          We are a passionate team of bakers dedicated to creating unforgettable treats for every occasion.
        </p>
      </section>

      {/* Story */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 flex justify-center">
            <div
              className="w-72 h-72 rounded-3xl flex items-center justify-center"
              style={{ background: "#FCE7F3" }}
            >
              <span className="text-8xl">👩‍🍳</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6" style={{ color: "#1F2937" }}>
              Our Story
            </h2>
            <p className="text-base mb-4" style={{ color: "#6B7280", lineHeight: "1.8" }}>
              Delight Treats was born from a simple love of baking. What started as weekend experiments in a small home kitchen quickly grew into something much bigger — a community of people who believe that good food brings people together.
            </p>
            <p className="text-base mb-4" style={{ color: "#6B7280", lineHeight: "1.8" }}>
              Over the past 5 years, we have served hundreds of happy customers across birthdays, weddings, corporate events, and everyday celebrations. Every item we bake is made from scratch using only the finest, freshest ingredients.
            </p>
            <p className="text-base" style={{ color: "#6B7280", lineHeight: "1.8" }}>
              Our mission is simple — to make your day a little sweeter, one bite at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6" style={{ background: "#FFF5F7" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold" style={{ color: "#1F2937" }}>
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🌿", title: "Natural Ingredients", desc: "We use only fresh, natural ingredients with no artificial preservatives." },
              { icon: "❤️", title: "Made With Love", desc: "Every product is handcrafted with care and attention to detail." },
              { icon: "🎂", title: "Custom Orders", desc: "We tailor every order to your exact taste and occasion." },
              { icon: "🚀", title: "Fast Delivery", desc: "Fresh treats delivered to your door quickly and reliably." },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 text-center shadow-sm"
                style={{ border: "1px solid #E5E7EB" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"
                  style={{ background: "#FCE7F3" }}
                >
                  {item.icon}
                </div>
                <h3 className="font-bold mb-2" style={{ color: "#1F2937" }}>{item.title}</h3>
                <p className="text-sm" style={{ color: "#6B7280" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center" style={{ background: "#EC4899" }}>
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Place an Order?</h2>
        <p className="text-white opacity-90 mb-8 max-w-md mx-auto">
          Browse our menu or get in touch to discuss a custom order.
        </p>
        <button
          className="px-10 py-4 rounded-full font-semibold text-base hover:opacity-90 transition-all"
          style={{ background: "white", color: "#EC4899" }}
        >
          Contact Us
        </button>
      </section>

    </main>
  );
}