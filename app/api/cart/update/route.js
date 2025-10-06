import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";

// ✅ POST - Merge & update user cart
export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { cartData } = await request.json();

    if (!userId)
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    if (!cartData || typeof cartData !== "object")
      return NextResponse.json({ success: false, message: "Invalid cart data" }, { status: 400 });

    await connectDB();

    const user = await User.findOne({ clerkId: userId });
    if (!user)
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });

    // 🧠 Merge existing cart with new one
    const mergedCart = { ...(user.cartItems || {}) };
    for (const [id, qty] of Object.entries(cartData)) {
      if (qty > 0) mergedCart[id] = qty;
      else delete mergedCart[id];
    }

    user.cartItems = mergedCart;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Cart updated successfully",
      cartItems: mergedCart,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}