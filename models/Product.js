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
      min: 0,
    },
    images: {
      type: [String],
      validate: [
        (arr) => arr.length === 1,
        "Exactly 1 image is required",
      ],
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
          // Only validate if offerPrice is provided
          return value == null || value < this.price;
        },
        message: "Offer price must be less than the original price",
      },
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
