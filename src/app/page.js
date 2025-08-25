import Link from "next/link";

export default function HomePage() {
  return (
    <section className="relative bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center min-h-screen px-6 text-center space-y-6 overflow-hidden">
      
      {/* Decorative Circles */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-300 rounded-full opacity-30 animate-pulse blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-300 rounded-full opacity-30 animate-pulse blur-3xl"></div>

      {/* Hero Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 animate-text">
        Run faster. Shop smarter.
      </h1>

      {/* Description */}
      <p className="max-w-xl text-lg md:text-xl text-gray-600 dark:text-gray-300">
        Minimal storefront built with <span className="font-semibold text-gray-800 dark:text-white">Next.js</span>, <span className="font-semibold text-gray-800 dark:text-white">Redux</span>, <span className="font-semibold text-gray-800 dark:text-white">NextAuth</span>, and <span className="font-semibold text-gray-800 dark:text-white">Stripe</span>.
      </p>

      {/* Call-to-Action */}
      <Link
        href="/products"
        className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition transform"
      >
        Browse Products
      </Link>

      {/* Optional small features UI */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition">
          <p className="font-semibold text-gray-700 dark:text-gray-200">Fast Checkout</p>
        </div>
        <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition">
          <p className="font-semibold text-gray-700 dark:text-gray-200">Secure Payments</p>
        </div>
        <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition">
          <p className="font-semibold text-gray-700 dark:text-gray-200">Exclusive Deals</p>
        </div>
      </div>
    </section>
  );
}
