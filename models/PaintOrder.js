import mongoose from "mongoose";

const PaintOrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // Clerk user ID
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
          required: true,
        },
        shadeNumber: {
          type: String,
          required: true,
          trim: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        offerPrice: {
          type: Number,
          min: 0,
        },
      },
    ],

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// ✅ Index for faster user & date lookups
PaintOrderSchema.index({ userId: 1, date: -1 });

const PaintOrder =
  mongoose.models.PaintOrder ||
  mongoose.model("PaintOrder", PaintOrderSchema);

export default PaintOrder;
