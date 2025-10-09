import mongoose from "mongoose";

const ProductOrderSchema = new mongoose.Schema(
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
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
      },
    ],
    amount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

ProductOrderSchema.index({ userId: 1, date: -1 });

const ProductOrder =
  mongoose.models.ProductOrder ||
  mongoose.model("ProductOrder", ProductOrderSchema);

export default ProductOrder;
