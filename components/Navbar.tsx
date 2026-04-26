"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/order", label: "Place Order" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-yellow-400 shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900">🥚 Fresh Eggs Direct</span>

        {/* Desktop links */}
        <div className="hidden sm:flex gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-medium hover:text-gray-900 transition-colors ${
                pathname === href ? "text-gray-900 underline" : "text-gray-700"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Hamburger button */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-900 transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-900 transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-900 transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden bg-yellow-300 px-4 pb-4 flex flex-col gap-3">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`font-medium py-2 border-b border-yellow-400 hover:text-gray-900 transition-colors ${
                pathname === href ? "text-gray-900 underline" : "text-gray-700"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
