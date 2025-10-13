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

    // 🖌️ Fetch all paint orders of the user
    const orders = await PaintOrder.find({ userId })
      .populate({
        path: "items.paintProduct",
        model: "PaintProduct",
        select: "name price offerPrice images shadeNumber",
      })
      .sort({ createdAt: -1 }); // most recent first

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("❌ Fetch orders error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
