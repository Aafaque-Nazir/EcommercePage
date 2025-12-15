import { NextResponse } from 'next/server';
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request) {
    try {
        await connectDB();

        // Security Check: Ensure user is Admin
        const session = await getServerSession(authOptions);
        console.log("Admin Stats Session Check:", session?.user?.email);

        // TEMPORARY: Allow if email matches OR if in development
        if (!session || session.user.email !== "aafaquenazir@gmail.com") {
            console.log("Unauthorized Access Attempt:", session?.user?.email);
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 1. Total Stats
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();

        const result = await Order.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
        ]);
        const totalRevenue = result[0]?.totalRevenue || 0;

        // 2. Unique Users (by email)
        const uniqueUsers = await Order.distinct("customer.email");
        const totalUsers = uniqueUsers.length;

        // 3. Sales Chart Data (Monthly Aggregation for last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const monthlyStats = await Order.aggregate([
            { $match: { createdAt: { $gte: sixMonthsAgo } } },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    sales: { $sum: "$amount" },
                    orders: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        // Format data for Recharts (e.g., "Jan", "Feb")
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const salesChart = monthlyStats.map(item => ({
            name: monthNames[item._id.month - 1],
            sales: item.sales,
            orders: item.orders,
            visitors: 0 // We don't track visitors yet
        }));

        // If no data, return empty array implies 0 graphs, or we can pad it with 0s if needed.
        // For "Real Track", raw data is better.

        const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10);

        return NextResponse.json({
            success: true,
            stats: {
                revenue: totalRevenue,
                orders: totalOrders,
                users: totalUsers,
                products: totalProducts,
            },
            salesChart: salesChart,
            recentOrders: recentOrders.map(order => ({
                id: order.orderId,
                user: order.customer?.name,
                date: new Date(order.createdAt).toLocaleDateString(),
                total: `₹${order.amount}`,
                status: order.status
            }))
        });

    } catch (error) {
        console.error("Stats Error:", error);
        return NextResponse.json({
            error: "Internal Server Error",
            details: error.toString(),
            message: error.message
        }, { status: 500 });
    }
}
