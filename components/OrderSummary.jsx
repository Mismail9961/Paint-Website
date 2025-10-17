"use client";

import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OrderSummary = () => {
  const {
    currency,
    router,
    getCartCount,
    getCartAmount,
    getToken,
    user,
    setCartItems,
    cartItems,
  } = useAppContext();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserAddresses = async () => {
    try {
      const token = await getToken();
      if (!token) return toast.error("You must be logged in to fetch addresses");

      const res = await axios.get("/api/user/get-address", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setUserAddresses(res.data.addresses);
        setSelectedAddress(res.data.addresses[0] || null);
      } else {
        toast.error(res.data.message || "Failed to fetch addresses");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) fetchUserAddresses();
  }, [user]);

  const handlePlaceOrder = async () => {
    try {
      if (!user) {
        toast.error("Please log in first!");
        return router.push("/sign-in");
      }

      if (!selectedAddress) {
        toast.error("Please select a delivery address");
        return;
      }

      const itemsArray = Object.entries(cartItems).map(([id, item]) => ({
        product: id,
        quantity: item.quantity,
        shadeNumber: item.shadeNumber || "",
      }));

      if (itemsArray.length === 0) {
        toast.error("Your cart is empty.");
        return;
      }

      setLoading(true);
      const token = await getToken();

      const res = await axios.post(
        "/api/order/create",
        { address: selectedAddress, items: itemsArray },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Order placed successfully!");
        try {
          await axios.post(
            "/api/cart/update",
            { clearCart: true },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (err) {
          console.warn("Cart clearing on backend failed:", err.message);
        }

        setCartItems({});
        router.push("/my-orders");
      } else {
        toast.error(res.data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while placing the order."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!Object.keys(cartItems).length) return null;

  return (
    <div className="w-full md:w-80 h-[32%] bg-white border border-slate-200 p-3 sm:p-4 rounded-xl shadow-sm mx-auto max-w-[95vw] sm:max-w-none">
      <h2 className="text-lg md:text-xl font-semibold text-slate-800 text-center sm:text-left">
        Order Summary
      </h2>
      <hr className="border-slate-200 my-3 sm:my-4" />

      {/* Address Selection */}
      <div>
        <label className="text-xs sm:text-sm font-medium uppercase text-slate-700 block mb-2">
          Select Address
        </label>
        <div className="relative inline-block w-full text-xs sm:text-sm border border-slate-300 rounded-md">
          <button
            className="peer w-full text-left px-3 sm:px-4 pr-2 py-1.5 bg-white text-slate-700 focus:outline-none flex justify-between items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="truncate">
              {selectedAddress
                ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                : "Select Address"}
            </span>
            <svg
              className={`w-4 h-4 inline transition-transform duration-200 ${
                isDropdownOpen ? "rotate-0" : "-rotate-90"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <ul className="absolute w-full bg-white border border-slate-300 shadow-lg mt-1 z-10 py-1 rounded-md max-h-36 overflow-y-auto">
              {userAddresses.map((address, index) => (
                <li
                  key={index}
                  className="px-3 sm:px-4 py-1.5 hover:bg-slate-100 cursor-pointer text-slate-700 text-xs sm:text-sm"
                  onClick={() => {
                    setSelectedAddress(address);
                    setIsDropdownOpen(false);
                  }}
                >
                  {address.fullName}, {address.area}, {address.city},{" "}
                  {address.state}
                </li>
              ))}
              <li
                onClick={() => router.push("/add-address")}
                className="px-3 sm:px-4 py-1.5 hover:bg-slate-100 cursor-pointer text-center font-medium text-slate-700 text-xs sm:text-sm"
              >
                + Add New Address
              </li>
            </ul>
          )}
        </div>
      </div>

      <hr className="border-slate-200 my-3 sm:my-4" />

      {/* Summary */}
      <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
        <div className="flex justify-between font-medium">
          <p className="uppercase text-slate-700">
            Items {getCartCount()}
          </p>
          <p className="text-slate-700">
            {currency}
            {getCartAmount()}
          </p>
        </div>
        <div className="flex justify-between text-slate-600">
          <p>Shipping</p>
          <p className="font-medium text-slate-700">Free</p>
        </div>
        <div className="flex justify-between text-slate-600">
          <p>Tax (2%)</p>
          <p className="font-medium text-slate-700">
            {currency}
            {Math.floor(getCartAmount() * 0.02)}
          </p>
        </div>
        <div className="flex justify-between text-base sm:text-lg font-semibold border-t border-slate-200 pt-2 text-slate-800">
          <p>Total</p>
          <p>
            {currency}
            {getCartAmount() + Math.floor(getCartAmount() * 0.02)}
          </p>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="mt-3 sm:mt-4 w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-70 text-sm sm:text-base"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default OrderSummary;
