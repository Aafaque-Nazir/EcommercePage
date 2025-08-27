"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const AddToCartButton = ({ product, className = "" }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
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
      dispatch(addToCart(cartProduct)); // redux-persist ensures this stays after refresh
      setIsAdded(true);

      setTimeout(() => {
        setIsAdded(false);
        setQuantity(1); // reset quantity selector
      }, 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {/* Quantity Selector */}
      <div className="flex items-center">
        <span className="mr-3 text-gray-700">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            -
          </button>
          <span className="px-4 py-2 bg-white text-gray-800 font-medium">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdded}
        className={`flex items-center justify-center py-3 px-6 rounded-lg font-medium transition-all ${
          isAdded
            ? "bg-green-600 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isAdded ? (
          <>
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Added to Cart!
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to Cart - ₹{product.price * quantity}
          </>
        )}
      </button>

      {isAdded && (
        <div className="mt-2 text-sm text-green-600 font-medium animate-pulse">
          {quantity} item{quantity > 1 ? "s" : ""} added to your cart
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
