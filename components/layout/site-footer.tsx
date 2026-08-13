import Link from "next/link";
import { AtSign, Share2, MapPin, Phone, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-accent bg-primary-light/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-primary">Delight Treats</h2>
            <p className="mt-3 max-w-xs text-sm text-text-muted">
              Handmade cakes, pastries, and breads, baked fresh and made to order in the
              heart of your neighborhood.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                aria-label="Delight Treats on Instagram"
                className="rounded-full border border-accent p-2 text-text-muted transition-colors hover:border-primary hover:text-primary"
              >
                <AtSign className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Delight Treats on Facebook"
                className="rounded-full border border-accent p-2 text-text-muted transition-colors hover:border-primary hover:text-primary"
              >
                <Share2 className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text">Shop</h3>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              <li><Link href="/products" className="hover:text-primary">All Products</Link></li>
              <li><Link href="/products?category=cakes" className="hover:text-primary">Cakes</Link></li>
              <li><Link href="/products?category=cupcakes" className="hover:text-primary">Cupcakes</Link></li>
              <li><Link href="/products?category=pastries" className="hover:text-primary">Pastries</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/dashboard/events" className="hover:text-primary">Event Catering</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary">My Account</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text">Visit Us</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-text-muted">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>142 Baker Street, Riverside</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>(555) 019-2837</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>hello@delighttreats.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-accent pt-6 text-center text-xs text-text-muted">
          © {new Date().getFullYear()} Delight Treats. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
