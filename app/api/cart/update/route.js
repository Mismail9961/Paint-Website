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

    const { cartData, clearCart } = await request.json();

    // ✅ Clear cart completely
    if (clearCart) {
      await User.findOneAndUpdate(
        { _id: userId },
        { $set: { cartItems: [] } },
        { new: true, upsert: true }
      );

      return NextResponse.json({
        success: true,
        message: "Cart cleared successfully",
      });
    }

    // ✅ Validate cart data
    if (!Array.isArray(cartData) || cartData.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid or empty cart data" },
        { status: 400 }
      );
    }

    // ✅ Map items and update user
    const formattedCart = cartData.map((item) => ({
      productId: item.productId,
      quantity: item.quantity || 1,
      shadeNumber: item.shadeNumber || "",
    }));

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          cartItems: formattedCart,
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
