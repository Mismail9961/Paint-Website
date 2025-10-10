import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";

// 📦 GET /api/products → list all products
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({ createdAt: -1 }); // newest first

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
