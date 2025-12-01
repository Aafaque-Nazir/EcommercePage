"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { motion } from "framer-motion";

import { cn } from "../lib/utils";

const AddToCartButton = ({ product, quantity = 1, className }) => {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product.id) return;

    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      qty: quantity,
      category: product.category,
      description: product.description,
    };

    try {
      dispatch(addToCart(cartProduct));
      setIsAdded(true);

      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleAddToCart}
      disabled={isAdded}
      className={cn(
        "w-full flex items-center justify-center py-3 px-5 rounded-xl font-medium shadow-md transition-all",
        isAdded
          ? "bg-green-600 text-white"
          : "bg-green-600 hover:bg-green-700 text-white hover:shadow-lg hover:shadow-green-600/20",
        className
      )}
    >
      {isAdded ? (
        <>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Added!
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add ₹{(product.price * quantity).toLocaleString()}
        </>
      )}
    </motion.button>
  );
};

export default AddToCartButton;
