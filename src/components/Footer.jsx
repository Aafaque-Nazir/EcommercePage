"use client";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-200 py-12 border-t border-green-900/30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-6 group">
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-emerald-500 transition-all">
              ShopEase
            </span>
          </Link>
          <p className="text-gray-400 mb-6">
            Elevate your style with premium products delivered right to your doorstep. Quality meets convenience.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-all duration-300">
              <FaFacebookF />
            </a>
            <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-all duration-300">
              <FaTwitter />
            </a>
            <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-all duration-300">
              <FaInstagram />
            </a>
            <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-all duration-300">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
          <ul className="space-y-4">
            {['Home', 'Shop', 'About Us', 'Contact', 'FAQ'].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-white">Customer Service</h3>
          <ul className="space-y-4">
            {['Returns', 'Shipping', 'Privacy Policy', 'Terms & Conditions'].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-white">Newsletter</h3>
          <p className="text-gray-400 mb-6">Subscribe to get the latest deals and offers.</p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-3 rounded-xl bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500 border border-gray-700 transition-all"
              aria-label="Your email"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-green-900/20"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
}
