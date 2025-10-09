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
    getCartAmount,
  } = useAppContext();

  const cartKeys = Object.keys(cartItems);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10 px-4 sm:px-6 md:px-16 lg:px-32 pt-14 mb-20">
        {/* Left Side - Cart Items */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Your <span className="text-[#4364EE]">Cart</span>
            </h2>
            <span className="text-gray-500">{getCartCount()} item(s)</span>
          </div>

          {cartKeys.length === 0 ? (
            <div className="text-center text-gray-500 py-16">
              🛒 Your cart is empty
            </div>
          ) : (
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
                      {/* Product Image */}
                      <Image
                        src={product.images?.[0] || assets.placeholder_image}
                        alt={product.title}
                        width={96}
                        height={96}
                        className="w-24 h-24 object-cover rounded-md"
                      />

                      {/* Product Info */}
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

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateCartQuantity(id, cartItem.quantity - 1)
                          }
                          className="p-2 border rounded-md text-gray-700 hover:bg-gray-100"
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
                          className="p-2 border rounded-md text-gray-700 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      {/* Total for Product */}
                      <div className="font-medium text-gray-800">
                        Rs. {(price * cartItem.quantity).toFixed(2)}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Right Side - Order Summary */}
        {cartKeys.length > 0 && (
          <div className="md:w-1/3 lg:w-1/4">
            <OrderSummary />
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
