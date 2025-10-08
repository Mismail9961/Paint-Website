"use client";

import React, { useState } from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";

const Cart = () => {
  const {
    products,
    paintProducts,
    router,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    removeFromCart,
    getCartAmount,
    user,
  } = useAppContext();

  const [loading, setLoading] = useState(false);
  const cartKeys = Object.keys(cartItems);

  const handlePlaceOrder = async () => {
    try {
      if (!user) {
        toast.error("Please log in first!");
        return router.push("/sign-in");
      }

      const itemsArray = Object.entries(cartItems).map(([id, item]) => ({
        product: id,
        quantity: item.quantity,
        shadeNumber: item.shadeNumber || "",
      }));

      if (itemsArray.length === 0) return toast.error("Your cart is empty.");

      setLoading(true);

      const dummyAddress = {
        fullName: "John Doe",
        phoneNumber: "03001234567",
        pinCode: "12345",
        area: "Gulshan Block 5",
        city: "Karachi",
        state: "Sindh",
      };

      const res = await axios.post("/api/order/create", {
        address: dummyAddress,
        items: itemsArray,
      });

      if (res.data.success) {
        toast.success("✅ Order placed successfully!");
        router.push("/orders");
      } else {
        toast.error(res.data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error("Something went wrong while placing the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10 px-4 sm:px-6 md:px-16 lg:px-32 pt-14 mb-20">
        {/* Left Side */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Your <span className="text-[#FA7F2B]">Cart</span>
            </h2>
            <span className="text-gray-500">{getCartCount()} item(s)</span>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {cartKeys.map((id) => {
                const cartItem = cartItems[id];
                if (!cartItem || cartItem.quantity <= 0) return null;

                const product =
                  products.find((p) => String(p._id) === id) ||
                  paintProducts.find((p) => String(p._id) === id);

                if (!product) return null;

                const price = product.offerPrice || product.price || 0;
                const shade = cartItem.shadeNumber || "-";

                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-gray-200 bg-white shadow-sm p-4"
                  >
                    <Image
                      src={product.images?.[0] || assets.placeholder_image}
                      alt={product.title}
                      width={96}
                      height={96}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <p className="font-semibold text-gray-800 text-lg">
                        {product.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        Shade: <span className="font-medium">{shade}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: Rs. {price.toFixed(2)}
                      </p>
                      <button
                        className="text-xs text-red-500 mt-2 hover:underline"
                        onClick={() => removeFromCart(product._id)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQuantity(id, cartItem.quantity - 1)}
                        className="p-2 border rounded-md"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={cartItem.quantity}
                        min="1"
                        onChange={(e) =>
                          updateCartQuantity(id, Number(e.target.value))
                        }
                        className="w-12 text-center border rounded-md"
                      />
                      <button
                        onClick={() => addToCart(id)}
                        className="p-2 border rounded-md"
                      >
                        +
                      </button>
                    </div>
                    <div className="font-medium text-gray-800">
                      Rs. {(price * cartItem.quantity).toFixed(2)}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/3 lg:w-1/4">
          <OrderSummary accentColor="#4364EE" />
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className={`mt-6 w-full py-3 rounded-xl font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#4364EE] hover:bg-[#3655c8] text-white"
            }`}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
