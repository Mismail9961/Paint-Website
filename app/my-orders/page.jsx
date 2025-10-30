"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";

const MyOrders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/order/list");
      const data = await res.json();

      if (!data.success) throw new Error(data.message || "Failed to fetch orders");
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getOrderImage = (order) => {
    for (const item of order.items || []) {
      const paintImg = item?.paintProduct?.images?.[0];
      if (paintImg) return paintImg.startsWith("http") ? paintImg : `/uploads/${paintImg}`;
      const product = item?.product;
      if (product) {
        const productImg =
          product.images?.[0] ||
          product.image?.[0] ||
          product.image ||
          product.picture ||
          product.imageUrl;
        if (productImg) {
          const imgUrl = Array.isArray(productImg) ? productImg[0] : productImg;
          return imgUrl.startsWith("http") ? imgUrl : `/uploads/${imgUrl}`;
        }
      }
    }
    return "https://cdn-icons-png.flaticon.com/512/4341/4341062.png";
  };

  return (
    <>
      <div className="flex flex-col justify-between bg-white text-black min-h-screen px-4 sm:px-6 md:px-10 py-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center text-[#0a9396] mt-4 mb-4">
            My Orders
          </h2>

          {loading ? (
            <Loading />
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-500 text-center">You have no orders yet.</p>
          ) : (
            <div className="max-w-5xl mx-auto border-t border-[#94d2bd] text-sm rounded-xl overflow-hidden shadow-md">
              {orders.map((order, index) => (
                <div
                  key={order._id || index}
                  className="flex flex-col md:flex-row gap-5 justify-between p-4 sm:p-5 border-b border-[#94d2bd] bg-[#f9f9f9] hover:bg-[#94d2bd]/10 transition-all duration-300"
                >
                  {/* 🧱 Product Details */}
                  <div className="flex-1 flex gap-4 max-w-80">
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image
                        src={getOrderImage(order)}
                        alt="product image"
                        fill
                        className="object-cover rounded-md border border-[#94d2bd]"
                        onError={(e) => {
                          e.target.src = "https://cdn-icons-png.flaticon.com/512/4341/4341062.png";
                        }}
                        unoptimized
                      />
                    </div>

                    <div className="flex flex-col gap-2 text-sm sm:text-base">
                      {order.items.map((item, i) => {
                        const product = item.paintProduct || item.product;
                        const productName = product?.name || "Product";
                        const hasShade = item.shadeNumber && item.shadeNumber !== "N/A";
                        return (
                          <div key={i}>
                            <span className="font-medium text-[#0a9396] block leading-tight">
                              {productName}
                            </span>
                            <span className="text-black/70 text-sm">
                              {hasShade ? `Shade: ${item.shadeNumber} × ` : "Quantity: "}
                              {item.quantity}
                            </span>
                            <span className="text-[#0a9396] text-sm block">
                              Price: {currency}
                              {item.offerPrice || item.price}
                            </span>
                          </div>
                        );
                      })}
                      <span className="text-xs text-gray-500">
                        Items: {order.items.length}
                      </span>
                    </div>
                  </div>

                  {/* 📦 Shipping Address */}
                  <div className="text-sm text-black/80">
                    <p>
                      <span className="font-semibold text-[#0a9396]">{order.address.fullName}</span>
                      <br />
                      <span>{order.address.area}</span>
                      <br />
                      <span>{`${order.address.city}, ${order.address.state}`}</span>
                      <br />
                      <span>{order.address.phoneNumber}</span>
                    </p>
                  </div>

                  {/* 💰 Amount */}
                  <p className="font-semibold text-[#0a9396] my-auto whitespace-nowrap">
                    {currency}
                    {order.amount}
                  </p>

                  {/* 🕒 Status + Info */}
                  <div className="text-sm text-right md:text-left text-black/70">
                    <p className="flex flex-col gap-1">
                      <span>
                        <span className="font-medium text-[#0a9396]">Status:</span> {order.status}
                      </span>
                      <span>
                        <span className="font-medium text-[#0a9396]">Date:</span>{" "}
                        {new Date(order.createdAt || order.date).toLocaleDateString()}
                      </span>
                      <span>
                        <span className="font-medium text-[#0a9396]">Payment:</span> Pending
                      </span>
                      <span>
                        <span className="font-medium text-[#0a9396]">Method:</span> COD
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 320px) {
          h2 {
            font-size: 1.2rem;
          }
          .flex {
            flex-direction: column !important;
          }
          .w-16,
          .h-16 {
            width: 48px !important;
            height: 48px !important;
          }
          .text-sm {
            font-size: 0.75rem !important;
          }
          .text-base {
            font-size: 0.8rem !important;
          }
          .p-5 {
            padding: 0.75rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default MyOrders;
