"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

const AllProducts = () => {
  const { products, setProducts, paintProducts, setPaintProducts } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Products", "ICI", "Dulux", "Brighto", "Diamond", "Gobis"];

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const [res1, res2] = await Promise.all([
          axios.get("/api/products/list"),
          axios.get("/api/paintProduct/list"),
        ]);
        const p1 = res1?.data?.success ? res1.data.data : [];
        const p2 = res2?.data?.success ? res2.data.data : [];
        setProducts(p1);
        setPaintProducts(p2);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [setProducts, setPaintProducts]);

  const allProducts = [...(products || []), ...(paintProducts || [])];

  const filteredProducts = (() => {
    if (activeCategory === "All") return allProducts;
    if (activeCategory === "Products") return products || [];
    return paintProducts.filter((p) => p.brandCategory === activeCategory);
  })();

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 pt-24 pb-16 bg-[#03045E]/5 min-h-screen">
      {/* Header */}
      <motion.div
        className="flex flex-col items-center text-center mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-[#03045E]">
          All <span className="text-[#FFD60A]">Products</span>
        </h1>
        <div className="w-24 h-1 bg-[#00B4D8] mt-2 rounded-full"></div>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300
              ${
                activeCategory === cat
                  ? "bg-[#FFD60A] text-[#03045E] shadow-md"
                  : "bg-[#00B4D8]/20 text-[#03045E] hover:bg-[#00B4D8]/30"
              }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-[#00B4D8]/80 animate-pulse mt-20">
          Loading products...
        </div>
      )}

      {/* Products Grid */}
      {!loading && filteredProducts.length > 0 ? (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </motion.div>
      ) : (
        !loading && (
          <div className="text-center text-[#00B4D8]/80 mt-10">
            No products available in this category.
          </div>
        )
      )}
    </div>
  );
};

export default AllProducts;
