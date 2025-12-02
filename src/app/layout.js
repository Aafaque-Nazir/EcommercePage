import { Outfit } from "next/font/google";
import "../app/globals.css";
import Providers from "./Providers";
import Navbar from "../components/Navbar";
import MobileBottomNav from "../components/MobileBottomNav";
import Footer from "../components/Footer";
import { Toaster } from "sonner";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

export const metadata = {
    title: "ShopEase - Premium E-commerce Store",
    description: "Discover premium products at ShopEase - Your one-stop shop for quality and style",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={outfit.variable} suppressHydrationWarning>
            <body className="bg-background text-foreground font-sans antialiased selection:bg-green-500/30">
                <Providers>
                    <Navbar />
                    <main className="min-h-screen pb-16 md:pb-0">
                        {children}
                    </main>
                    <Footer />
                    <MobileBottomNav />
                    <Toaster position="top-center" richColors />
                </Providers>
            </body>
        </html>
    );
}
