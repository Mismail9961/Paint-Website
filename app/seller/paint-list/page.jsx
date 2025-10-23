"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

export default function PaintList() {
  const { router } = useAppContext();
  const [paints, setPaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // ✅ Fetch paints
  const fetchPaints = async () => {
    try {
      const res = await fetch("/api/paintProduct/list", { cache: "no-store" });
      const data = await res.json();
      if (data.success) setPaints(data.data);
      else toast.error("Failed to fetch paints");
    } catch (error) {
      console.error("❌ Error fetching paints:", error);
      toast.error("Error fetching paints");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete paint
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/paintProduct/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Paint deleted successfully!");
        setPaints((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error(data.message || "Failed to delete paint");
      }
    } catch (error) {
      console.error("❌ Error deleting paint:", error);
      toast.error("Error deleting paint");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchPaints();
  }, []);

  // ✅ Centered loader
  if (loading)
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <Loading />
      </div>
    );

  return (
    <div className="min-h-screen w-full flex flex-col justify-center bg-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto w-full px-4 pt-8 pb-4 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
          All Paints
        </h1>
      </div>

      {/* Table / Mobile Grid */}
      <div className="flex-1 w-full flex justify-center px-2 sm:px-4">
        <div className="max-w-6xl w-full bg-white shadow-sm rounded-md overflow-hidden">
          {/* Table for larger screens */}
          <table className="hidden sm:table w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-800 text-sm uppercase">
              <tr>
                <th className="px-6 py-3 font-semibold w-[40%]">Paint</th>
                <th className="px-6 py-3 font-semibold text-center">Category</th>
                <th className="px-6 py-3 font-semibold text-center">
                  Quantity
                </th>
                <th className="px-6 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paints.length > 0 ? (
                paints.map((paint) => (
                  <tr
                    key={paint._id}
                    className="hover:bg-gray-50 transition cursor-default"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-14 h-14 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={paint.images?.[0] || assets.upload_area}
                          alt={paint.title}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 truncate">
                          {paint.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {paint.category || "Uncategorized"}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      {paint.category || "-"}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {paint.quantity ?? "-"}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => router.push(`/product/${paint._id}`)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(paint._id)}
                          disabled={deletingId === paint._id}
                          className={`px-3 py-1 rounded-md text-white transition ${
                            deletingId === paint._id
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          {deletingId === paint._id ? "Deleting..." : "Delete"}
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
                    No paints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Mobile card layout */}
          <div className="sm:hidden flex flex-col divide-y divide-gray-100">
            {paints.length > 0 ? (
              paints.map((paint) => (
                <div
                  key={paint._id}
                  className="p-4 flex flex-col gap-3 bg-white"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={paint.images?.[0] || assets.upload_area}
                        alt={paint.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm leading-tight">
                        {paint.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {paint.category || "Uncategorized"}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-600 mt-2">
                    <span>Qty: {paint.quantity}</span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => router.push(`/product/${paint._id}`)}
                      className="flex-1 py-1.5 text-center text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(paint._id)}
                      disabled={deletingId === paint._id}
                      className={`flex-1 py-1.5 text-center text-sm rounded-md text-white transition ${
                        deletingId === paint._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {deletingId === paint._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 italic py-8">
                No paints found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
