"use client";

import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck, Truck, CreditCard } from "lucide-react";
import { load } from "@cashfreepayments/cashfree-js";

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0);
  const shipping = subtotal > 500 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentMethod = e.target.payment.value;

    // Validation checks
    if (!cartItems?.length) {
      alert("Cart is empty. Add some products first.");
      return;
    }

    if (!form.name || !form.email || !form.address) {
      alert("Please fill all required fields.");
      return;
    }

    // For Cash on Delivery
    if (paymentMethod === "cod") {
      const order = {
        id: `order_${Date.now()}`,
        customer: form,
        items: cartItems,
        total,
        payment: "COD",
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("lastOrder", JSON.stringify(order));
      dispatch(clearCart());
      router.push("/order-success");
      return;
    }

    // For Online Payment (Cashfree)
    if (paymentMethod === "online") {
      setLoading(true);
      try {
        // 1. Create Order on Backend
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartItems,
            customer: {
              name: form.name,
              email: form.email,
              address: form.address,
              phone: "9876543210" // Default phone
            },
            order_amount: total,
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Payment initialization failed");
        }

        const data = await response.json();

        // Store order data BEFORE payment (for both mock and real Cashfree)
        const orderData = {
          orderId: data.order_id,
          items: cartItems,
          customer: form,
          total,
          status: "pending",
          createdAt: new Date().toISOString()
        };
        localStorage.setItem("pendingOrder", JSON.stringify(orderData));

        // Check if this is a mock payment
        if (data.mock) {
          // Mock payment flow - simulate payment
          console.log('🧪 Mock payment mode detected');
          
          // Simulate payment processing
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Clear cart and redirect to success
          dispatch(clearCart());
          router.push(`/order-success?order_id=${data.order_id}`);
          return;
        }

        if (data.payment_session_id) {
          // Real Cashfree flow
          const cashfree = await load({
            mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || "sandbox",
          });

          // Clear cart before redirecting to Cashfree
          dispatch(clearCart());

          await cashfree.checkout({
            paymentSessionId: data.payment_session_id,
            redirectTarget: "_self",
          });
        } else {
          throw new Error("Invalid payment session received");
        }

      } catch (error) {
        console.error("Payment Error:", error);
        alert(error.message || "Payment initialization failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-white">Secure Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side - Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-gray-900 shadow-lg rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">Shipping Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 bg-gray-800 text-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 bg-gray-800 text-white"
            required
          />
          <textarea
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 bg-gray-800 text-white"
            required
          />

          {/* Payment Options */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Payment Method</h2>
            <label className="flex items-center gap-3 p-3 border border-gray-700 rounded-xl cursor-pointer hover:border-green-500 bg-gray-800">
              <input type="radio" name="payment" value="cod" defaultChecked />
              <CreditCard size={18} />
              <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-gray-700 rounded-xl cursor-pointer hover:border-green-500 bg-gray-800">
              <input type="radio" name="payment" value="online" />
              <CreditCard size={18} />
              <span>UPI / Card / Netbanking</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-xl font-semibold transition ${
              loading ? "bg-gray-600 text-white cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Place Order"
            )}
          </button>
        </form>

        {/* Right Side - Order Summary */}
        <div className="bg-gray-900 shadow-lg rounded-2xl p-6 space-y-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-white">Order Summary</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {cartItems.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b dark:border-gray-700 pb-2"
              >
                <span>
                  {item.title || item.name} x {item.qty}
                </span>
                <span>₹{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t dark:border-gray-700">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="space-y-3 pt-4 text-gray-700 dark:text-gray-300 text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} />
              <span>100% Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={18} />
              <span>Fast & Reliable Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
