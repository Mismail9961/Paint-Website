import { v2 as cloudinary } from "cloudinary";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import PaintProduct from "@/models/Paint";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    // ✅ Clerk authentication
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const quantity = formData.get("quantity");
    const category = formData.get("category");

    const paintFiles = formData.getAll("images");
    const shadeFiles = formData.getAll("shadeCardImages");

    // ✅ Check required images
    if (!paintFiles || paintFiles.length !== 2) {
      return NextResponse.json(
        { error: "Exactly 2 paint images are required" },
        { status: 400 }
      );
    }
    if (!shadeFiles || shadeFiles.length !== 2) {
      return NextResponse.json(
        { error: "Exactly 2 shade card images are required" },
        { status: 400 }
      );
    }

    // ✅ Upload helper
    const uploadToCloudinary = async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });
    };

    // ✅ Upload all images
    const paintUploadResults = await Promise.all(
      paintFiles.map(uploadToCloudinary)
    );
    const shadeUploadResults = await Promise.all(
      shadeFiles.map(uploadToCloudinary)
    );

    await connectDB();

    // ✅ Save product
    const newPaintProduct = await PaintProduct.create({
      title,
      description,
      quantity: Number(quantity),
      images: paintUploadResults.map((r) => r.secure_url),
      category,
      shadeCardImages: shadeUploadResults.map((r) => r.secure_url),
      createdBy: String(userId), // ✅ Clerk userId stored as string
    });

    return NextResponse.json({
      success: true,
      message: "Paint product created successfully",
      data: newPaintProduct,
    });
  } catch (error) {
    console.error("❌ Error adding paint product:", error);
    return NextResponse.json(
      {
        error: "Something went wrong while creating product",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
