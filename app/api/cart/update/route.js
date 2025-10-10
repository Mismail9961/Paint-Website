import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";

// ✅ Named export for POST method (NOT default export!)
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

    const body = await request.json();
    const { cartData = [], clearCart = false } = body;

    console.log("📥 Received cart update:", { userId, cartData, clearCart });

    // 🧹 Clear the cart
    if (clearCart) {
      await User.findOneAndUpdate(
        { _id: userId },
        { $set: { cartItems: [] } },
        { upsert: true, new: true }
      );
      return NextResponse.json({
        success: true,
        message: "Cart cleared successfully",
        cartItems: [],
      });
    }

    // 🚨 Validate and sanitize input
    const formattedCart = Array.isArray(cartData)
      ? cartData
          .filter((item) => {
            const isValid =
              item &&
              item.productId &&
              mongoose.Types.ObjectId.isValid(item.productId) &&
              item.quantity > 0;
            
            if (!isValid) {
              console.warn("❌ Invalid cart item:", item);
            }
            return isValid;
          })
          .map((item) => ({
            productId: new mongoose.Types.ObjectId(item.productId),
            quantity: parseInt(item.quantity, 10),
            shadeNumber: item.shadeNumber || "",
          }))
      : [];

    console.log("✅ Formatted cart:", formattedCart);

    // 🔥 REPLACE entire cart (don't merge)
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { cartItems: formattedCart } },
      { upsert: true, new: true }
    );

    // Convert ObjectIds to strings for response
    const responseCart = updatedUser.cartItems.map((item) => ({
      productId: item.productId.toString(),
      quantity: item.quantity,
      shadeNumber: item.shadeNumber || "",
    }));

    console.log("💾 Cart saved to database:", responseCart);

    return NextResponse.json({
      success: true,
      message: "Cart updated successfully",
      cartItems: responseCart,
    });
  } catch (error) {
    console.error("❌ Error updating cart:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}