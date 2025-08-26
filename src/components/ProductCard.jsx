"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h2 className="mt-2 font-semibold">{product.title}</h2>
      <p className="text-gray-600">₹{product.price}</p>

      <div className="mt-auto flex gap-2">
        {/* View Details Button */}
        <button
          className="flex-1 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800"
        >
          View Details
        </button>

        {/* Add to Cart Button */}
        <button
          onClick={() => dispatch(addToCart(product))}
          className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
