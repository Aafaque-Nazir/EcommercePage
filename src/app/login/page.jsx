"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { ShieldCheck, Lock, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const features = [
    {
      icon: ShieldCheck,
      title: "Secure Authentication",
      description: "Your data is protected with industry-standard encryption",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "We never share your personal information",
    },
    {
      icon: Zap,
      title: "Quick Access",
      description: "One-click sign in with your Google account",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Main Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111] rounded-2xl border border-gray-800 p-8 mb-6"
        >
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Sign in to access your account and continue shopping
          </p>

          {/* Google Sign In Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl transition-colors shadow-lg"
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </motion.button>

          {/* Divider */}
          <div className="mt-6 mb-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-xs text-gray-500">SECURE LOGIN</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* Security Note */}
          <div className="flex items-start gap-2 p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-green-400 font-medium">Secure Authentication</p>
              <p className="text-xs text-gray-400 mt-1">
                Your login is protected with Google OAuth 2.0
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 gap-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-3 p-4 bg-[#111] border border-gray-800 rounded-xl"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm">{feature.title}</h3>
                <p className="text-gray-400 text-xs">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-500 text-xs mt-6"
        >
          By signing in, you agree to our{" "}
          <span className="text-green-500 hover:underline cursor-pointer">Terms of Service</span>
          {" "}and{" "}
          <span className="text-green-500 hover:underline cursor-pointer">Privacy Policy</span>
        </motion.p>
      </div>
    </div>
  );
}