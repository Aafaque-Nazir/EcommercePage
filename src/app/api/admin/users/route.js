import { NextResponse } from 'next/server';
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request) {
    try {
        await connectDB();

        // Security Check
        const session = await getServerSession(authOptions);
        if (!session || session.user.email !== "aafaquenazir@gmail.com") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Aggregate to find unique customers
        const users = await Order.aggregate([
            {
                $group: {
                    _id: "$customer.email",
                    name: { $first: "$customer.name" },
                    phone: { $first: "$customer.phone" },
                    totalOrders: { $sum: 1 },
                    totalSpent: { $sum: "$amount" },
                    lastOrderDate: { $max: "$createdAt" },
                    lastOrderId: { $first: "$orderId" } // Just a sample order ID
                }
            },
            { $sort: { lastOrderDate: -1 } }
        ]);

        return NextResponse.json({
            success: true,
            users: users.map(u => ({
                email: u._id, // _id is the email
                name: u.name,
                phone: u.phone || "N/A",
                totalOrders: u.totalOrders,
                totalSpent: u.totalSpent,
                lastActive: u.lastOrderDate,
            }))
        });

    } catch (error) {
        console.error("Fetch Users Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
    }
}
