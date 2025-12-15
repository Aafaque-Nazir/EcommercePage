import { NextResponse } from 'next/server';
import connectDB from "@/lib/db";
import Order from "@/models/Order";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request) {
    try {
        await connectDB();

        // Security Check: Ensure user is Admin
        const session = await getServerSession(authOptions);
        if (!session || session.user.email !== "aafaquenazir@gmail.com") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const orders = await Order.find().sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            orders: orders.map(order => ({
                id: order.orderId,
                customerName: order.customer?.name,
                customerEmail: order.customer?.email,
                amount: order.amount,
                status: order.status,
                date: order.createdAt,
                itemsCount: order.items?.length || 0
            }))
        });

    } catch (error) {
        console.error("Fetch Orders Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
    }
}

export async function PATCH(request) {
    try {
        await connectDB();

        // Security Check
        const session = await getServerSession(authOptions);
        if (!session || session.user.email !== "aafaquenazir@gmail.com") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { orderId, status } = body;

        if (!orderId || !status) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId: orderId },
            { status: status },
            { new: true }
        );

        if (!updatedOrder) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, order: updatedOrder });

    } catch (error) {
        console.error("Update Order Error:", error);
        return NextResponse.json({ success: false, error: "Failed to update order" }, { status: 500 });
    }
}
