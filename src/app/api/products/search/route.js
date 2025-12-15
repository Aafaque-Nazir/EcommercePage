
import { NextResponse } from 'next/server';
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        if (!query || query.length < 2) {
            return NextResponse.json({ success: true, results: [] });
        }

        const products = await Product.find({
            title: { $regex: query, $options: 'i' }
        })
            .select('title image price category _id')
            .limit(5);

        return NextResponse.json({ success: true, results: products });

    } catch (error) {
        console.error("Search Error:", error);
        return NextResponse.json({ error: "Search failed" }, { status: 500 });
    }
}
