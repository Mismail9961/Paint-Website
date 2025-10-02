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
      validate: [arr => arr.length === 1, "Exactly 2 images are required"],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, // admin who added the product
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
