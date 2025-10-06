import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {
  const { products, paintProducts, router } = useAppContext();

  // Combine both arrays safely
  const allProducts = [
    ...(products || []),
    ...(paintProducts || []),
  ];

  return (
    <div className="flex flex-col items-start pt-14 px-4 sm:px-6 md:px-16 lg:px-32">
      <p className="text-2xl font-medium mb-6 text-gray-800">All Products</p>

      {allProducts.length === 0 ? (
        <p className="text-gray-500 text-sm">No products available.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full pb-14">
          {allProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}

      <button
        onClick={() => router.push("/all-products")}
        className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
      >
        See more
      </button>
    </div>
  );
};

export default HomeProducts;
