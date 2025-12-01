"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, Eye } from "lucide-react";
import { addToWishlist, removeFromWishlist } from "@/redux/slices/wishlistSlice";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);
  const [imageLoaded, setImageLoaded] = useState(false);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  // Calculate discount percentage
  const discountPercent = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  // Determine badge type
  const getBadge = () => {
    if (discountPercent >= 40) return { text: "Hot Deal", className: "bg-red-500 text-white" };
    if (discountPercent >= 20) return { text: `${discountPercent}% OFF`, className: "bg-orange-500 text-white" };
    if (product.rating >= 4.5) return { text: "Bestseller", className: "bg-blue-500 text-white" };
    if (product.stock && product.stock < 10) return { text: "Limited", className: "bg-yellow-500 text-black" };
    return null;
  };

  const badge = getBadge();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full group"
    >
      <div className="relative h-full bg-white dark:bg-[#111] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
        
        {/* Image Section */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-900">
          <Link href={`/products/${product.id}`} className="block w-full h-full">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {badge && (
              <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm ${badge.className}`}>
                {badge.text}
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-300 z-10 ${
              isInWishlist 
                ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>

          {/* Quick Add Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 bg-gradient-to-t from-black/50 to-transparent flex gap-2">
             <AddToCartButton 
                product={product} 
                className="flex-1 bg-white text-black hover:bg-gray-100 border-none shadow-lg"
             />
             <Link href={`/products/${product.id}`} className="flex-1">
                <button className="w-full h-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 font-medium rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 shadow-lg">
                  <Eye className="w-4 h-4" />
                  View
                </button>
             </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Category */}
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium uppercase tracking-wider">
            {product.category}
          </div>

          {/* Title */}
          <Link href={`/products/${product.id}`} className="block mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">{product.rating}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviews || 128})</span>
          </div>

          {/* Price & Stock */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.oldPrice && (
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  Save ₹{(product.oldPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
