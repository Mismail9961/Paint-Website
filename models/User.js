import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Clerk user ID
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: false, default: "" }, // fallback if Clerk didn’t send
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