"use client";

import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist, selectIsInWishlist } from "@/redux/slices/wishlistSlice";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function WishlistButton({ product, size = "icon", variant = "ghost", className = "" }) {
  const dispatch = useDispatch();
  const isInWishlist = useSelector((state) => selectIsInWishlist(state, product.id));

  const handleToggle = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <Button
      size={size}
      variant={variant}
      className={`rounded-full ${className}`}
      onClick={handleToggle}
    >
      <motion.div
        whileTap={{ scale: 0.9 }}
        animate={{ scale: isInWishlist ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isInWishlist
              ? "fill-red-500 text-red-500"
              : "text-gray-600 dark:text-gray-400"
          }`}
        />
      </motion.div>
    </Button>
  );
}
