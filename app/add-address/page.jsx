"use client";
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const AddAddress = () => {
  const { getToken, router } = useAppContext();

  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    pinCode: "",
    area: "",
    city: "",
    state: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      if (!token) {
        toast.error("Not authenticated");
        return;
      }

      const { data } = await axios.post(
        "/api/user/add-address",
        { address },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        router.push("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4 sm:px-8 md:px-16 py-16">
        {/* Animated Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-6xl rounded-2xl shadow-xl bg-neutral-50/90 backdrop-blur-md p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-10 md:gap-12 border border-slate-200"
        >
          {/* Form Section */}
          <motion.form
            onSubmit={onSubmitHandler}
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Add <span className="text-slate-600">Shipping Address</span>
            </h2>
            <p className="text-slate-500 text-sm">
              Please fill out the form below to save your delivery details.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {[
                { id: "fullName", label: "Full name", value: address.fullName },
                {
                  id: "phoneNumber",
                  label: "Phone number",
                  value: address.phoneNumber,
                },
                { id: "pinCode", label: "Pin code", value: address.pinCode },
                { id: "city", label: "City/District/Town", value: address.city },
              ].map((field) => (
                <div className="relative" key={field.id}>
                  <input
                    type="text"
                    id={field.id}
                    value={field.value}
                    onChange={(e) =>
                      setAddress({ ...address, [field.id]: e.target.value })
                    }
                    className="peer w-full border border-slate-300 rounded-xl px-3 pt-5 pb-2 text-slate-700 placeholder-transparent focus:border-slate-600 focus:ring-1 focus:ring-slate-600 outline-none text-sm sm:text-base"
                    placeholder={field.label}
                  />
                  <label
                    htmlFor={field.id}
                    className="absolute left-3 top-2 text-slate-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-slate-500 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-slate-700"
                  >
                    {field.label}
                  </label>
                </div>
              ))}
            </div>

            {/* State */}
            <div className="relative">
              <input
                type="text"
                id="state"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                className="peer w-full border border-slate-300 rounded-xl px-3 pt-5 pb-2 text-slate-700 placeholder-transparent focus:border-slate-600 focus:ring-1 focus:ring-slate-600 outline-none text-sm sm:text-base"
                placeholder="State"
              />
              <label
                htmlFor="state"
                className="absolute left-3 top-2 text-slate-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-slate-500 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-slate-700"
              >
                State
              </label>
            </div>

            {/* Area */}
            <div className="relative">
              <textarea
                id="area"
                rows={4}
                value={address.area}
                onChange={(e) =>
                  setAddress({ ...address, area: e.target.value })
                }
                className="peer w-full border border-slate-300 rounded-xl px-3 pt-5 pb-2 text-slate-700 placeholder-transparent focus:border-slate-600 focus:ring-1 focus:ring-slate-600 outline-none resize-none text-sm sm:text-base"
                placeholder="Area"
              ></textarea>
              <label
                htmlFor="area"
                className="absolute left-3 top-2 text-slate-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-slate-500 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-slate-700"
              >
                Address (Area & Street)
              </label>
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-slate-700 text-white rounded-xl font-semibold tracking-wide hover:bg-slate-800 transition text-sm sm:text-base"
            >
              Save Address
            </motion.button>
          </motion.form>

          {/* Side Illustration */}
          <motion.div
            className="flex-1 flex items-center justify-center md:justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Image
              src={assets.my_location_image}
              alt="Location Illustration"
              className="w-56 sm:w-72 md:w-80 h-auto drop-shadow-xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default AddAddress;
