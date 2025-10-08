"use client";

import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

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
  } = useAppContext();

  const cartKeys = Object.keys(cartItems);

  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row gap-10 px-4 sm:px-6 md:px-16 lg:px-32 pt-14 mb-20">
        {/* Left Side - Cart Items */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Your <span className="text-[#FA7F2B]">Cart</span>
            </h2>
            <span className="text-sm sm:text-base md:text-lg text-gray-500/80">
              {getCartCount()} item(s)
            </span>
          </div>

          {/* Cart Items */}
          <div className="space-y-4">
            <AnimatePresence>
              {cartKeys.map((itemId) => {
                const cartItem = cartItems[itemId];
                if (!cartItem || cartItem.quantity <= 0) return null;

                const product =
                  products.find((p) => String(p._id) === String(itemId)) ||
                  paintProducts.find((p) => String(p._id) === String(itemId));

                if (!product) return null;

                const imageSrc =
                  product.images?.[0] || assets.placeholder_image;
                const title = product.title || "Unknown Product";
                const price = product.offerPrice || product.price || 0;
                const shadeNumber = cartItem.shadeNumber || "-";

                return (
                  <motion.div
                    key={itemId}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition p-4"
                  >
                    {/* Product Image */}
                    <div className="rounded-xl overflow-hidden bg-gray-50 p-2 flex-shrink-0 mx-auto sm:mx-0">
                      <Image
                        src={imageSrc}
                        alt={title}
                        className="w-24 h-24 sm:w-20 sm:h-20 object-cover"
                        width={96}
                        height={96}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <p className="font-semibold text-gray-800 text-base sm:text-lg">
                        {title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Price:{" "}
                        <span className="font-medium text-gray-700">
                          Rs. {price.toFixed(2)}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Shade:{" "}
                        <span className="font-medium text-gray-700">
                          {shadeNumber}
                        </span>
                      </p>

                      <button
                        className="text-xs text-red-500 mt-2 hover:underline"
                        onClick={() => removeFromCart(product._id)}
                      >
                        Remove
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex justify-center sm:justify-start items-center gap-2">
                      <button
                        onClick={() =>
                          updateCartQuantity(product._id, cartItem.quantity - 1)
                        }
                        className="p-2 rounded-md border border-gray-200 hover:bg-gray-100"
                      >
                        <Image
                          src={assets.decrease_arrow}
                          alt="decrease"
                          className="w-4 h-4"
                        />
                      </button>

                      <input
                        type="number"
                        value={cartItem.quantity}
                        onChange={(e) =>
                          updateCartQuantity(
                            product._id,
                            Number(e.target.value)
                          )
                        }
                        className="w-12 text-center border rounded-md py-1 text-sm"
                        min="1"
                      />

                      <button
                        onClick={() => addToCart(product._id)}
                        className="p-2 rounded-md border border-gray-200 hover:bg-gray-100"
                      >
                        <Image
                          src={assets.increase_arrow}
                          alt="increase"
                          className="w-4 h-4"
                        />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-gray-800 font-medium text-right w-full sm:w-24 mt-3 sm:mt-0">
                      Rs. {(price * cartItem.quantity).toFixed(2)}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Empty Cart Message */}
            {cartKeys.length === 0 && (
              <p className="text-center text-gray-500 mt-10">
                Your cart is empty 🛒
              </p>
            )}
          </div>

          {/* Continue Shopping */}
          <button
            onClick={() => router.push("/all-products")}
            className="group flex items-center mt-8 gap-2 text-[#FA7F2B] font-medium hover:underline mx-auto sm:mx-0"
          >
            <Image
              className="group-hover:-translate-x-1 transition"
              src={assets.arrow_right_icon_colored}
              alt="continue"
            />
            Continue Shopping
          </button>
        </div>

        {/* Right Side - Order Summary */}
        <div className="md:w-1/3 lg:w-1/4 sticky top-20 self-start">
          <OrderSummary accentColor="#4364EE" />
        </div>
      </div>
    </>
  );
};

export default Cart;
