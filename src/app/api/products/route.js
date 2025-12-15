import { NextResponse } from 'next/server';
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = {};
    if (category && category !== 'All') {
      query.category = new RegExp(`^${category}$`, 'i');
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    const formattedProducts = products.map(p => ({
      id: p._id.toString(),
      title: p.title,
      price: p.price,
      image: p.image,
      category: p.category,
      description: p.description,
      stock: p.stock,
      rating: 4.5, // Default rating as we don't have reviews schema yet
      reviews: 0
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("Products API Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
