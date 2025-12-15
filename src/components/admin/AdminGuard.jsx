"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, ShieldAlert, ArrowLeft } from "lucide-react";

const ADMIN_EMAIL = "aafaquenazir@gmail.com";

export default function AdminGuard({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/admin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="h-10 w-10 animate-spin text-green-500" />
      </div>
    );
  }

  // Not authenticated is handled by useEffect redirect, but render null/loader to prevent flash
  if (status === "unauthenticated") {
    return null;
  }

  // Authenticated but wrong email
  if (session?.user?.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-gray-100 dark:border-gray-800 transform transition-all hover:scale-[1.01]">
          <div className="mx-auto bg-red-100 dark:bg-red-900/20 h-20 w-20 rounded-full flex items-center justify-center mb-6 ring-4 ring-red-50 dark:ring-red-900/10">
            <ShieldAlert className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Access Denied</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            You do not have permission to view this area. <br/>
            Logged in as: <span className="font-semibold text-gray-700 dark:text-gray-300">{session?.user?.email}</span>
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3.5 rounded-xl font-medium hover:opacity-90 transition-all active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  // Authorized
  return <div className="dark">{children}</div>;
}
