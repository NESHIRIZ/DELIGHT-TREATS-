"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50" style={{ borderBottom: "1px solid #E5E7EB" }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold" style={{ color: "#EC4899" }}>
          🎂 Delight Treats
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Custom Cakes", href: "/custom-cakes" },
            { label: "Events", href: "/events" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium relative transition-colors hover:text-pink-500 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-pink-400 after:transition-all after:duration-300 hover:after:w-full"
style={{ color: "#1F2937" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side — Cart + Auth */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium" style={{ color: "#1F2937" }}>
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-full text-white text-sm font-semibold"
            style={{ background: "#EC4899" }}
          >
            Register
          </Link>
          {/* Cart Icon */}
          <button className="relative p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#1F2937" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center"
              style={{ background: "#EC4899" }}
            >
              
            </span>
          </button>
        </div>

        {/* Hamburger — Mobile */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-gray-800 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-gray-800 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-gray-800 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4" style={{ borderTop: "1px solid #E5E7EB" }}>
          {[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Custom Cakes", href: "/custom-cakes" },
            { label: "Events", href: "/events" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium py-2"
              style={{ color: "#1F2937" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <Link href="/login" className="text-sm font-medium" style={{ color: "#1F2937" }}>Login</Link>
            <Link href="/register" className="px-4 py-2 rounded-full text-white text-sm font-semibold" style={{ background: "#EC4899" }}>Register</Link>
          </div>
        </div>
      )}
    </nav>
  );
}