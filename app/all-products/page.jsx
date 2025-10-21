"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";

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
        setProducts(res1.data || []);
        setPaintProducts(res2.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [setProducts, setPaintProducts]);

  const allProducts = [...(products || []), ...(paintProducts || [])];

  // Filter by category
  const filteredProducts = (() => {
    if (activeCategory === "All") {
      return allProducts;
    }
    if (activeCategory === "Normal Products") {
      return products || [];
    }
    // Filter by brand category (for paint products)
    return paintProducts.filter((p) => p.brandCategory === activeCategory);
  })();

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 pt-24 pb-16 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 min-h-screen">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-3xl font-semibold text-slate-800">
          All <span className="text-slate-500">Products</span>
        </h1>
        <div className="w-24 h-0.5 bg-slate-500 mt-2 rounded-full"></div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300
              ${
                activeCategory === cat
                  ? "bg-slate-700 text-white shadow-md"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-slate-500 animate-pulse mt-20">
          Loading products...
        </div>
      )}

      {/* Products Grid */}
      {!loading && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center text-slate-500 mt-10">
            No products available in this category.
          </div>
        )
      )}
    </div>
  );
};

export default AllProducts;