import mongoose from "mongoose";

const paintProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    images: {
      type: [String],
      validate: {
        validator: (arr) => arr.length === 2,
        message: "Exactly 2 paint images are required",
      },
      required: true,
    },
    category: {
      type: String,
      enum: ["gallon", "drum", "quarter"],
      required: true,
    },
    shadeCardImages: {
      type: [String],
      validate: {
        validator: (arr) => arr.length === 2,
        message: "Exactly 2 shade card images are required",
      },
      required: true,
    },
    createdBy: {
      type: String, // ✅ Clerk userId is a string
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const PaintProduct =
  mongoose.models.PaintProduct ||
  mongoose.model("PaintProduct", paintProductSchema);

export default PaintProduct;
