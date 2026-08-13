import { Heart, Wheat, Users } from "lucide-react";

export const metadata = { title: "About | Delight Treats" };

const values = [
  {
    icon: Wheat,
    title: "Baked from Scratch",
    description:
      "No mixes, no shortcuts. Every cake, pastry, and loaf starts with real butter, flour, and time.",
  },
  {
    icon: Heart,
    title: "Made for the Moment",
    description:
      "Birthdays, weddings, Tuesday afternoons — we bake for whatever you're celebrating, big or small.",
  },
  {
    icon: Users,
    title: "Rooted in the Neighborhood",
    description:
      "We've been part of this community for years, and we bake like it — for neighbors, not strangers.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-display text-4xl font-semibold text-text">Our Story</h1>
        <p className="mx-auto mt-4 max-w-xl text-text-muted">
          Delight Treats started as a single home oven and a habit of bringing cake to
          every gathering. Today, we&apos;re a full bakery — but the goal hasn&apos;t
          changed: bake the thing people will remember.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <div key={value.title} className="flex flex-col items-center gap-3 text-center">
              <div className="rounded-full bg-primary-light p-3.5 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="font-display text-lg font-semibold text-text">{value.title}</h2>
              <p className="text-sm text-text-muted">{value.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-16 rounded-3xl bg-primary-light/40 px-8 py-10 text-center">
        <p className="font-display text-xl italic text-text">
          &ldquo;Good bread and good cake come from the same place: paying attention.&rdquo;
        </p>
        <p className="mt-3 text-sm text-text-muted">— The Delight Treats kitchen</p>
      </div>
    </div>
  );
}
