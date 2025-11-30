"use client";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cancelOrder } from "../../redux/slices/orderSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProtectedPage from "@/components/ProtectedPage";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ShoppingBag,
  Calendar,
  MapPin
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const getStatusIcon = (status) => {
  switch (status) {
    case "placed":
      return <Clock className="w-5 h-5" />;
    case "shipped":
      return <Truck className="w-5 h-5" />;
    case "delivered":
      return <CheckCircle className="w-5 h-5" />;
    case "cancelled":
      return <XCircle className="w-5 h-5" />;
    default:
      return <Package className="w-5 h-5" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "placed":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
    case "shipped":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400";
    case "delivered":
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    case "cancelled":
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

export default function OrdersPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const orders = useSelector((state) => state.orders.list);

  const handleCancel = (id) => {
    dispatch(cancelOrder(id));
  };

  if (!orders || orders.length === 0) {
    return (
      <ProtectedPage>
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No Orders Yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              You haven't placed any orders. Start shopping to see your orders here!
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </ProtectedPage>
    );
  }

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              My Orders
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Track and manage your orders
            </p>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={`${order.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    {/* Order Header */}
                    <div className="bg-black border-b border-gray-800 p-6 text-white">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold">
                              Order #{order.id}
                            </h2>
                            <Badge className={`${getStatusColor(order.status)} flex items-center gap-2 px-3 py-1`}>
                              {getStatusIcon(order.status)}
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-gray-400 text-sm">
                            <span className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date().toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-2">
                              <Package className="w-4 h-4" />
                              {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <div className="text-right">
                            <p className="text-gray-400 text-sm">Total Amount</p>
                            <p className="text-3xl font-bold">
                              ₹{order.total.toLocaleString()}
                            </p>
                          </div>
                          {order.status === "placed" && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleCancel(order.id)}
                              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                            >
                              Cancel Order
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6 bg-black border-x border-b border-gray-800">
                      <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Order Items
                      </h3>
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={item.id}>
                            <div className="flex items-center justify-between py-3">
                              <div className="flex items-center gap-4 flex-1">
                                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-800">
                                  <Package className="w-8 h-8 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-white">
                                    {item.name}
                                  </p>
                                  <p className="text-sm text-gray-400">
                                    Qty: {item.qty}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-white">
                                  ₹{(item.price * item.qty).toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-400">
                                  ₹{item.price.toLocaleString()} each
                                </p>
                              </div>
                            </div>
                            {idx < order.items.length - 1 && <Separator />}
                          </div>
                        ))}
                      </div>

                      {/* Order Actions */}
                      <div className="mt-6 pt-6 border-t border-gray-800">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button 
                            variant="outline" 
                            className="flex-1 bg-gray-900 border-gray-800 text-white hover:bg-gray-800 hover:text-white transition-all duration-200"
                            onClick={() => toast.success("Tracking details have been sent to your email.")}
                          >
                            <Truck className="w-4 h-4 mr-2" />
                            Track Order
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 bg-gray-900 border-gray-800 text-white hover:bg-gray-800 hover:text-white transition-all duration-200"
                            onClick={() => {
                              toast.loading("Downloading invoice...");
                              setTimeout(() => {
                                toast.dismiss();
                                toast.success("Invoice downloaded successfully.");
                              }, 2000);
                            }}
                          >
                            Download Invoice
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 bg-gray-900 border-gray-800 text-white hover:bg-gray-800 hover:text-white transition-all duration-200"
                            onClick={() => router.push("/contact")}
                          >
                            Need Help?
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
