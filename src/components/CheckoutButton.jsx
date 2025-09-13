"use client";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutButton({ cartItems }) {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="w-full px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
    >
      Checkout with Stripe
    </button>
  );
}
