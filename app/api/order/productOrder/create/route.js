import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";
import PaintOrder from "@/models/PaintOrder";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId)
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const { address, items } = await request.json();
    console.log("📦 Order Request Received:", { address, items });

    if (!address || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Missing order data" },
        { status: 400 }
      );
    }

    await connectDB();

    // 🧩 Fetch product details
    const productIds = items.map((i) => i.product);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid products found" },
        { status: 400 }
      );
    }

    // 💰 Calculate total
    let totalAmount = 0;
    const orderItems = items
      .map((item) => {
        const product = products.find(
          (p) => String(p._id) === String(item.product)
        );
        if (!product) return null;

        const price = product.offerPrice || product.price;
        totalAmount += price * item.quantity;

        return {
          paintProduct: product._id, // ✅ save in PaintOrder format
          shadeNumber: item.shadeNumber || "N/A",
          quantity: item.quantity,
          price,
          offerPrice: product.offerPrice || product.price,
        };
      })
      .filter(Boolean);

    if (orderItems.length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid items found" },
        { status: 400 }
      );
    }

    // 🏦 Create order (always in PaintOrder)
    const newOrder = await PaintOrder.create({
      userId,
      address,
      items: orderItems,
      amount: totalAmount,
      status: "Order Placed",
      date: new Date(),
    });

    console.log("✅ PaintOrder Created:", newOrder._id);

    return NextResponse.json({
      success: true,
      message: "Order placed successfully (saved in PaintOrders)",
      order: newOrder,
    });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
