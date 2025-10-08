import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";
import PaintProduct from "@/models/Paint"; // ✅ correct import path
import Address from "@/models/Address";
import User from "@/models/User";
import PaintOrder from "@/models/PaintOrder"; // ✅ new paint order model
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
    console.log("📦 Received order data:", { address, items });

    if (!address || !Array.isArray(items) || items.length === 0)
      return NextResponse.json(
        { success: false, message: "Missing order data" },
        { status: 400 }
      );

    await connectDB();

    // 🧩 Identify which are paint products
    const productIds = items.map((i) => i.product);
    const [normalProducts, paintProducts] = await Promise.all([
      Product.find({ _id: { $in: productIds } }),
      PaintProduct.find({ _id: { $in: productIds } }),
    ]);

    const allProducts = [...normalProducts, ...paintProducts];

    // 🧾 Calculate total and prepare items array
    let totalAmount = 0;
    const orderItems = items
      .map((item) => {
        const product = allProducts.find(
          (p) => String(p._id) === String(item.product)
        );
        if (!product) return null;

        const price = product.offerPrice || product.price || 0;
        totalAmount += price * item.quantity;

        // ✅ Detect if this is a paint product and map correctly
        if (paintProducts.some((p) => String(p._id) === String(item.product))) {
          return {
            paintProduct: product._id,
            shadeNumber: item.shadeNumber || "N/A",
            quantity: item.quantity,
            price,
            offerPrice: product.offerPrice || 0,
          };
        } else {
          // Normal product (fallback)
          return {
            paintProduct: product._id,
            shadeNumber: "N/A",
            quantity: item.quantity,
            price,
            offerPrice: product.offerPrice || 0,
          };
        }
      })
      .filter(Boolean);

    if (orderItems.length === 0)
      return NextResponse.json(
        { success: false, message: "No valid items found" },
        { status: 400 }
      );

    // 🏦 Create PaintOrder
    const newOrder = await PaintOrder.create({
      userId,
      address,
      items: orderItems,
      amount: totalAmount,
      status: "Order Placed",
      date: new Date(),
    });

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
