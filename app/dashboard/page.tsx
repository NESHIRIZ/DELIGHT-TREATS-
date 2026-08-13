"use client";

import { useState } from "react";
import ProfileTab from "@/components/dashboard/ProfileTab";
import OrdersTab from "@/components/dashboard/OrdersTab";
import EventsTab from "@/components/dashboard/EventsTab";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "events">("profile");

  return (
    <main className="min-h-screen bg-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>

        <div className="flex gap-3 mb-8">
          <button onClick={() => setActiveTab("profile")} className="px-4 py-2 rounded bg-pink-500 text-white">
            Profile
          </button>
          <button onClick={() => setActiveTab("orders")} className="px-4 py-2 rounded bg-gray-200">
            Orders
          </button>
          <button onClick={() => setActiveTab("events")} className="px-4 py-2 rounded bg-gray-200">
            Events
          </button>
        </div>

        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "orders" && <OrdersTab />}
        {activeTab === "events" && <EventsTab />}
      </div>
    </main>
  );
}