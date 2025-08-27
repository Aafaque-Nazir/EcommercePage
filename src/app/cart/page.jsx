"use client";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../../redux/slices/cartSlice";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);

  const handleContinueShopping = () => {
    router.push("/products");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Your Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Your cart is empty
            </h3>
            <div className="mt-6">
              <button
                onClick={handleContinueShopping}
                className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Cart Items</h2>
            </div>

            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      className="h-20 w-20 rounded-md object-cover"
                      src={item.image || "/api/placeholder/80/80"}
                      alt={item.title}
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 mt-1">₹{item.price} each</p>
                      <p className="text-gray-900 font-medium mt-1">
                        ₹{item.price * item.qty} total
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => dispatch(decreaseQty(item.id))}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"
                        disabled={item.qty <= 1}
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-gray-900 font-medium">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => dispatch(increaseQty(item.id))}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                      title="Remove item"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Total: ₹{total}
                </h2>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Clear Cart
                </button>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
