"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Trash2, ArrowRight, Package, Star } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "@/redux/slices/wishlistSlice";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from "sonner";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
    toast.success("Removed from wishlist");
  };

  const moveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
    toast.success("Moved to cart");
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-[#0a0a0a]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-400 mb-8">
            Save items you love to your wishlist and shop them later!
          </p>
          <Link href="/products">
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2 mx-auto">
              <Package className="w-5 h-5" />
              Continue Shopping
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                My Wishlist
              </h1>
              <p className="text-gray-400">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
            <Link href="/products">
              <button className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group h-full"
              >
                <div className="relative h-full bg-[#111] rounded-2xl border border-gray-800 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-green-500/10 transition-all flex flex-col">
                  {/* Image Section */}
                  <div className="relative aspect-square overflow-hidden bg-gray-900">
                    <Link href={`/products/${item.id}`}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-10 h-10 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-colors shadow-lg z-10"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-semibold rounded-full">
                        {item.category}
                      </span>
                      {item.oldPrice && (
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                          {Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}% OFF
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-4 flex flex-col flex-grow">
                    <Link href={`/products/${item.id}`} className="block mb-2">
                      <h3 className="font-semibold text-white line-clamp-2 hover:text-green-400 transition-colors leading-tight">
                        {item.title}
                      </h3>
                    </Link>

                    {/* Rating */}
                    {item.rating && (
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-white">{item.rating}</span>
                        <span className="text-xs text-gray-400">({item.reviews || 128})</span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl font-bold text-white">
                        ₹{item.price.toLocaleString()}
                      </span>
                      {item.oldPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{item.oldPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-auto space-y-2">
                      <button
                        onClick={() => moveToCart(item)}
                        className="w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Move to Cart
                      </button>
                      <Link href={`/products/${item.id}`} className="block">
                        <button className="w-full px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
