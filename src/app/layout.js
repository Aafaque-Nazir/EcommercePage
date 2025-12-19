import { Outfit, Space_Grotesk, Inter } from "next/font/google";
import "../app/globals.css";
import Providers from "./Providers";
import ClientLayoutWrapper from "../components/ClientLayoutWrapper";
import { Toaster } from "sonner";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata = {
    title: "ShopEase - Premium E-commerce Store",
    description: "Discover premium products at ShopEase - Your one-stop shop for quality and style",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
            <body className="bg-background text-foreground font-sans antialiased selection:bg-green-500/30">
                <Providers>
                    <ClientLayoutWrapper>
                        {children}
                    </ClientLayoutWrapper>
                    <Toaster position="top-center" richColors />
                </Providers>
            </body>
        </html>
    );
}
