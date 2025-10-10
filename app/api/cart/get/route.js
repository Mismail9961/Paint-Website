import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";

// ✅ Named export for GET method
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

    // Find user and get their cart
    const user = await User.findOne({ _id: userId }).select("cartItems");

    console.log("📤 Raw cart from DB:", user?.cartItems);

    if (!user || !user.cartItems) {
      return NextResponse.json({
        success: true,
        cartItems: [],
        message: "No cart found",
      });
    }

    // 🔥 Convert ObjectIds to strings for frontend consistency
    const cartItems = (user.cartItems || []).map((item) => ({
      productId: item.productId.toString(),
      quantity: item.quantity,
      shadeNumber: item.shadeNumber || "",
    }));

    console.log("📤 Sending cart to frontend:", cartItems);

    return NextResponse.json({
      success: true,
      cartItems,
    });
  } catch (error) {
    console.error("❌ Error getting cart:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}