'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";

const PaintList = () => {
  const { router } = useAppContext();

  const [paints, setPaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch paints from API
  const fetchPaints = async () => {
    try {
      const res = await fetch("/api/paintProduct/list", { cache: "no-store" });
      const data = await res.json();

      if (data.success) {
        setPaints(data.data);
      } else {
        console.error("Failed to fetch paints:", data.error);
      }
    } catch (error) {
      console.error("❌ Error fetching paints:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaints();
  }, []);

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full md:p-10 p-4">
          <h2 className="pb-4 text-lg font-medium">All Paints</h2>
          <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className="table-fixed w-full overflow-hidden">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">
                    Paint
                  </th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                    Category
                  </th>
                  <th className="px-4 py-3 font-medium truncate">
                    Quantity
                  </th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {paints.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-400">
                      No paints found.
                    </td>
                  </tr>
                ) : (
                  paints.map((paint, index) => (
                    <tr key={index} className="border-t border-gray-500/20">
                      <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                        <div className="bg-gray-500/10 rounded p-2">
                          <Image
                            src={paint.images[0]}
                            alt="Paint Image"
                            className="w-16 h-16 object-cover rounded"
                            width={1280}
                            height={720}
                          />
                        </div>
                        <span className="truncate w-full">
                          {paint.title}
                        </span>
                      </td>
                      <td className="px-4 py-3 max-sm:hidden">{paint.category}</td>
                      <td className="px-4 py-3">{paint.quantity}</td>
                      <td className="px-4 py-3 max-sm:hidden">
                        <button
                          onClick={() => router.push(`/product/${paint._id}`)}
                          className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-orange-600 text-white rounded-md"
                        >
                          <span className="hidden md:block">View</span>
                          <Image
                            className="h-3.5"
                            src={assets.redirect_icon}
                            alt="redirect_icon"
                          />
                        </button>
                      </td>
                    </tr>
                  ))
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

export default PaintList;
