import connectDB from "@/config/db";
import PaintProduct from "@/models/Paint"; // 👈 ensure model file exists
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const deletedPaint = await PaintProduct.findByIdAndDelete(id);

    if (!deletedPaint) {
      return NextResponse.json(
        { success: false, message: "Paint not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Paint deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting paint:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
