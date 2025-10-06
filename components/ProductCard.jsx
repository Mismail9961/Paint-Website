import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, router } = useAppContext();

  if (!product) return null; // ✅ avoid crashes

  // ✅ Handle both "image" and "images" arrays gracefully
  const productImage =
    product.image?.[0] ||
    product.images?.[0] ||
    "/placeholder.png"; // fallback image

  const productName = product.name || product.title || "Unnamed Product";
  const productDescription = product.description || "No description available";
  const productPrice = product.offerPrice || product.price || "—";

  return (
    <div
      onClick={() => {
        router.push(`/product/${product._id}`);
        scrollTo(0, 0);
      }}
      className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
    >
      {/* Product Image */}
      <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center overflow-hidden">
        <Image
          src={productImage}
          alt={productName}
          className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
          width={800}
          height={800}
        />
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
          <Image
            className="h-3 w-3"
            src={assets.heart_icon}
            alt="heart_icon"
          />
        </button>
      </div>

      {/* Product Info */}
      <p className="md:text-base font-medium pt-2 w-full truncate">
        {productName}
      </p>
      <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">
        {productDescription}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <p className="text-xs">4.5</p>
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
        <p className="text-base font-medium">
          {currency}
          {productPrice}
        </p>
        <button className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
