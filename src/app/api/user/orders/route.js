import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        // Query orders where the customer email matches the logged-in user's email
        const orders = await Order.find({
            "customer.email": session.user.email
        }).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            orders: orders.map(order => ({
                id: order.orderId,
                date: order.createdAt,
                status: order.status,
                total: order.amount,
                items: order.items,
                // Include any other necessary fields
            }))
        });

    } catch (error) {
        console.error("Fetch User Orders Error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
