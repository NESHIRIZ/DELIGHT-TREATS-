import { BakeryEvent } from "@/types";

export const mockEvents: BakeryEvent[] = [
  {
    id: "e1",
    customerId: "u1",
    name: "Maya & Sam's Wedding",
    type: "wedding",
    status: "confirmed",
    date: "2026-09-14",
    guestCountEstimate: 120,
    requirements: "Three-tier cake, nut-free, plus a dessert table with mini pastries.",
    createdAt: "2026-06-01T10:00:00Z",
    guests: [
      { id: "g1", name: "Bride & Groom Table", count: 2, dietaryNotes: "Nut-free" },
      { id: "g2", name: "Family & Friends", count: 108 },
      { id: "g3", name: "Vendor Meals", count: 10, dietaryNotes: "2 vegetarian" },
    ],
  },
  {
    id: "e2",
    customerId: "u1",
    name: "Ben's 30th Birthday",
    type: "birthday",
    status: "planning",
    date: "2026-08-28",
    guestCountEstimate: 25,
    requirements: "Chocolate cake, casual dessert spread.",
    createdAt: "2026-07-15T16:20:00Z",
    guests: [{ id: "g4", name: "Guest List", count: 25 }],
  },
];
