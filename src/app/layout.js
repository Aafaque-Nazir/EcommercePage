import "../app/globals.css";
import Providers from "./Providers";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Shopster",
  description: "Modern ecommerce storefront",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Providers>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}