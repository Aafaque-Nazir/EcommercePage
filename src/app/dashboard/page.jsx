"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, User, ShieldCheck, Star } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

export default function Dashboard() {
  const { data: session } = useSession();
  const scopeRef = useRef(null);
  const isInView = useInView(scopeRef, { once: true });

  // ✅ Show confetti only once per session
  const [showConfetti, setShowConfetti] = useState(true);

  // Stop confetti after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // Hide after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!session)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold text-gray-300"
        >
          You are not logged in.
        </motion.p>
      </div>
    );

  return (
    <>
      {/* ✅ Confetti: Only shows once on login */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
          gravity={0.3}
          style={{ position: "fixed", zIndex: 50 }}
          onConfettiComplete={(confetti) => {
            setShowConfetti(false); // Stop after animation
          }}
        />
      )}

      {/* Your Dashboard UI */}
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900 p-4 relative overflow-hidden">
        {/* Background Orbs */}
        <div
          className="absolute w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.8), transparent 70%)",
            top: "-10%",
            left: "10%",
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.8), transparent 70%)",
            bottom: "-10%",
            right: "10%",
          }}
        />

        {/* Dashboard Card */}
        <motion.div
          ref={scopeRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-10 text-center relative">
              {/* Decorative Icons */}
              <div className="absolute top-6 left-6">
                <User className="w-5 h-5 text-indigo-300/60" />
              </div>
              <div className="absolute top-6 right-6">
                <ShieldCheck className="w-5 h-5 text-emerald-300/60" />
              </div>

              {/* Profile Image */}
              <motion.div
                animate={{
                  y: [-5, 5],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
                className="inline-block"
              >
                <img
                  src={session.user.image || "https://placehold.co/150/6366f1/ffffff?text=User"}
                  alt="Profile"
                  width={120}
                  height={120}
                  className="w-32 h-32 rounded-full border-4 border-transparent shadow-2xl object-cover"
                  style={{
                    borderImage: "linear-gradient(45deg, #818cf8, #f472b6) 1",
                    borderImageSlice: 1,
                  }}
                />
              </motion.div>

              {/* Welcome Text */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 text-4xl font-extrabold bg-gradient-to-r from-white via-indigo-100 to-pink-100 bg-clip-text text-transparent"
              >
                Welcome, {session.user.name}
              </motion.h2>

              {/* Email */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-300 mt-3 text-lg"
              >
                {session.user.email}
              </motion.p>

              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex justify-center mt-4"
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 rounded-full text-xs font-medium text-indigo-200 backdrop-blur-sm">
                  <Star className="w-3 h-3 text-yellow-300" />
                  Premium User
                </span>
              </motion.div>

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                onClick={() => signOut({ callbackUrl: "/" })}
                className="mt-8 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </motion.button>
            </CardContent>
          </Card>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-gray-500 text-sm mt-6 text-center"
          >
            Secured with NextAuth & Encrypted Session
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}