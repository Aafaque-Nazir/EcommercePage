import { NextResponse } from "next/server";

export async function POST(req) {
  function generateCustomerId(email) {
  return email.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50); // Limit length and replace invalid chars
}
  try {
    const { items, customer } = await req.json();

    // Calculate order total
    const amount = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const orderId = "order_" + Date.now();

    const response = await fetch(
      `https://sandbox.cashfree.com/pg/orders`, // use production URL later
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2022-09-01",
        },
        body: JSON.stringify({
          order_id: orderId,
          order_amount: amount,
          order_currency: "INR",
          customer_details: {
  customer_id: generateCustomerId(customer.email),
  customer_name: customer.name,
  customer_email: customer.email,
  customer_phone: "9999999999",
},
          order_meta: {
            return_url: `http://localhost:3000/order-success?order_id=${orderId}`,
          },
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ url: data.payment_link });
    } else {
      console.error("Cashfree error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to create order" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
