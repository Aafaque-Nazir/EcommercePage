import { NextResponse } from 'next/server';
import { Cashfree } from "cashfree-pg";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function POST(request) {
  try {
    await connectDB(); // Ensure DB is connected

    const body = await request.json();
    console.log("📦 [checkout_api] Request Body:", JSON.stringify(body, null, 2));
    const { customer, items, order_amount } = body;
    console.log("🛒 [checkout_api] Extracted:", { customer: customer?.email, itemsCount: items?.length, order_amount });

    const orderId = `order_${Date.now()}`;

    // Check if we should use mock mode
    const useMockPayment = process.env.USE_MOCK_PAYMENT === 'true';

    // 1. Save Preliminary Order to DB (Status: Pending)
    const newOrder = await Order.create({
      orderId,
      customer,
      items,
      amount: order_amount,
      status: "pending",
    });

    if (useMockPayment) {
      // Mock payment mode - simulate successful payment creation
      console.log('🧪 Using MOCK payment mode');

      // Update Order ID to "placed" (simulated)
      newOrder.status = "placed";
      await newOrder.save();

      // Simulate API processing delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return NextResponse.json({
        success: true,
        mock: true,
        payment_session_id: `mock_session_${orderId}`,
        order_id: orderId,
        customer: customer,
        order_amount: order_amount
      });
    }

    // Real Cashfree integration
    const cashfree = new Cashfree(
      Cashfree.SANDBOX,
      process.env.CASHFREE_APP_ID,
      process.env.CASHFREE_SECRET_KEY
    );

    const requestData = {
      order_amount: order_amount,
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: customer.email.replace(/[^a-zA-Z0-9]/g, "_"),
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone || "9999999999"
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-success?order_id={order_id}`,
        notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhook/cashfree`
      }
    };

    const response = await cashfree.PGCreateOrder(requestData);

    // Update with payment session ID if needed, or just return
    newOrder.paymentId = response.data?.payment_session_id;
    await newOrder.save();

    return NextResponse.json({
      success: true,
      payment_session_id: response.data.payment_session_id,
      order_id: response.data.order_id,
    });

  } catch (error) {
    console.error("❌ [checkout_api] Error:", error);
    if (error.name === 'ValidationError') {
      console.error("❌ [checkout_api] Validation Error Details:", JSON.stringify(error.errors, null, 2));
    }
    return NextResponse.json(
      {
        success: false,
        error: error.response?.data?.message || error.message
      },
      { status: 500 }
    );
  }
}