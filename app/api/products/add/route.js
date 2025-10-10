import { v2 as cloudinary } from "cloudinary";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";

// Cloudinary configuration
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
    const price = formData.get("price");
    const offerPrice = formData.get("offerPrice");
    const imageFiles = formData.getAll("images");

    // Validate required fields
    if (!title || !description || !quantity || !price) {
      return NextResponse.json(
        { error: "All fields (title, description, quantity, and price) are required" },
        { status: 400 }
      );
    }

    // Validate image count
    if (!imageFiles || imageFiles.length !== 1) {
      return NextResponse.json(
        { error: "Exactly one image is required" },
        { status: 400 }
      );
    }

    // Convert numeric values
    const numericQuantity = Number(quantity);
    const numericPrice = Number(price);
    const numericOfferPrice = offerPrice ? Number(offerPrice) : null;

    // Validate price
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return NextResponse.json(
        { error: "Price must be a positive number" },
        { status: 400 }
      );
    }

    if (numericOfferPrice && numericOfferPrice >= numericPrice) {
      return NextResponse.json(
        { error: "Offer price must be less than the original price" },
        { status: 400 }
      );
    }

    // Helper: upload image to Cloudinary
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

    // Upload images
    const uploadResults = await Promise.all(imageFiles.map(uploadToCloudinary));

    await connectDB();

    // Save product to database
    const newProduct = await Product.create({
      title,
      description,
      quantity: numericQuantity,
      price: numericPrice,
      offerPrice: numericOfferPrice,
      images: uploadResults.map((r) => r.secure_url),
      createdBy: userId,
    });

    return NextResponse.json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      {
        error: "Something went wrong while creating product",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
