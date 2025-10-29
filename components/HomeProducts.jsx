"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const HomeProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const [res1, res2] = await Promise.all([
          axios.get("/api/products/list"),
          axios.get("/api/paintProduct/list"),
        ]);

        if (res1.data?.success && res2.data?.success) {
          const combined = [...res1.data.data, ...res2.data.data];
          setProducts(combined);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-[#03045E] font-semibold">
        Loading products...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-20 text-[#03045E] font-semibold">
        No products found.
      </div>
    );
  }

  return (
    <section className="py-20 ">
      {/* Header */}
      <div className="text-center mb-14 px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#03045E]">
          Featured Gobi&apos;s Paints
        </h2>
        <div className="w-20 h-1 bg-[#FFD60A] mx-auto mt-3 rounded"></div>
        <p className="text-white mt-4 max-w-xl mx-auto text-sm sm:text-base">
          Discover Gobi&apos;s most popular paint finishes — crafted for beauty, protection, 
          and long-lasting color in Pakistan&apos;s climate.
        </p>
      </div>

      {/* Paint Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-16">
        {products.map((paint) => (
          <motion.div
            key={paint._id}
            onClick={() => router.push(`/product/${paint._id}`)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group bg-white border border-[#00B4D8]/30 rounded-2xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition-all"
          >
            <div className="relative w-full h-52 sm:h-60 bg-[#03045E]/5 overflow-hidden">
              <Image
                src={paint.images?.[0] || "/no-image.jpg"}
                alt={paint.title}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-semibold text-[#03045E] truncate">
                {paint.title}
              </h3>
              <p className="text-xs sm:text-sm text-black mt-1 line-clamp-2 max-sm:hidden">
                {paint.description}
              </p>
              <div className="mt-2 sm:mt-3">
                <p className="font-semibold text-[#03045E]">
                  {paint.price ? `${paint.price} PKR` : "Price not available"}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#FFD60A", color: "#03045E" }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/product/${paint._id}`);
                }}
                className="mt-3 sm:mt-4 w-full sm:w-auto bg-[#03045E] text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-md"
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HomeProducts;
