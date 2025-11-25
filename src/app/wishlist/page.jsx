"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Trash2, ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "@/redux/slices/wishlistSlice";
import { addToCart } from "@/redux/slices/cartSlice";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const moveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Save items you love to your wishlist and shop them later!
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Package className="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            My Wishlist
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    {/* Image Section */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <Link href={`/products/${item.id}`}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </Link>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="absolute top-3 right-3 w-10 h-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-lg z-10"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <Badge className="bg-white/95 dark:bg-gray-900/95 text-black dark:text-white">
                          {item.category}
                        </Badge>
                        {item.oldPrice && (
                          <Badge variant="destructive">
                            {Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}% OFF
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="p-5 bg-white dark:bg-gray-800">
                      <Link href={`/products/${item.id}`} className="block mb-3">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                          {item.title}
                        </h3>
                      </Link>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          ₹{item.price.toLocaleString()}
                        </span>
                        {item.oldPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{item.oldPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <Button
                          onClick={() => moveToCart(item)}
                          className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Move to Cart
                        </Button>
                        <Link href={`/products/${item.id}`} className="block">
                          <Button variant="outline" className="w-full">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link href="/products">
            <Button variant="outline" size="lg" className="px-8">
              <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
