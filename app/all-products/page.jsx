"use client";

import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {
  const { products } = useAppContext();

  return (
    <>
      <Navbar />

      <div className="px-6 md:px-16 lg:px-32 pt-20 pb-14">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-3xl font-semibold text-gray-800">
            All <span className="text-orange-600">Products</span>
          </h1>
          <div className="w-24 h-0.5 bg-orange-600 mt-2 rounded-full"></div>
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No products available.
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default AllProducts;
