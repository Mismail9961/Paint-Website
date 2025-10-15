import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import PaintOrder from "@/models/PaintOrder";

export async function GET(request) {
  try {
    await connectDB();
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 🧩 Fetch all paint + product orders with proper population
    const orders = await PaintOrder.find({ userId })
      .populate({
        path: "items.paintProduct",
        model: "PaintProduct",
        select: "name price offerPrice images shadeNumber",
      })
      .populate({
        path: "items.product",
        model: "Product",
        select: "name price offerPrice image images picture imageUrl", // Include all possible image field names
      })
      .sort({ createdAt: -1 })
      .lean(); // Add lean() for better performance and to ensure proper data structure

    // Debug: Log first order to see structure
    if (orders.length > 0) {
      console.log("🔍 First order items:", JSON.stringify(orders[0].items, null, 2));
    }

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("❌ Fetch orders error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
}