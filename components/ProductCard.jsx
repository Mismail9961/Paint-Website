import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { currency, router } = useAppContext();

  if (!product) return null;

  const productImage =
    product.image?.[0] ||
    product.images?.[0] ||
    "/placeholder.png";

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
      className="flex flex-col items-start gap-1 max-w-[200px] w-full cursor-pointer"
    >
      {/* Product Image */}
      <div className="cursor-pointer group relative bg-[#03045E]/10 rounded-lg w-full h-52 flex items-center justify-center overflow-hidden shadow-md">
        <Image
          src={productImage}
          alt={productName}
          className="group-hover:scale-105 transition-transform duration-300 object-cover w-4/5 h-4/5 md:w-full md:h-full"
          width={800}
          height={800}
        />
        <button className="absolute top-2 right-2 bg-[#FFD60A] p-2 rounded-full shadow-md hover:bg-[#00B4D8] transition">
          <Image className="h-3 w-3" src={assets.heart_icon} alt="heart_icon" />
        </button>
      </div>

      {/* Product Info */}
      <p className="md:text-base font-medium pt-2 w-full truncate text-[#03045E]">
        {productName}
      </p>
      <p className="w-full text-xs text-[#00B4D8]/80 max-sm:hidden truncate">
        {productDescription}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <p className="text-xs text-[#03045E]">4.5</p>
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
      <div className="flex items-end justify-between w-full mt-1">
        <p className="text-base font-medium text-[#03045E]">
          {currency}
          {productPrice}
        </p>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#FFD60A", color: "#03045E" }}
          whileTap={{ scale: 0.95 }}
          className="max-sm:hidden px-4 py-1.5 text-[#00B4D8] border border-[#00B4D8] rounded-full text-xs hover:bg-[#03045E] hover:text-[#FFD60A] transition"
        >
          Buy now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
