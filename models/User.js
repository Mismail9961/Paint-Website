import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
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
  { minimize: false }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
