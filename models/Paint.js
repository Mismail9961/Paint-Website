import mongoose from "mongoose";

const paintProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },

    images: {
      type: [String],
      validate: {
        validator: (arr) => arr.length === 1,
        message: "Exactly 1 paint images are required",
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

    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },

    offerPrice: {
      type: Number,
      min: [0, "Offer price cannot be negative"],
      validate: {
        validator: function (value) {
          return value == null || value < this.price;
        },
        message: "Offer price must be less than the original price",
      },
    },

    createdBy: {
      type: String,
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
