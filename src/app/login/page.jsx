"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { AlertCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginPage() {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      {/* Animated Floating Card */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md mx-auto"
      >
        <Card className="overflow-hidden shadow-2xl rounded-3xl border border-gray-100">
          <CardContent className="p-8 relative">
            {/* Decorative Background Blob */}
            <div
              className="absolute inset-0 -z-10 opacity-10"
              style={{
                background: `radial-gradient(circle at 30% 20%, #3b82f6, transparent 40%), 
                             radial-gradient(circle at 70% 80%, #8b5cf6, transparent 40%)`,
              }}
            />

            {/* Logo or Brand Icon */}
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 p-3"
              >
                <Mail className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            {/* Header */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-extrabold text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            >
              Welcome Back
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-gray-500 mt-2 text-sm"
            >
              Sign in to continue to your dashboard
            </motion.p>

            {/* Sign In Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full flex items-center justify-center gap-3 py-6 text-lg font-medium shadow-md hover:shadow-lg transition-shadow duration-300 border-gray-200 hover:border-gray-300 text-gray-700"
              >
                <FcGoogle className="text-2xl" />
                Sign in with Google
              </Button>
            </motion.div>

            {/* Optional: Info Alert */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 flex items-center justify-center text-xs text-gray-400 gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              Secure authentication via Google
            </motion.div>
          </CardContent>
        </Card>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-gray-400 text-xs mt-6"
        >
          Powered by NextAuth & Next.js
        </motion.p>
      </motion.div>
    </div>
  );
}