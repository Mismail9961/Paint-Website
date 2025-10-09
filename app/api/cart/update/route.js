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

    // ✅ If clearCart = true → empty the cart
    if (clearCart) {
      await User.findByIdAndUpdate(
        userId,
        { $set: { cartItems: [] } },
        { new: true, upsert: true }
      );
      return NextResponse.json({
        success: true,
        message: "Cart cleared successfully",
      });
    }

    // ✅ Validate cartData
    if (!Array.isArray(cartData)) {
      return NextResponse.json(
        { success: false, message: "Invalid cart data format" },
        { status: 400 }
      );
    }

    // ✅ Update or create user cart
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          cartItems: cartData.map((item) => ({
            productId: item.productId,
            quantity: item.quantity || 1,
            shadeNumber: item.shadeNumber || "",
          })),
        },
      },
      { new: true, upsert: true } // ensures user doc is created if not exists
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
