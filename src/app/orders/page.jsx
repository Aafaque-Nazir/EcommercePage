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
      <h1 className="text-3xl font-bold mb-6 mt-6 text-center">My Orders</h1>

      <div className="grid gap-6 flex-col-reverse">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Order #{order.id}
                  </h2>
                  <p className="text-gray-600">
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        order.status === "cancelled"
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                  <p className="text-gray-700 font-medium">
                    Total: ₹{order.total}
                  </p>
                </div>

                {order.status === "placed" ? (
                  <Button
                    variant="destructive"
                    onClick={() => handleCancel(order.id)}
                  >
                    Cancel Order
                  </Button>
                ) : (
                  <Button disabled className="opacity-60 cursor-not-allowed">
                    Cancelled
                  </Button>
                )}
              </div>

              <div className="mt-4 border-t pt-4">
                <h3 className="font-semibold mb-2">Items:</h3>
                <ul className="space-y-1">
                  {order.items.map((item) => (
                    <li
                      key={item.id}
                      className="text-gray-700 flex justify-between"
                    >
                      <span>
                        {item.name} × {item.qty}
                      </span>
                      <span>₹{item.price * item.qty}</span>
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
