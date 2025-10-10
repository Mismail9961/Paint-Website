import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Clerk ID
    name: String,
    email: String,
    imageUrl: { type: String, default: "" },

    cartItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PaintProduct",
          required: true,
        },
        quantity: { type: Number, default: 1 },
        shadeNumber: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
