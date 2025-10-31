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

  // 🏠 Fetch user's saved addresses
  const fetchUserAddresses = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) {
        toast.error("You must be logged in to fetch addresses");
        return;
      }

      const res = await axios.get("/api/user/get-address", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;
      console.log("📍 Address API response:", data);

      if (data.success) {
        setUserAddresses(data.addresses);
        if (data.addresses.length === 0) {
          console.log("ℹ️ No addresses saved yet");
        }
      } else {
        toast.error(data.message || "Failed to fetch addresses");
      }
    } catch (error) {
      console.error("❌ Error fetching addresses:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🧭 Handle address selection
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  // 🧾 Create order
  const createOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address before placing an order");
      }

      const cartItemsArray = Object.entries(cartItems)
        .filter(([_, item]) => item && item.quantity > 0)
        .map(([product, item]) => ({
          product,
          quantity: item.quantity,
          shadeNumber: item.shadeNumber || "",
          quantityType: item.quantityType || "Gallon",
        }));

      if (cartItemsArray.length === 0) {
        return toast.error("Cart is empty");
      }

      const token = await getToken();
      if (!token) {
        return toast.error("You must be logged in to place an order");
      }

      console.log("📦 Creating order with full address:", selectedAddress);

      // Send the complete address object, not just the ID
      const addressData = {
        fullName: selectedAddress.fullName,
        phoneNumber: selectedAddress.phoneNumber,
        pinCode: selectedAddress.pinCode,
        area: selectedAddress.area,
        city: selectedAddress.city,
        state: selectedAddress.state,
        country: selectedAddress.country || "Pakistan",
      };

      const { data } = await axios.post(
        "/api/order/create",
        {
          address: addressData,
          items: cartItemsArray,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setCartItems({});
        router.push("/order-placed");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("❌ Order creation error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (user) fetchUserAddresses();
  }, [user]);

  return (
    <div className="w-full md:w-96 h-[45vh] bg-white p-5 rounded-2xl shadow-md border border-[#0A9396]/20">
      <h2 className="text-xl md:text-2xl font-semibold text-[#0A9396]">
        Order Summary
      </h2>
      <hr className="border-[#0A9396]/30 my-5" />

      <div className="space-y-6">
        {/* Address Dropdown */}
        <div>
          <label className="text-base font-medium uppercase text-[#0A9396] block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm border border-[#0A9396]/40 rounded-md">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-[#0A9396] focus:outline-none flex justify-between items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={loading}
            >
              <span>
                {loading ? (
                  "Loading addresses..."
                ) : selectedAddress ? (
                  `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                ) : userAddresses.length === 0 ? (
                  "No addresses - Click to add"
                ) : (
                  "Select Address"
                )}
              </span>
              <svg
                className={`w-5 h-5 inline transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#0A9396"
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
              <ul className="absolute w-full bg-white border border-[#0A9396]/40 shadow-md mt-1 z-10 py-1.5 rounded-md max-h-60 overflow-y-auto">
                {userAddresses.length === 0 ? (
                  <li className="px-4 py-3 text-center text-[#0A9396]/60 text-sm">
                    No addresses saved yet
                  </li>
                ) : (
                  userAddresses.map((address) => (
                    <li
                      key={address._id}
                      className="px-4 py-2 hover:bg-[#0A9396]/10 cursor-pointer text-[#0A9396]"
                      onClick={() => handleAddressSelect(address)}
                    >
                      {address.fullName}, {address.area}, {address.city},{" "}
                      {address.state}
                    </li>
                  ))
                )}
                <li
                  onClick={() => {
                    setIsDropdownOpen(false);
                    router.push("/add-address");
                  }}
                  className="px-4 py-2 hover:bg-[#0A9396]/10 cursor-pointer text-center font-medium text-[#0A9396] border-t border-[#0A9396]/20"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <hr className="border-[#0A9396]/30 my-5" />

        {/* Summary */}
        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-[#0A9396]">Items {getCartCount()}</p>
            <p className="text-[#0A9396]">
              {currency}
              {getCartAmount()}
            </p>
          </div>
          
          <div className="flex justify-between text-lg md:text-xl font-semibold border-t border-[#0A9396]/30 pt-3">
            <p className="text-[#0A9396]">Total</p>
            <p className="text-[#0A9396]">
              {currency}
              {getCartAmount()}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        className="w-full bg-[#0A9396] text-white py-3 mt-5 rounded-md shadow-md hover:bg-[#0A9396]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!selectedAddress}
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;