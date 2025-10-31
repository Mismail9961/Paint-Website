"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const AllProducts = () => {
  const { products, setProducts, paintProducts, setPaintProducts } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filtered by category first
  const categoryFiltered = (() => {
    if (activeCategory === "All") return allProducts;
    if (activeCategory === "Products") return products || [];
    return paintProducts.filter((p) => p.brandCategory === activeCategory);
  })();

  // Apply search filter
  const filteredProducts = categoryFiltered.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product?.name?.toLowerCase().includes(query) ||
      product?.brandCategory?.toLowerCase().includes(query) ||
      product?.description?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="px-3 sm:px-6 md:px-12 lg:px-24 pt-24 pb-16 bg-[#f9f9f9] min-h-screen">
      {/* Header */}
      <motion.div
        className="flex flex-col items-center text-center mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A9396]">
          All <span className="text-[#94D2BD]">Products</span>
        </h1>
        <div className="w-20 h-1 bg-[#94D2BD] mt-2 rounded-full"></div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="relative max-w-xl mx-auto mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Search className="absolute left-3 top-2.5 text-[#0A9396]/70 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for any product or brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#94D2BD]/50 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0A9396]/50 text-sm sm:text-base"
        />
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-300 shadow-sm
              ${
                activeCategory === cat
                  ? "bg-[#0A9396] text-white"
                  : "bg-[#94D2BD]/30 text-[#0A9396] hover:bg-[#94D2BD]/60"
              }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-[#0A9396]/80 animate-pulse mt-16 text-sm sm:text-base">
          Loading products...
        </div>
      )}

      {/* Products Grid */}
      {!loading && filteredProducts.length > 0 ? (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5"
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
          <div className="text-center text-[#0A9396]/70 mt-10 text-sm sm:text-base">
            No products found matching your search.
          </div>
        )
      )}
    </div>
  );
};

export default AllProducts;
