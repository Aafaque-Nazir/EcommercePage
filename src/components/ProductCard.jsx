"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";
import Image from "next/image";
import { Eye, ShoppingCart, Heart, Star, TrendingUp, Zap, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
    if (discountPercent >= 40) return { text: "Hot Deal", variant: "destructive", icon: <Zap className="w-3 h-3" /> };
    if (discountPercent >= 20) return { text: `${discountPercent}% OFF`, variant: "destructive", icon: null };
    if (product.rating >= 4.5) return { text: "Bestseller", variant: "default", icon: <TrendingUp className="w-3 h-3" /> };
    if (product.stock && product.stock < 10) return { text: "Limited Stock", variant: "secondary", icon: <Package className="w-3 h-3" /> };
    return null;
  };

  const badge = getBadge();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="group relative overflow-hidden border-0 bg-card shadow-lg hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 h-full flex flex-col rounded-3xl">
        {/* Glassmorphism Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <CardContent className="p-0 flex flex-col h-full relative z-10">
          {/* Product Image Section */}
          <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-3xl">
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                className={`object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 ${
                  imageLoaded ? 'blur-0' : 'blur-sm'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </Link>
            
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            
            {/* Wishlist Button - Top Right */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleWishlist}
              className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full backdrop-blur-xl flex items-center justify-center transition-all duration-300 shadow-lg ${
                isInWishlist 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-900/90 text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </motion.button>

            {/* Hover Quick Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center gap-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <Link href={`/products/${product.id}`} className="flex-1">
                <Button 
                  size="sm" 
                  className="w-full rounded-xl bg-gray-900/95 hover:bg-black text-white shadow-xl backdrop-blur-sm font-semibold"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Quick View
                </Button>
              </Link>
            </div>

            {/* Badges - Top Left */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <Badge className="bg-gray-900/95 text-white hover:bg-gray-900 backdrop-blur-sm shadow-lg font-semibold border-0 rounded-xl px-3 py-1">
                {product.category}
              </Badge>
              
              {badge && (
                <Badge 
                  variant={badge.variant} 
                  className="shadow-lg font-bold border-0 rounded-xl px-3 py-1 flex items-center gap-1"
                >
                  {badge.icon}
                  {badge.text}
                </Badge>
              )}
            </div>

            {/* Stock Indicator */}
            {product.stock && product.stock < 10 && product.stock > 0 && (
              <div className="absolute bottom-4 left-4 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                Only {product.stock} left!
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="p-5 flex flex-col flex-grow bg-card rounded-b-3xl">
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 mb-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium ml-1">
                  ({product.rating})
                </span>
              </div>
            )}

            {/* Product Title */}
            <Link href={`/products/${product.id}`} className="block mb-3 group/title">
              <h3 className="font-bold text-lg text-white line-clamp-2 group-hover/title:text-green-400 transition-colors leading-snug">
                {product.title}
              </h3>
            </Link>

            {/* Price Section */}
            <div className="mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-500 line-through font-medium">
                      ₹{product.oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              {product.oldPrice && (
                <div className="mt-1.5">
                  <span className="inline-block text-xs font-bold text-green-400 bg-green-900/20 px-2.5 py-1 rounded-full">
                    Save ₹{(product.oldPrice - product.price).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Actions Section */}
            <div className="mt-auto space-y-2.5">
              <AddToCartButton product={product} className="w-full" />
            </div>
          </div>
        </CardContent>

        {/* Premium Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
      </Card>
    </motion.div>
  );
}
