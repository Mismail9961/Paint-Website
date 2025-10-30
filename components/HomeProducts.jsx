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
      <div className="text-center py-20 text-[#0A9396] font-semibold">
        Loading products...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-20 text-[#0A9396] font-semibold">
        No products found.
      </div>
    );
  }

  return (
    <section className="py-20">
      {/* Header */}
      <div className="text-center mb-14 px-4 sm:px-6">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text 
  bg-gradient-to-r from-white via-[#94D2BD] to-[#0A9396]"
        >
          Featured Products
        </h2>
      </div>

      {/* Paint Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8 px-4 sm:px-10 lg:px-16">
        {products.map((paint) => (
          <motion.div
            key={paint._id}
            onClick={() => router.push(`/product/${paint._id}`)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group bg-white border border-[#94D2BD]/50 rounded-2xl shadow-md hover:shadow-lg overflow-hidden cursor-pointer transition-all"
          >
            {/* Image */}
            <div className="relative w-full h-48 sm:h-56 bg-[#94D2BD]/10 overflow-hidden">
              <Image
                src={paint.images?.[0] || "/no-image.jpg"}
                alt={paint.title}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5">
              <h3 className="text-base sm:text-lg font-semibold text-[#0A9396] truncate">
                {paint.title}
              </h3>
              <p className="text-xs sm:text-sm text-black/70 mt-1 line-clamp-2 max-sm:hidden">
                {paint.description}
              </p>

              <div className="mt-3">
                <p className="font-semibold text-[#0A9396]">
                  {paint.price ? `${paint.price} PKR` : "Price not available"}
                </p>
              </div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#94D2BD",
                  color: "#000000",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/product/${paint._id}`);
                }}
                className="mt-4 w-full bg-[#0A9396] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md"
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
