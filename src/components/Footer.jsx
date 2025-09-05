"use client";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">ShopEase</h2>
          <p className="text-gray-400">
            Elevate your style with premium products delivered right to your doorstep.
          </p>
          <div className="flex mt-4 space-x-4">
            <a href="#" className="hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Shop</a></li>
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Customer Service</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">Returns</a></li>
            <li><a href="#" className="hover:text-white transition">Shipping</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
  <h3 className="text-xl font-semibold mb-4 text-white">Newsletter</h3>
  <p className="text-gray-400 mb-4">Subscribe to get the latest deals and offers.</p>
  <form className="flex flex-col sm:flex-row gap-2 w-full">
    <input
      type="email"
      placeholder="Your email"
      className="px-4 py-2 rounded-md text-white outline-none focus:ring-2 focus:ring-purple-500 flex-1 min-w-0 border border-gray-300"
      aria-label="Your email"
    />
    <button
      type="submit"
      className="bg-purple-500 hover:bg-purple-600 text-gray-900 font-semibold px-4 py-2 rounded-md transition whitespace-nowrap"
    >
      Subscribe
    </button>
  </form>
</div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
}
