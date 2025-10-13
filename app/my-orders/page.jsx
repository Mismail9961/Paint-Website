'use client';
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
      console.error("❌ Fetch orders error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🧠 Helper: safely get first available image
  const getOrderImage = (order) => {
    for (const item of order.items || []) {
      const img = item?.paintProduct?.images?.[0];
      if (img) return img;
    }
    return "/box_icon.png"; // fallback image
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
                  {/* 🧱 Order Items */}
                  <div className="flex-1 flex gap-5 max-w-80">
                    <Image
                      className="max-w-16 max-h-16 object-cover rounded-md"
                      src={getOrderImage(order)}
                      alt="product image"
                      width={64}
                      height={64}
                    />

                    <div className="flex flex-col gap-2">
                      {order.items.map((item, i) => (
                        <div key={i}>
                          <span className="font-medium text-base">
                            Shade: {item.shadeNumber || "N/A"} × {item.quantity}
                          </span>
                          <span className="text-gray-500 text-sm">
                            Price: {currency}
                            {item.offerPrice || item.price}
                          </span>
                        </div>
                      ))}
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
                  <p className="font-medium my-auto">
                    {currency}
                    {order.amount}
                  </p>

                  {/* 🕒 Status + Info */}
                  <div className="text-sm">
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
