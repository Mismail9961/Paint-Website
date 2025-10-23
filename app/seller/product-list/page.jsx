"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

export default function ProductList() {
  const { router } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  // ✅ Fetch products
  const fetchSellerProduct = async () => {
    try {
      const res = await fetch("/api/products/list");
      const data = await res.json();
      if (data.success) setProducts(data.data);
      else toast.error("Failed to load products");
    } catch (error) {
      toast.error("Error fetching products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete product
  const deleteProduct = async (productId) => {
    try {
      setDeleting(productId);
      const res = await fetch(`/api/products/delete/${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== productId));
        toast.success("Product deleted successfully.");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("Error deleting product");
      console.error(error);
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchSellerProduct();
  }, []);

  // ✅ Centered loader
  if (loading)
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <Loading />
      </div>
    );

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto w-full px-4 pt-8 pb-4 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
          All Products
        </h1>
      </div>

      {/* Table / Mobile Grid */}
      <div className="flex-1 w-full flex justify-center px-2 sm:px-4">
        <div className="max-w-6xl w-full bg-white shadow-sm rounded-md overflow-hidden">
          {/* Table for larger screens */}
          <table className="hidden sm:table w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-800 text-sm uppercase">
              <tr>
                <th className="px-6 py-3 font-semibold w-[40%]">Product</th>
                <th className="px-6 py-3 font-semibold text-center">
                  Quantity
                </th>
                <th className="px-6 py-3 font-semibold text-center">
                  Created At
                </th>
                <th className="px-6 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition cursor-default"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-14 h-14 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={product.images?.[0] || assets.upload_area}
                          alt={product.title}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 truncate">
                          {product.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.category || "Uncategorized"}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      {product.quantity}
                    </td>

                    <td className="px-6 py-4 text-center text-gray-500">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            router.push(`/product/${product._id}`)
                          }
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          disabled={deleting === product._id}
                          className={`px-3 py-1 rounded-md text-white transition ${
                            deleting === product._id
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          {deleting === product._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-500 italic"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Mobile card layout for iPhone 5s */}
          <div className="sm:hidden flex flex-col divide-y divide-gray-100">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="p-4 flex flex-col gap-3 bg-white"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={product.images?.[0] || assets.upload_area}
                        alt={product.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm leading-tight">
                        {product.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {product.category || "Uncategorized"}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-600 mt-2">
                    <span>Qty: {product.quantity}</span>
                    <span>
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => router.push(`/product/${product._id}`)}
                      className="flex-1 py-1.5 text-center text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      disabled={deleting === product._id}
                      className={`flex-1 py-1.5 text-center text-sm rounded-md text-white transition ${
                        deleting === product._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {deleting === product._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 italic py-8">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
