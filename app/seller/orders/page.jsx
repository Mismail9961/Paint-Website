"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import { toast } from "react-hot-toast";

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // ✅ Fetch all admin orders
  const fetchAdminOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/order/admin-list");
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
      toast.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminOrders();
  }, []);

  // ✅ Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdating(true);
      const res = await fetch("/api/order/admin-list", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Order status updated");
        fetchAdminOrders();
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status");
    } finally {
      setUpdating(false);
    }
  };

  // ✅ Handle delete order
  const handleDelete = async (orderId) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await fetch("/api/order/admin-list", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Order deleted");
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
      } else {
        toast.error(data.message || "Failed to delete order");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting order");
    }
  };

  // ✅ Render UI
  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4 space-y-5">
          <h2 className="text-lg font-medium">All Orders</h2>

          <div className="max-w-5xl rounded-md">
            {orders.length === 0 ? (
              <p className="text-gray-500">No orders found</p>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300"
                >
                  {/* 🧩 Product Image + Info */}
                  <div className="flex-1 flex gap-5 max-w-80">
                    <Image
                      className="w-16 h-16 object-cover rounded"
                      src={
                        order.items[0]?.product?.image ||
                        order.items[0]?.product?.images?.[0] ||
                        order.items[0]?.paintProduct?.images?.[0] ||
                        "/placeholder.png"
                      }
                      width={64}
                      height={64}
                      alt="Product"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">
                        {order.items
                          .map((item) => {
                            const name =
                              item.product?.name ||
                              item.paintProduct?.name ||
                              "Unnamed Product";
                            return `${name} × ${item.quantity}`;
                          })
                          .join(", ")}
                      </span>

                      {/* 🎨 Show shade number for paint products */}
                      {order.items.some((item) => item.paintProduct) && (
                        <span className="text-xs text-gray-500">
                          Shade No:{" "}
                          {order.items
                            .filter((i) => i.paintProduct)
                            .map((i) => i.shadeNumber || "N/A")
                            .join(", ")}
                        </span>
                      )}

                      <span>Items: {order.items.length}</span>
                    </div>
                  </div>

                  {/* 🏠 Address Info */}
                  <div>
                    <p>
                      <span className="font-medium">
                        {order.address.fullName}
                      </span>
                      <br />
                      <span>{order.address.area}</span>
                      <br />
                      <span>
                        {order.address.city}, {order.address.state}
                      </span>
                      <br />
                      <span>{order.address.phoneNumber}</span>
                    </p>
                  </div>

                  {/* 💰 Price */}
                  <p className="font-medium my-auto">
                    {currency}
                    {order.amount}
                  </p>

                  {/* 📦 Status + Date + Delete */}
                  <div className="flex flex-col justify-between">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      disabled={updating}
                      className="border px-2 py-1 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {[
                        "Order Placed",
                        "Processing",
                        "Shipped",
                        "Delivered",
                        "Cancelled",
                      ].map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <span className="text-gray-500 text-xs mt-1">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="text-red-600 text-xs mt-2 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Orders;
