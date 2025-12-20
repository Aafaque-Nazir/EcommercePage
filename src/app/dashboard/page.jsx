"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, User, Package, Heart, ShoppingCart, Settings, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0a0a0a]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-400">
            You are not logged in.
          </p>
          <Link href="/login">
            <button className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors">
              Sign In
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const quickLinks = [
    {
      icon: Package,
      label: "My Orders",
      href: "/orders",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Heart,
      label: "Wishlist",
      href: "/wishlist",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: ShoppingCart,
      label: "Shopping Cart",
      href: "/cart",
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8 px-4 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111] rounded-2xl border border-gray-800 p-6 md:p-8 mb-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={session.user.image || "https://ui-avatars.com/api/?name=" + encodeURIComponent(session.user.name)}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-green-500/30 shadow-lg shadow-green-500/20"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[#111]" />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-black text-white mb-1 font-heading italic uppercase tracking-tight">
                {session.user.name}
              </h1>
              <p className="text-gray-400 mb-3">{session.user.email}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-500 text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Active Account
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h2 className="text-xl font-black text-white mb-4 font-heading italic uppercase tracking-tight">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Link href={link.href}>
                  <div className="bg-[#111] hover:bg-[#1a1a1a] border border-gray-800 hover:border-gray-700 rounded-xl p-6 transition-all group cursor-pointer">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <link.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{link.label}</h3>
                    <div className="flex items-center text-gray-400 text-sm group-hover:text-green-500 transition-colors">
                      View <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#111] rounded-2xl border border-gray-800 p-6"
        >
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2 font-heading italic uppercase tracking-tight">
            <Settings className="w-5 h-5 text-green-500" />
            Account Information
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-800">
              <span className="text-gray-400">Full Name</span>
              <span className="text-white font-medium">{session.user.name}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-800">
              <span className="text-gray-400">Email Address</span>
              <span className="text-white font-medium">{session.user.email}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-400">Account Type</span>
              <span className="text-green-500 font-medium">Premium</span>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-gray-500 text-sm mt-6"
        >
          Secured with NextAuth & Encrypted Session
        </motion.p>
      </div>
    </div>
  );
}