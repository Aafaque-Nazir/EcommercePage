"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, ShoppingCart, Heart } from "lucide-react";
import { useSelector } from "react-redux";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);
  const wishlistCount = wishlistItems.length;

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Shop",
      href: "/products",
      icon: ShoppingBag,
    },
    {
      name: "Cart",
      href: "/cart",
      icon: ShoppingCart,
      badge: cartCount,
    },
    {
      name: "Wishlist",
      href: "/wishlist",
      icon: Heart,
      badge: wishlistCount,
    },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-gray-800/50 z-50 md:hidden backdrop-blur-xl">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 to-transparent pointer-events-none" />
      
      <div className="grid grid-cols-4 h-16 relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 relative group"
            >
              {/* Active indicator line */}
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-b-full" />
              )}

              <div className="relative">
                <Icon 
                  className={`w-6 h-6 transition-all duration-300 ${
                    active
                      ? "text-green-500 scale-110"
                      : "text-gray-400 group-hover:text-gray-200 group-active:scale-95"
                  }`}
                />
                
                {/* Badge */}
                {item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-br from-green-500 to-green-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-lg shadow-green-500/50 border border-green-400/30">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </div>
              
              <span 
                className={`text-[10px] font-medium transition-colors duration-300 ${
                  active
                    ? "text-green-500"
                    : "text-gray-500 group-hover:text-gray-300"
                }`}
              >
                {item.name}
              </span>

              {/* Ripple effect on tap */}
              <div className="absolute inset-0 rounded-lg group-active:bg-green-500/10 transition-colors duration-150" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
