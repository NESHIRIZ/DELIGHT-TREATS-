"use client";

import { useState } from "react";
import ProfileTab from "@/components/dashboard/ProfileTab";
import OrdersTab from "@/components/dashboard/OrdersTab";
import EventsTab from "@/components/dashboard/EventsTab";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "events">("profile");

  const tabClass = (tab: "profile" | "orders" | "events") =>
    `px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
      activeTab === tab
        ? "bg-pink-500 text-white"
        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
    }`;

  return (
    <main className="min-h-screen bg-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Customer Dashboard
        </h1>

        <nav
          aria-label="Dashboard navigation"
          className="flex gap-3 mb-8 flex-wrap"
        >
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={tabClass("profile")}
            aria-current={activeTab === "profile" ? "page" : undefined}
          >
            Profile
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={tabClass("orders")}
            aria-current={activeTab === "orders" ? "page" : undefined}
          >
            Orders
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("events")}
            className={tabClass("events")}
            aria-current={activeTab === "events" ? "page" : undefined}
          >
            Events
          </button>
        </nav>

        <section
          aria-live="polite"
          aria-labelledby="dashboard-content-heading"
        >
          <h2 id="dashboard-content-heading" className="sr-only">
            Dashboard content
          </h2>

          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "events" && <EventsTab />}
        </section>
      </div>
    </main>
  );
}