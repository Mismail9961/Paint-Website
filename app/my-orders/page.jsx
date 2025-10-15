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

  // 🧭 Fetch Orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/order/list");
      const data = await res.json();

      console.log("📦 Orders:", data);
      
      // Debug: Check first order structure
      if (data.orders && data.orders.length > 0) {
        console.log("🔍 First order item:", data.orders[0].items[0]);
        console.log("🔍 Product object:", data.orders[0].items[0]?.product);
      }

      if (!data.success) throw new Error(data.message || "Failed to fetch orders");
      setOrders(data.orders || []);
    } catch (err) {
      console.error("❌ Fetch orders error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🧠 Helper: safely get first image from either paintProduct or product
  const getOrderImage = (order) => {
    for (const item of order.items || []) {
      // Check paintProduct first
      const paintImg = item?.paintProduct?.images?.[0];
      if (paintImg) {
        return paintImg.startsWith("http") ? paintImg : `/uploads/${paintImg}`;
      }
      
      // Then check regular product - try multiple possible field names
      const product = item?.product;
      if (product) {
        // Try different image field names
        const productImg = 
          product.images?.[0] || 
          product.image?.[0] || 
          product.image || 
          product.picture || 
          product.imageUrl;
        
        if (productImg) {
          // Handle both string and array
          const imgUrl = Array.isArray(productImg) ? productImg[0] : productImg;
          return imgUrl.startsWith("http") ? imgUrl : `/uploads/${imgUrl}`;
        }
      }
    }
    return "https://cdn-icons-png.flaticon.com/512/4341/4341062.png";
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
        <div className="space-y-5">
          <h2 className="text-lg font-medium mt-6">My Orders</h2>

          {loading ? (
            <Loading />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-500">You have no orders yet.</p>
          ) : (
            <div className="max-w-5xl border-t border-gray-300 text-sm">
              {orders.map((order, index) => (
                <div
                  key={order._id || index}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300"
                >
                  {/* 🧱 Product Details */}
                  <div className="flex-1 flex gap-5 max-w-80">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={getOrderImage(order)}
                        alt="product image"
                        fill
                        className="object-cover rounded-md"
                        onError={(e) => {
                          e.target.src = "https://cdn-icons-png.flaticon.com/512/4341/4341062.png";
                        }}
                        unoptimized
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      {order.items.map((item, i) => {
                        // Get product info from either paintProduct or product
                        const product = item.paintProduct || item.product;
                        const isPaint = !!item.paintProduct;
                        
                        // Fallback: If no product reference, show basic item info
                        const productName = product?.name || "Product";
                        const hasShade = item.shadeNumber && item.shadeNumber !== "N/A";
                        
                        return (
                          <div key={i}>
                            <span className="font-medium text-base">
                              {productName}
                              <br />
                              {hasShade && `Shade: ${item.shadeNumber} × `}
                              {!hasShade && "Quantity: "}
                              {item.quantity}
                            </span>
                            <span className="text-gray-500 text-sm block">
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
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">{order.address.fullName}</span>
                      <br />
                      <span>{order.address.area}</span>
                      <br />
                      <span>{`${order.address.city}, ${order.address.state}`}</span>
                      <br />
                      <span>{order.address.phoneNumber}</span>
                    </p>
                  </div>

                  {/* 💰 Amount */}
                  <p className="font-medium my-auto whitespace-nowrap">
                    {currency}
                    {order.amount}
                  </p>

                  {/* 🕒 Status + Info */}
                  <div className="text-sm text-right md:text-left">
                    <p className="flex flex-col">
                      <span>Status: {order.status}</span>
                      <span>
                        Date:{" "}
                        {new Date(order.createdAt || order.date).toLocaleDateString()}
                      </span>
                      <span>Payment: Pending</span>
                      <span>Method: COD</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;