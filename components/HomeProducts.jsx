"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

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
      <div className="text-center py-20 text-gray-600">
        Loading products...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-20 text-gray-600">
        No products found.
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-gray-800">
          Featured Gobi's Paints
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-3 rounded"></div>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Discover Gobi's most popular paint finishes — crafted for beauty,
          protection, and long-lasting color in Pakistan's climate.
        </p>
      </div>

      {/* Paint Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 md:px-16">
        {products.map((paint) => (
          <div
            key={paint._id}
            onClick={() => router.push(`/product/${paint._id}`)} // ✅ navigate on click
            className="group bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden cursor-pointer"
          >
            <div className="relative w-full h-60 bg-gray-100 overflow-hidden">
              <Image
                src={paint.images?.[0] || "/no-image.jpg"}
                alt={paint.title}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800">
                {paint.title}
              </h3>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-2">
                {paint.description}
              </p>
              <div className="mt-3 mb-4">
                <p className="font-semibold text-blue-600">
                  {paint.price ? `${paint.price} PKR` : "Price not available"}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent parent div click
                  router.push(`/product/${paint._id}`);
                }}
                className="mt-4 bg-gradient-to-r from-blue-700 to-sky-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeProducts;
