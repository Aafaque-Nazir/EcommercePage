"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function ProtectedPage({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center">
        <div className="relative">
          {/* Spinning loader */}
          <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
          
          {/* Glow effect */}
          <div className="absolute inset-0 blur-xl bg-green-500/20 animate-pulse" />
        </div>
        
        <p className="mt-6 text-gray-400 font-medium animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
