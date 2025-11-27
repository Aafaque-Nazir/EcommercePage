import { NextResponse } from 'next/server';
import { Cashfree } from "cashfree-pg";

export async function POST(request) {
  try {
    const body = await request.json();
    const { customer, order_amount } = body;

    const orderId = `order_${Date.now()}`;

    // Check if we should use mock mode
    const useMockPayment = process.env.USE_MOCK_PAYMENT === 'true';

    if (useMockPayment) {
      // Mock payment mode - simulate successful payment creation
      console.log('🧪 Using MOCK payment mode');

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

    return NextResponse.json({
      success: true,
      payment_session_id: response.data.payment_session_id,
      order_id: response.data.order_id,
    });

  } catch (error) {
    console.error("Cashfree Error:", error.response?.data?.message || error.message);
    return NextResponse.json(
      {
        success: false,
        error: error.response?.data?.message || error.message
      },
      { status: 500 }
    );
  }
}