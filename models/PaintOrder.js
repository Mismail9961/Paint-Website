import mongoose from "mongoose";

const PaintOrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    address: {
      fullName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      pinCode: { type: String, required: true },
      area: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },

    items: [
      {
        paintProduct: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PaintProduct",
          default: null,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          default: null,
        },
        shadeNumber: { type: String, trim: true, default: "" },
        quantityType: {
          type: String,
          enum: ["Drum", "Gallon", "Quarter"], // ✅ Added this
          required: false,
          default: "Gallon",
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
        offerPrice: { type: Number, default: 0, min: 0 },
      },
    ],

    amount: { type: Number, required: true, min: 0 },

    status: {
      type: String,
      enum: ["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Order Placed",
    },

    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const PaintOrder =
  mongoose.models.PaintOrder || mongoose.model("PaintOrder", PaintOrderSchema);

export default PaintOrder;
