"use client";
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { currency, router } = useAppContext();

  if (!product) return null;

  const productImage =
    product.image?.[0] || product.images?.[0] || "/placeholder.png";

  const productName = product.name || product.title || "Unnamed Product";
  const productDescription = product.description || "No description available";
  const productPrice = product.offerPrice || product.price || "—";

  return (
    <motion.div
      onClick={() => {
        router.push(`/product/${product._id}`);
        scrollTo(0, 0);
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="flex flex-col items-start gap-2 max-w-[220px] sm:max-w-[240px] w-full cursor-pointer p-3 rounded-2xl 
                 bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-[#94D2BD]/40"
    >
      {/* Product Image */}
      <div className="relative bg-[#94D2BD]/20 rounded-xl w-full h-48 sm:h-52 flex items-center justify-center overflow-hidden">
        <Image
          src={productImage}
          alt={productName}
          className="object-cover w-4/5 h-4/5 sm:w-full sm:h-full rounded-lg group-hover:scale-105 transition-transform duration-300"
          width={800}
          height={800}
        />
        <button className="absolute top-2 right-2 bg-[#0A9396] p-2 rounded-full shadow-md hover:bg-[#94D2BD] transition">
          <Image
            className="h-3 w-3 invert"
            src={assets.heart_icon}
            alt="heart_icon"
          />
        </button>
      </div>

      {/* Product Info */}
      <p className="text-sm sm:text-base font-semibold pt-2 w-full truncate text-[#0A9396]">
        {productName}
      </p>
      <p className="w-full text-xs text-black/70 max-sm:line-clamp-2 truncate">
        {productDescription}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-1">
        <p className="text-xs text-[#0A9396]">4.5</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={index}
              className="h-3 w-3"
              src={
                index < Math.floor(4)
                  ? assets.star_icon
                  : assets.star_dull_icon
              }
              alt="star_icon"
            />
          ))}
        </div>
      </div>

      {/* Price + Buy Now */}
      <div className="flex items-center justify-between w-full mt-2">
        <p className="text-base font-semibold text-[#0A9396]">
          {currency}
          {productPrice}
        </p>
        <motion.button
          whileHover={{
            scale: 1.05,
            backgroundColor: "#0A9396",
            color: "white",
          }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 text-xs sm:text-sm text-[#0A9396] border border-[#0A9396] 
                     rounded-full hover:bg-[#94D2BD] hover:text-black transition font-medium"
        >
          Buy now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
