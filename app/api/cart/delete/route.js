import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request) {
  try {
    await connectDB();

    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    // Remove item from user's cart
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { cartItems: { productId } } },
      { new: true }
    ).populate("cartItems.productId");

    return NextResponse.json({
      success: true,
      message: "Item removed from cart",
      cartItems: updatedUser?.cartItems || [],
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
