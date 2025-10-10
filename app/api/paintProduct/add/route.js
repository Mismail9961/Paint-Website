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
    // Clerk authentication
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const quantity = formData.get("quantity");
    const category = formData.get("category");
    const price = formData.get("price");
    const offerPrice = formData.get("offerPrice");

    const paintFiles = formData.getAll("images");
    const shadeFiles = formData.getAll("shadeCardImages");

    // Validate required fields
    if (!title || !description || !quantity || !category || !price) {
      return NextResponse.json(
        {
          error:
            "All fields (title, description, quantity, category, and price) are required.",
        },
        { status: 400 }
      );
    }

    // Validate image counts
    if (!paintFiles || paintFiles.length !== 2) {
      return NextResponse.json(
        { error: "Exactly 2 paint images are required." },
        { status: 400 }
      );
    }

    if (!shadeFiles || shadeFiles.length !== 2) {
      return NextResponse.json(
        { error: "Exactly 2 shade card images are required." },
        { status: 400 }
      );
    }

    // Convert numeric values
    const numericQuantity = Number(quantity);
    const numericPrice = Number(price);
    const numericOfferPrice = offerPrice ? Number(offerPrice) : null;

    // Validate numeric values
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return NextResponse.json(
        { error: "Price must be a positive number." },
        { status: 400 }
      );
    }

    if (numericOfferPrice && numericOfferPrice >= numericPrice) {
      return NextResponse.json(
        { error: "Offer price must be less than the original price." },
        { status: 400 }
      );
    }

    // Helper to upload image to Cloudinary
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

    // Upload paint and shade images
    const paintUploadResults = await Promise.all(
      paintFiles.map(uploadToCloudinary)
    );

    const shadeUploadResults = await Promise.all(
      shadeFiles.map(uploadToCloudinary)
    );

    await connectDB();

    // Save paint product in database
    const newPaintProduct = await PaintProduct.create({
      title,
      description,
      quantity: numericQuantity,
      price: numericPrice,
      offerPrice: numericOfferPrice,
      category,
      images: paintUploadResults.map((r) => r.secure_url),
      shadeCardImages: shadeUploadResults.map((r) => r.secure_url),
      createdBy: String(userId),
    });

    return NextResponse.json({
      success: true,
      message: "Paint product created successfully.",
      data: newPaintProduct,
    });
  } catch (error) {
    console.error("Error adding paint product:", error);
    return NextResponse.json(
      {
        error: "Something went wrong while creating the paint product.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
