import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";

// ✅ POST - Save or update cart
export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { cartData } = await request.json();

    if (!userId)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );

    if (!Array.isArray(cartData))
      return NextResponse.json(
        { success: false, message: "Invalid cart data" },
        { status: 400 }
      );

    await connectDB();

    const user = await User.findOne({ clerkId: userId });
    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );

    // ✅ Replace entire cart with new array
    user.cartItems = cartData.map((item) => ({
      productId: item.productId,
      quantity: item.quantity || 1,
      shadeNumber: item.shadeNumber || "",
    }));

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Cart updated successfully",
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
