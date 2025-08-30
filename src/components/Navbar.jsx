"use client";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCartCount } from "../redux/slices/cartSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  // Example cart count (later hook into Redux/cartSlice)
  const cartCount = useSelector(selectCartCount);

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-extrabold tracking-wide text-yellow-400">
          ShopEase
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium group"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full" />
            </a>
          ))}

          {/* Cart with Badge */}
          <a
            href="/cart"
            className="relative flex items-center hover:text-yellow-400 transition"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-gray-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="flex flex-col px-6 py-4 gap-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-yellow-400 transition text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </a>
            ))}
            {/* Cart in mobile menu */}
            <a
              href="/cart"
              className="flex items-center gap-2 hover:text-yellow-400 transition"
              onClick={() => setOpen(false)}
            >
              <ShoppingCart size={20} />
              Cart
              {cartCount > 0 && (
                <span className="ml-auto bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
