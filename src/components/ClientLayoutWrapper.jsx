"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className={`min-h-screen ${!isAdmin ? "pb-16 md:pb-0" : ""}`}>
        {children}
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <MobileBottomNav />}
    </>
  );
}
