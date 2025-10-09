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
        toast.success("✅ Order placed successfully!");
        setCartItems({}); // frontend
        router.push("/orders");
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
    <div className="w-full md:w-96 bg-white p-5 rounded-2xl shadow-md">
      <h2 className="text-xl md:text-2xl font-semibold text-[#4364EE]">
        Order Summary
      </h2>
      <hr className="border-[#4364EE]/30 my-5" />

      {/* Address Selection */}
      <div>
        <label className="text-base font-medium uppercase text-[#4364EE] block mb-2">
          Select Address
        </label>
        <div className="relative inline-block w-full text-sm border border-[#4364EE]/40 rounded-md">
          <button
            className="peer w-full text-left px-4 pr-2 py-2 bg-white text-[#4364EE] focus:outline-none flex justify-between items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>
              {selectedAddress
                ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                : "Select Address"}
            </span>
            <svg
              className={`w-5 h-5 inline transition-transform duration-200 ${
                isDropdownOpen ? "rotate-0" : "-rotate-90"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#4364EE"
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
            <ul className="absolute w-full bg-white border border-[#4364EE]/40 shadow-md mt-1 z-10 py-1.5 rounded-md">
              {userAddresses.map((address, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-[#4364EE]/10 cursor-pointer text-[#4364EE]"
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
                className="px-4 py-2 hover:bg-[#4364EE]/10 cursor-pointer text-center font-medium text-[#4364EE]"
              >
                + Add New Address
              </li>
            </ul>
          )}
        </div>
      </div>

      <hr className="border-[#4364EE]/30 my-5" />

      {/* Summary */}
      <div className="space-y-4">
        <div className="flex justify-between text-base font-medium">
          <p className="uppercase text-[#4364EE]">
            Items {getCartCount()}
          </p>
          <p className="text-[#4364EE]">
            {currency}
            {getCartAmount()}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-[#4364EE]">Shipping Fee</p>
          <p className="font-medium text-[#4364EE]">Free</p>
        </div>
        <div className="flex justify-between">
          <p className="text-[#4364EE]">Tax (2%)</p>
          <p className="font-medium text-[#4364EE]">
            {currency}
            {Math.floor(getCartAmount() * 0.02)}
          </p>
        </div>
        <div className="flex justify-between text-lg md:text-xl font-semibold border-t border-[#4364EE]/30 pt-3">
          <p className="text-[#4364EE]">Total</p>
          <p className="text-[#4364EE]">
            {currency}
            {getCartAmount() + Math.floor(getCartAmount() * 0.02)}
          </p>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="mt-6 w-full bg-[#4364EE] hover:bg-[#324dd0] text-white py-3 rounded-xl font-semibold transition disabled:opacity-70"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default OrderSummary;
