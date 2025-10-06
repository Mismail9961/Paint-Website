import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0, // avoid negative stock
    },
    images: {
      type: [String], // store image URLs (e.g. Cloudinary links)
      validate: [arr => arr.length === 1, "Exactly 1 image is required"],
      required: true,
    },
    createdBy: {
      type: String, // Clerk user ID
      required: true,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
