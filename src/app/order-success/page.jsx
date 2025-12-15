"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { CheckCircle, Package, IndianRupee, Mail } from "lucide-react";
import { addOrder } from "../../redux/slices/orderSlice";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function OrderSuccessPage() {
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const emailSentRef = useRef(false);

  // Helper to send email via Formspree
  const sendOrderEmail = async (orderData) => {
    if (emailSentRef.current) return;
    emailSentRef.current = true; // Prevent double sending in React Strict Mode

    try {
      const response = await fetch("https://formspree.io/f/xrbnjrdd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _subject: `New Order #${orderData.id} from ${orderData.customer?.name || "Customer"}`,
          amount: `₹${orderData.total}`,
          customer: orderData.customer,
          items: orderData.items.map(item => `${item.title} (x${item.qty})`).join(", "),
          orderDetails: orderData, // Sending full object just in case
        }),
      });

      if (response.ok) {
        toast.success("Order confirmation sent to admin!");
      }
    } catch (error) {
      console.error("Failed to send order email:", error);
    }
  };

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
      sendOrderEmail(newOrder);
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
      sendOrderEmail(newOrder);
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
      <div className="bg-green-900/20 border border-green-600 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
        <div className="relative">
          <div className="absolute inset-0 bg-green-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
          <CheckCircle className="w-16 h-16 text-green-500 mb-4 relative z-10" />
        </div>
        <h1 className="text-3xl font-bold text-green-400">Order Successful!</h1>
        <p className="text-gray-300 mt-2 max-w-md">
          Thank you, <span className="font-semibold text-white">{order.customer?.name || "User"}</span>! 
          Your order #{order.id} has been placed.
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm text-green-300 bg-green-900/40 px-3 py-1 rounded-full border border-green-800">
            <Mail size={14} />
            Email receipt sent
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gray-800/50 p-4 border-b border-gray-800">
             <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Package size={18} className="text-gray-400" />
                Order Summary
             </h2>
        </div>
        
        <div className="p-6 space-y-4">
            {/* Delivery Details */}
            {order.customer?.fullAddress && (
                <div className="bg-black/20 p-4 rounded-xl border border-gray-800 mb-4">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Delivering To:</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {order.customer.fullAddress}
                    </p>
                    <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                        <span className="bg-gray-800 px-2 py-0.5 rounded text-xs border border-gray-700">Mobile</span> 
                        {order.customer.phone || order.customer.mobile}
                    </p>
                </div>
            )}

            {order.items.length > 0 ? (
            <div className="divide-y divide-gray-800">
                {order.items.map((item) => (
                <div
                    key={item.id}
                    className="flex justify-between items-center py-4 first:pt-0 last:pb-0"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 text-xs">IMG</div>
                        <div className="flex flex-col">
                            <span className="font-medium text-white">{item.title}</span>
                            <span className="text-sm text-gray-500">Qty: {item.qty}</span>
                        </div>
                    </div>
                    <span className="font-semibold text-white">
                    ₹{(item.price * item.qty).toLocaleString()}
                    </span>
                </div>
                ))}
            </div>
            ) : (
            <p className="text-gray-500 italic text-sm">
                Order details will be updated soon.
            </p>
            )}

            <div className="flex justify-between items-center pt-6 border-t border-gray-800 mt-4">
                <span className="text-lg font-medium text-gray-400">Total Amount</span>
                <span className="text-2xl font-bold text-green-400 flex items-center">
                    <IndianRupee className="w-6 h-6" /> 
                    {order.total?.toLocaleString()}
                </span>
            </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-8 flex justify-center pb-8">
        <motion.a
          href="/orders"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-4 bg-white text-black font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-colors shadow-green-900/20"
        >
          View My Orders
        </motion.a>
      </div>
    </motion.div>
  );
}
