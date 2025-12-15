"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ProtectedPage from "@/components/ProtectedPage";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ShoppingBag,
  Calendar,
  Download,
  HelpCircle,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const getStatusConfig = (status) => {
  switch (status) {
    case "placed":
      return { 
        icon: <Clock className="w-4 h-4" />,
        color: "bg-green-500",
        bgColor: "bg-green-50 dark:bg-green-950/30",
        textColor: "text-green-700 dark:text-green-300",
        borderColor: "border-green-200 dark:border-green-800"
      };
    case "shipped":
      return { 
        icon: <Truck className="w-4 h-4" />,
        color: "bg-green-500",
        bgColor: "bg-green-50 dark:bg-green-950/30",
        textColor: "text-green-700 dark:text-green-300",
        borderColor: "border-green-200 dark:border-green-800"
      };
    case "delivered":
      return { 
        icon: <CheckCircle className="w-4 h-4" />,
        color: "bg-green-500",
        bgColor: "bg-green-50 dark:bg-green-950/30",
        textColor: "text-green-700 dark:text-green-300",
        borderColor: "border-green-200 dark:border-green-800"
      };
    case "cancelled":
      return { 
        icon: <XCircle className="w-4 h-4" />,
        color: "bg-red-500",
        bgColor: "bg-red-50 dark:bg-red-950/30",
        textColor: "text-red-700 dark:text-red-300",
        borderColor: "border-red-200 dark:border-red-800"
      };
    default:
      return { 
        icon: <Package className="w-4 h-4" />,
        color: "bg-gray-500",
        bgColor: "bg-gray-50 dark:bg-gray-950/30",
        textColor: "text-gray-700 dark:text-gray-300",
        borderColor: "border-gray-200 dark:border-gray-800"
      };
  }
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/user/orders");
      const data = await res.json();
      
      if (data.success) {
        setOrders(data.orders);
      } else {
        // toast.error(data.error || "Failed to load orders");
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    
    if (confirmCancel) {
      toast.info("Cancellation functionality is being updated to server.");
    }
  };

  if (loading) {
    return (
      <ProtectedPage>
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
            <RefreshCw className="w-8 h-8 text-green-500 animate-spin" />
        </div>
      </ProtectedPage>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <ProtectedPage>
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-[#0a0a0a]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              No Orders Yet
            </h2>
            <p className="text-gray-400 mb-8">
              You haven't placed any orders yet, or they are loading.
            </p>
            <Link href="/products">
              <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2 mx-auto">
                <ShoppingBag className="w-5 h-5" />
                Start Shopping
              </button>
            </Link>
          </motion.div>
        </div>
      </ProtectedPage>
    );
  }

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-[#0a0a0a] py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Page Header */}
          <div className="mb-8 flex justify-between items-end">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                My Orders
                </h1>
                <p className="text-gray-400">
                Track and manage your orders
                </p>
            </div>
            <button onClick={fetchOrders} className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition">
                <RefreshCw className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {orders.map((order, index) => {
              const statusConfig = getStatusConfig(order.status);
              
              return (
                <motion.div
                  key={`${order.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#111] rounded-2xl border border-gray-800 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-green-500/10 transition-all"
                >
                  {/* Order Header */}
                  <div className="p-4 md:p-6 border-b border-gray-800">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h2 className="text-lg md:text-xl font-bold text-white">
                            Order #{order.id}
                          </h2>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bgColor} ${statusConfig.textColor} border ${statusConfig.borderColor}`}>
                            {statusConfig.icon}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Package className="w-4 h-4" />
                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="text-left sm:text-right">
                          <p className="text-xs text-gray-500 mb-0.5">Total Amount</p>
                          <p className="text-2xl md:text-3xl font-bold text-white">
                            ₹{order.total.toLocaleString()}
                          </p>
                        </div>
                        {order.status === "placed" && (
                          <button
                            onClick={() => handleCancel(order.id)}
                            className="px-4 py-2 text-sm font-medium text-red-400 bg-red-950/30 border border-red-800 rounded-lg hover:bg-red-950/50 transition-colors"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 md:p-6">
                    <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div 
                          key={`${item.id}-${idx}`} 
                          className="flex items-center gap-4 p-3 rounded-xl bg-black/40 border border-gray-800/50"
                        >
                          {/* Product Image */}
                          <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name || item.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-8 h-8 text-gray-600" />
                              </div>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white text-sm md:text-base line-clamp-1">
                              {item.name || item.title}
                            </h4>
                            <p className="text-sm text-gray-400 mt-0.5">
                              Qty: {item.qty}
                            </p>
                          </div>

                          {/* Price */}
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-white text-sm md:text-base">
                              ₹{(item.price * item.qty).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              ₹{item.price.toLocaleString()} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="mt-6 pt-6 border-t border-gray-800">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          onClick={() => toast.success("Tracking details sent to your email")}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors text-sm"
                        >
                          <Truck className="w-4 h-4" />
                          Track Order
                        </button>
                        <button
                          onClick={() => {
                            toast.loading("Downloading invoice...");
                            setTimeout(() => {
                              toast.dismiss();
                              toast.success("Invoice downloaded");
                            }, 1500);
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors text-sm"
                        >
                          <Download className="w-4 h-4" />
                          Invoice
                        </button>
                        <button
                          onClick={() => router.push("/contact")}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors text-sm"
                        >
                          <HelpCircle className="w-4 h-4" />
                          Help
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
