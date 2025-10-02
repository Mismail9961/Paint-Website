import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import PaintProduct from "@/models/Paint";

export async function GET() {
  try {
    await connectDB();

    // Fetch all paint products
    const paints = await PaintProduct.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: paints.length,
      data: paints,
    });
  } catch (error) {
    console.error("❌ Error fetching paints:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch paints", details: error.message },
      { status: 500 }
    );
  }
}
