"use client";

import { LayoutDashboard, ShoppingBag, Users, FileText, Settings, LogOut, TrendingUp, DollarSign, Package, Menu, X, ChevronRight } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Data ---
export const adminNavItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Customers", href: "/admin/users", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: TrendingUp },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

// --- Components ---

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Trigger */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white/80 dark:bg-black/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all text-gray-900 dark:text-gray-100"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:fixed lg:flex lg:flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-8 border-b border-gray-100 dark:border-gray-800/50 flex justify-between items-center">
          <div>
             <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
               ShopEase
             </h1>
             <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">ADMINISTRATOR</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden
                ${isActive 
                  ? "bg-green-600/10 text-green-600 dark:text-green-400 font-semibold shadow-sm" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                }`}
            >
              <div className="flex items-center gap-3 relative z-10">
                <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-green-600 dark:text-green-400" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"}`} />
                {item.name}
              </div>
              {isActive && (
                <motion.div
                   layoutId="activePill"
                   className="w-1.5 h-1.5 rounded-full bg-green-500"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-gray-100 dark:border-gray-800/50">
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-4 py-3.5 w-full rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-sm font-medium border border-transparent hover:border-red-100 dark:hover:border-red-900/20"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </aside>
    </>
  );
}

export function StatCard({ title, value, change, trend, icon: Icon, color }) {
  const isUp = trend === "up";
  
  const colorStyles = {
    green: "bg-green-500/10 text-green-600 dark:text-green-400",
    blue: "bg-green-500/10 text-green-600 dark:text-green-400",
    purple: "bg-green-500/10 text-green-600 dark:text-green-400",
    orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  };

  return (
    <div className="bg-white dark:bg-[#111] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg hover:border-green-500/20 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform origin-left">{value}</h3>
        </div>
        <div className={`p-3.5 rounded-xl ${colorStyles[color]} group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isUp ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
          {change}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">vs last month</span>
      </div>
    </div>
  );
}
