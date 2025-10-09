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

    const { cartData } = await request.json();

    if (!Array.isArray(cartData)) {
      return NextResponse.json(
        { success: false, message: "Invalid cart data format" },
        { status: 400 }
      );
    }

    // ✅ Use correct field (userId) instead of clerkId
    const updatedUser = await User.findOneAndUpdate(
      { userId }, // ensure your schema has `userId` for Clerk users
      {
        $set: {
          cartItems: cartData.map((item) => ({
            productId: item.productId,
            quantity: item.quantity || 1,
            shadeNumber: item.shadeNumber || "",
          })),
        },
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "Cart updated successfully",
      cartItems: updatedUser.cartItems,
    });
  } catch (error) {
    console.error("❌ Error updating cart:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
