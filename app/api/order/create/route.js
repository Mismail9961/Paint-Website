import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";
import PaintProduct from "@/models/Paint";
import User from "@/models/User";
import PaintOrder from "@/models/PaintOrder";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );

    const { address, items } = await request.json();
    if (!address || !Array.isArray(items) || items.length === 0)
      return NextResponse.json(
        { success: false, message: "Missing order data" },
        { status: 400 }
      );

    await connectDB();

    const productIds = items.map((i) => i.product);
    const [normalProducts, paintProducts] = await Promise.all([
      Product.find({ _id: { $in: productIds } }),
      PaintProduct.find({ _id: { $in: productIds } }),
    ]);

    const allProducts = [...normalProducts, ...paintProducts];

    let totalAmount = 0;
    const orderItems = items
      .map((item) => {
        const product = allProducts.find(
          (p) => String(p._id) === String(item.product)
        );
        if (!product) return null;

        const price = product.offerPrice || product.price || 0;
        totalAmount += price * item.quantity;

        return {
          paintProduct: product._id,
          shadeNumber: item.shadeNumber || "N/A",
          quantity: item.quantity,
          price,
          offerPrice: product.offerPrice || 0,
        };
      })
      .filter(Boolean);

    if (orderItems.length === 0)
      return NextResponse.json(
        { success: false, message: "No valid items found" },
        { status: 400 }
      );

    // ✅ Create order
    const newOrder = await PaintOrder.create({
      userId,
      address,
      items: orderItems,
      amount: totalAmount,
      status: "Order Placed",
      date: new Date(),
    });

    // ✅ Clear user's cart automatically
    await User.updateOne({ userId }, { $set: { cartItems: [] } });

    console.log("✅ Order saved:", newOrder._id);

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
