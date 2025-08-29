"use client";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }) {
  return (
    <div className="group relative bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl p-5 flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] border border-gray-200">
      
      {/* Product Image */}
      <div className="relative w-full h-52 overflow-hidden rounded-2xl">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 rounded-2xl" />
      </div>

      {/* Product Info */}
      <div className="mt-4 flex flex-col gap-1">
        <span className="text-xs font-semibold text-white bg-blue-600 px-2 py-1 rounded-full w-max">
          {product.category}
        </span>

        <h2 className="font-semibold text-lg text-gray-900 group-hover:text-black line-clamp-2">
          {product.title}
        </h2>

        <p className="text-xl font-bold text-green-700">₹{product.price}</p>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex flex-wrap gap-3 w-full">
        <button className="flex-1 bg-gradient-to-r from-gray-900 to-gray-700 text-white px-4 py-2 rounded-2xl font-medium shadow-sm hover:shadow-lg hover:opacity-90 transition text-sm sm:text-base">
          View Details
        </button>

        <div className="flex-1">
          <AddToCartButton product={product} className="w-full text-sm sm:text-base" />
        </div>
      </div>
    </div>
  );
}
