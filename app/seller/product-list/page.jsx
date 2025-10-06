"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";

const ProductList = () => {
  const { router } = useAppContext();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from backend
  const fetchSellerProduct = async () => {
    try {
      const res = await fetch("/api/products/list");
      const data = await res.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        console.error("Failed to load products:", data.error);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerProduct();
  }, []);

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between bg-gray-50">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full md:p-10 p-4">
          <h2 className="pb-4 text-lg font-medium">All Products</h2>
          <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-md bg-white border border-gray-300">
            <table className="table-fixed w-full overflow-hidden">
              <thead className="text-gray-900 text-sm text-left bg-gray-100">
                <tr>
                  <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">
                    Product
                  </th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                    Quantity
                  </th>
                  <th className="px-4 py-3 font-medium truncate">
                    Created At
                  </th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600">
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-t border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                        <div className="bg-gray-200/40 rounded p-2 flex-shrink-0">
                          <Image
                            src={product.images?.[0] || assets.upload_area}
                            alt={product.title}
                            className="w-16 h-16 object-cover rounded"
                            width={128}
                            height={128}
                          />
                        </div>
                        <span className="truncate w-full font-medium">
                          {product.title}
                        </span>
                      </td>
                      <td className="px-4 py-3 max-sm:hidden">
                        {product.quantity}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 max-sm:hidden">
                        <button
                          onClick={() => router.push(`/product/${product._id}`)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                        >
                          <span className="hidden md:block">View</span>
                          <Image
                            className="h-3.5"
                            src={assets.redirect_icon}
                            alt="redirect_icon"
                            width={12}
                            height={12}
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-6 text-gray-500 italic"
                    >
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductList;
