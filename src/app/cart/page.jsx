"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../../redux/slices/cartSlice";
import { useRouter } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);

  const handleContinueShopping = () => {
    router.push("/products");
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-white mb-10 flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-green-500" />
          Your Shopping Cart
        </h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-16 text-center shadow-2xl"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="mx-auto w-24 h-24 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center mb-6 shadow-lg">
                <ShoppingBag className="w-12 h-12 text-green-500" />
              </div>
              
              {/* Text */}
              <h3 className="text-2xl font-bold text-white mb-3">
                Your cart is empty
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Start adding products to see them here.
              </p>
              
              {/* Button */}
              <Button
                onClick={handleContinueShopping}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg shadow-green-900/30 hover:shadow-xl hover:shadow-green-900/40 transition-all"
              >
                Continue Shopping
              </Button>
            </div>
          </motion.div>
        ) : (
          <Card className="overflow-hidden shadow-xl rounded-2xl">
            <CardContent className="p-0">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b last:border-none"
                  >
                    <div className="flex items-start gap-5">
                      <img
                        className="h-24 w-24 rounded-xl object-cover shadow-md"
                        src={item.image || "/api/placeholder/100/100"}
                        alt={item.title}
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 mt-1">
                          ₹{item.price.toLocaleString()} each
                        </p>
                        <p className="text-gray-900 font-medium mt-1">
                          ₹{(item.price * item.qty).toLocaleString()} total
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 sm:mt-0 flex items-center gap-4">
                      <div className="flex items-center border border-gray-700 rounded-lg shadow-sm">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => dispatch(decreaseQty(item.id))}
                          disabled={item.qty <= 1}
                          className="rounded-l-lg"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-4 font-medium text-white">{item.qty}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => dispatch(increaseQty(item.id))}
                          className="rounded-r-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>

            <div className="px-6 py-6 bg-gray-900 border-t border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Total: ₹{total.toLocaleString()}
                </h2>
                <Button
                  variant="outline"
                  onClick={() => dispatch(clearCart())}
                  className="mt-2"
                >
                  Clear Cart
                </Button>
              </div>

              <Button
                onClick={() => router.push("/checkout")}
                className="bg-green-600 hover:bg-green-700 cursor-pointer text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md"
              >
                Proceed to Checkout
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
