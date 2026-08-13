import Link from "next/link";
import { Cake } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-12">
      <Link href="/" className="mb-8 flex items-center justify-center gap-2">
        <div className="rounded-full bg-primary-light p-2 text-primary">
          <Cake className="h-5 w-5" />
        </div>
        <span className="font-display text-xl font-semibold text-primary">Delight Treats</span>
      </Link>
      {children}
    </div>
  );
}
