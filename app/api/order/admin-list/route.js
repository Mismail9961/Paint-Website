import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import PaintOrder from "@/models/PaintOrder";

// ✅ Get all orders (Admin view)
export async function GET() {
  try {
    await connectDB();

    const orders = await PaintOrder.find()
      .populate({
        path: "items.paintProduct",
        model: "PaintProduct",
        select: "name price offerPrice images shadeNumber",
      })
      .populate({
        path: "items.product",
        model: "Product",
        select: "name price offerPrice image images picture imageUrl",
      })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("❌ Admin fetch all orders error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// ✅ Update order status (Admin)
export async function PATCH(request) {
  try {
    await connectDB();
    const { orderId, newStatus } = await request.json();

    if (!orderId || !newStatus) {
      return NextResponse.json(
        { success: false, message: "Order ID and status are required" },
        { status: 400 }
      );
    }

    const validStatuses = [
      "Order Placed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(newStatus)) {
      return NextResponse.json(
        { success: false, message: "Invalid order status" },
        { status: 400 }
      );
    }

    const updatedOrder = await PaintOrder.findByIdAndUpdate(
      orderId,
      { status: newStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("❌ Update order status error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// ✅ Delete an order (Admin)
export async function DELETE(request) {
  try {
    await connectDB();
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    const deletedOrder = await PaintOrder.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete order error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
