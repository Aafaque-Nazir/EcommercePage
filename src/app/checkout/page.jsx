"use client";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck, Truck, CreditCard } from "lucide-react";


export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();



  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentMethod = e.target.payment.value;

    if (paymentMethod === "cod") {
      // Cash on Delivery flow
      const order = {
        customer: form,
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
      };
      localStorage.setItem("lastOrder", JSON.stringify(order));
      dispatch(clearCart());
      router.push("/order-success");
    } else {
      // Stripe Checkout flow
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cartItems, customer: form }),
        });

        const data = await res.json();

        if (data.url) {
          window.location.href = data.url; // Redirect to Stripe checkout page
        } else {
          alert("Failed to start payment session.");
        }
      } catch (err) {
        console.error("Payment error:", err);
        alert("Something went wrong. Try again.");
      }
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 500 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Secure Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side - Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-white shadow-lg rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black"
            required
          />
          <textarea
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black"
            required
          />

          {/* Payment Options */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Payment Method</h2>
            <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:border-black">
              <input type="radio" name="payment" value="cod" defaultChecked />
              <CreditCard size={18} />
              <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:border-black">
              <input type="radio" name="payment" value="online" />
              <CreditCard size={18} />
              <span>UPI / Card / Netbanking</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Place Order
          </button>
        </form>

        {/* Right Side - Order Summary */}
        <div className="bg-gray-50 shadow-lg rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3">
            {cartItems.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="space-y-3 pt-4 text-gray-700 text-sm">
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
