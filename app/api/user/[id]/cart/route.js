import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";

export async function GET(req, context) {
  try {
    await connectDB();

    // ✅ Await params (fixes the error)
    const { id } = await context.params;

    const user = await User.findById(id).populate("cartItems.productId");
    if (!user) {
      return NextResponse.json({ cartCount: 0 });
    }

    const cartCount = user.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    return NextResponse.json({ cartCount });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ cartCount: 0 }, { status: 500 });
  }
}
