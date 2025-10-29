"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import axios from "axios";

const Cart = () => {
  const {
    products,
    paintProducts,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    removeFromCart,
    setCartItems,
  } = useAppContext();

  const cartKeys = Object.keys(cartItems);
  const cartIsEmpty = cartKeys.length === 0;

  const handleClearCart = async () => {
    try {
      await axios.post("/api/cart/update", { clearCart: true });
      setCartItems({});
      toast.success("Cart cleared successfully!");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const res = await axios.post("/api/cart/delete", { productId });
      if (res.data.success) {
        removeFromCart(productId);
        toast.success("Item removed from cart");
      } else {
        toast.error(res.data.message || "Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 sm:px-8 md:px-16 lg:px-32 pt-16 pb-20 bg-[#03045E]/5 min-h-screen">
      {/* LEFT SIDE */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 border-b border-[#00B4D8]/40 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#03045E]">
            Your <span className="text-[#00B4D8]">Cart</span>
          </h2>
          <span className="text-[#03045E]/70 text-sm sm:text-base mt-1 sm:mt-0">
            {getCartCount()} item(s)
          </span>
        </div>

        {cartIsEmpty ? (
          <div className="text-center text-[#03045E]/60 py-16 text-base sm:text-lg">
            🛒 Your cart is empty
          </div>
        ) : (
          <>
            <button
              onClick={handleClearCart}
              className="mb-4 text-sm text-[#FFD60A] hover:text-[#FFC800] hover:underline"
            >
              Clear Cart
            </button>

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
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 rounded-2xl border border-[#00B4D8]/30 bg-[#FFD60A]/10 shadow-sm p-4 hover:shadow-md transition-all"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 sm:w-28 sm:h-28 group flex-shrink-0">
                        <Image
                          src={product.images?.[0] || assets.placeholder_image}
                          alt={product.title}
                          fill
                          className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 text-center sm:text-left space-y-1">
                        <p className="font-semibold text-[#03045E] text-base sm:text-lg leading-tight">
                          {product.title}
                        </p>
                        <p className="text-sm text-[#03045E]/70">
                          Shade: <span className="font-medium">{shade}</span>
                        </p>
                        <p className="text-sm text-[#03045E]/70">
                          Price: Rs. {price.toFixed(2)}
                        </p>

                        <button
                          className="text-xs text-red-500 hover:text-red-600 mt-2"
                          onClick={() => handleRemoveItem(product._id)}
                        >
                          Remove
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            updateCartQuantity(id, cartItem.quantity - 1)
                          }
                          className="p-2 border border-[#00B4D8]/50 rounded-md text-[#03045E] hover:bg-[#00B4D8]/10 transition"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={cartItem.quantity}
                          onChange={(e) =>
                            updateCartQuantity(id, Number(e.target.value))
                          }
                          className="w-10 sm:w-12 text-center border border-[#00B4D8]/50 rounded-md text-sm text-[#03045E] bg-white"
                        />
                        <button
                          onClick={() => addToCart(id)}
                          className="p-2 border border-[#00B4D8]/50 rounded-md text-[#03045E] hover:bg-[#00B4D8]/10 transition"
                        >
                          +
                        </button>
                      </div>

                      {/* Total */}
                      <div className="font-medium text-[#03045E] text-sm sm:text-base text-center sm:text-right">
                        Rs. {(price * cartItem.quantity).toFixed(2)}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      {/* RIGHT SIDE */}
      {!cartIsEmpty && <OrderSummary />}
    </div>
  );
};

export default Cart;
