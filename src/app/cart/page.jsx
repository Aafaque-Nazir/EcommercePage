// page.jsx (Cart Page with fixed navigation)
"use client";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty, clearCart } from "../../redux/slices/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);

  const handleContinueShopping = () => {
    router.push("/products");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-1 text-gray-500">Start shopping to add items to your cart.</p>
            <div className="mt-6">
              <button 
                onClick={handleContinueShopping}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img 
                        className="h-20 w-20 rounded-md object-cover" 
                        src={item.image || "/api/placeholder/80/80"} 
                        alt={item.title} 
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <p className="text-gray-500 mt-1">₹{item.price} each</p>
                      <p className="text-gray-900 font-medium mt-1">₹{item.price * item.qty} total</p>
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
                      <span className="px-3 py-1 text-gray-900 font-medium">{item.qty}</span>
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
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Total: ₹{total}</h2>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Proceed to Checkout
              </button>
              
              <div className="mt-4 text-center">
                <Link 
                  href="/products" 
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}