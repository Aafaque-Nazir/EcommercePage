"use client";

import { useDispatch, useSelector } from "react-redux";
import { cancelOrder } from "../../redux/slices/orderSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProtectedPage from "@/components/ProtectedPage";


export default function OrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.list);

  const handleCancel = (id) => {
    dispatch(cancelOrder(id));
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-gray-500 text-lg">No orders placed yet.</p>
      </div>
    );
  }

  return (
   <ProtectedPage>
  <div className="max-w-4xl mx-auto p-6">
    {/* Page Title */}
    <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8 mt-6">
      My Orders
    </h1>

    {/* Orders List */}
    <div className="space-y-6">
      {orders.map((order) => (
        <Card
          key={order.id}
          className="rounded-2xl border border-gray-200 hover:shadow-2xl shadow-lg transition-all duration-300 bg-white"
        >
          <CardContent className="p-6">
            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Order #{order.id}</h2>
                <p className="text-gray-600 mt-2">
                  Status:{" "}
                  <span
                    className={`font-semibold px-3 py-1 rounded-full text-sm ${
                      order.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <p className="text-gray-800 font-bold mt-2 text-lg">₹{order.total.toLocaleString()}</p>
              </div>

              {/* Cancel Button */}
              {order.status === "placed" ? (
                <Button
                  variant="destructive"
                  onClick={() => handleCancel(order.id)}
                  className="h-fit self-start px-6 py-3 text-base font-semibold rounded-xl shadow-sm hover:shadow-md transition"
                >
                  Cancel Order
                </Button>
              ) : (
                <Button
                  disabled
                  className="h-fit self-start px-6 py-3 bg-gray-100 text-gray-500 text-base rounded-xl cursor-not-allowed"
                >
                  Cancelled
                </Button>
              )}
            </div>

            {/* Items List */}
            <div className="border-t border-gray-100 pt-5">
              <h3 className="font-bold text-gray-700 mb-3 text-lg">Items in this order</h3>
              <ul className="space-y-2">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between py-2.5 px-3.5 bg-gray-50 rounded-lg text-gray-700 text-sm sm:text-base font-medium"
                  >
                    <span>{item.name} × {item.qty}</span>
                    <span>₹{(item.price * item.qty).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</ProtectedPage>
  );
}
