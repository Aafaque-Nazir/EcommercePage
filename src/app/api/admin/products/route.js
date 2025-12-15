import { NextResponse } from 'next/server';
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request) {
    try {
        await connectDB();
        const products = await Product.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, products });
    } catch (error) {
        console.error("Fetch Products Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();

        // Security Check
        const session = await getServerSession(authOptions);
        if (!session || session.user.email !== "aafaquenazir@gmail.com") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const product = await Product.create(body);

        return NextResponse.json({ success: true, product }, { status: 201 });

    } catch (error) {
        console.error("Create Product Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(request) {
    try {
        await connectDB();

        // Security Check
        const session = await getServerSession(authOptions);
        if (!session || session.user.email !== "aafaquenazir@gmail.com") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "Product ID required" }, { status: 400 });
        }

        await Product.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Product deleted" });

    } catch (error) {
        console.error("Delete Product Error:", error);
        return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await connectDB();

        // Security Check
        const session = await getServerSession(authOptions);
        if (!session || session.user.email !== "aafaquenazir@gmail.com") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { _id, ...updateData } = body;

        if (!_id) {
            return NextResponse.json({ error: "Product ID required" }, { status: 400 });
        }

        const product = await Product.findByIdAndUpdate(
            _id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, product });

    } catch (error) {
        console.error("Update Product Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
