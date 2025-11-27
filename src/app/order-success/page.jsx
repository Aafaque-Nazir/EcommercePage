"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { CheckCircle, Package, IndianRupee } from "lucide-react";
import { addOrder } from "../../redux/slices/orderSlice";
import { useSearchParams } from "next/navigation";

export default function OrderSuccessPage() {
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. COD flow (saved in localStorage as lastOrder)
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder);
      const newOrder = {
        ...parsedOrder,
        id: parsedOrder.id || Date.now(),
        date: new Date().toLocaleString(),
        status: "placed",
      };
      dispatch(addOrder(newOrder));
      setOrder(newOrder);
      localStorage.removeItem("lastOrder");
      return;
    }

    // 2. Online Payment flow (Cashfree redirect)
    const orderId = searchParams.get("order_id");
    if (orderId) {
      // Try to get pending order details from localStorage
      const pendingOrderStr = localStorage.getItem("pendingOrder");
      let newOrder;

      if (pendingOrderStr) {
        const pendingOrder = JSON.parse(pendingOrderStr);
        newOrder = {
          ...pendingOrder,
          id: orderId, // Use the actual order ID from URL
          date: new Date().toLocaleString(),
          status: "placed", // Assume placed if redirected back successfully
        };
        localStorage.removeItem("pendingOrder");
      } else {
        // Fallback if localStorage is cleared or missing
        newOrder = {
          id: orderId,
          date: new Date().toLocaleString(),
          status: "placed",
          customer: {
            name: "Customer",
            email: "N/A",
          },
          items: [],
          total: 0,
        };
      }
      
      dispatch(addOrder(newOrder));
      setOrder(newOrder);
    }
  }, [dispatch, searchParams]);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-gray-500">
        <Package className="w-16 h-16 mb-4 text-gray-400" />
        <p>No recent order found.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-3xl mx-auto p-8"
    >
      {/* Success Header */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
        <CheckCircle className="w-14 h-14 text-green-600 mb-3" />
        <h1 className="text-3xl font-bold text-green-700">Order Successful 🎉</h1>
        <p className="text-gray-600 mt-2">
          Thank you,{" "}
          <span className="font-semibold">{order.customer?.name || "User"}</span>
          ! Your order has been placed successfully.
        </p>
      </div>

      {/* Order Summary */}
      <div className="mt-8 bg-white border rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Order Summary</h2>

        {order.items.length > 0 ? (
          <div className="divide-y">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-3"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-sm text-gray-500">Qty: {item.qty}</span>
                </div>
                <span className="font-semibold text-gray-700">
                  ₹{item.price * item.qty}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-sm">
            Order details will be updated soon.
          </p>
        )}

        <div className="flex justify-between items-center pt-4 border-t">
          <span className="text-lg font-semibold flex items-center gap-1">
            <IndianRupee className="w-5 h-5" /> Total
          </span>
          <span className="text-xl font-bold text-green-700">₹{order.total}</span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-8 flex justify-center">
        <motion.a
          href="/orders"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition-colors"
        >
          View My Orders
        </motion.a>
      </div>
    </motion.div>
  );
}
