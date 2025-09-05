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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-blue-600" />
          Your Shopping Cart
        </h1>

        {items.length === 0 ? (
          <Card className="p-10 text-center shadow-lg bg-white rounded-2xl">
            <h3 className="text-xl font-semibold text-gray-800">
              Your cart is empty 🛒
            </h3>
            <p className="text-gray-500 mt-2">
              Start adding products to see them here.
            </p>
            <Button
              onClick={handleContinueShopping}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Continue Shopping
            </Button>
          </Card>
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
                        <h3 className="text-lg font-semibold text-gray-900">
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
                      <div className="flex items-center border rounded-lg shadow-sm">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => dispatch(decreaseQty(item.id))}
                          disabled={item.qty <= 1}
                          className="rounded-l-lg"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-4 font-medium">{item.qty}</span>
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

            <div className="px-6 py-6 bg-gray-50 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
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
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md"
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
