import User from "@/models/User";
import Order from "@/models/ProductOrder";
import PaintOrder from "@/models/PaintOrder";
import { Inngest } from "inngest";
import connectDB from "./db";

// Create Inngest client
export const inngest = new Inngest({ id: "quickcart-next" });

/* ===========================
   🔹 SYNC USER EVENTS
=========================== */

export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      console.log("📩 User Created Event:", event.data);
      const { id, first_name, last_name, email_addresses, image_url } =
        event.data;

      const userData = {
        _id: id,
        email: email_addresses?.[0]?.email_address ?? null,
        name:
          [first_name, last_name].filter(Boolean).join(" ") || "Unnamed User",
        imageUrl: image_url,
      };

      await connectDB();
      const result = await User.findOneAndUpdate(
        { _id: id },
        { $set: userData },
        { upsert: true, new: true }
      );

      console.log("✅ User synced (created):", result?._id);
      return { success: true, userId: result?._id };
    } catch (err) {
      console.error("❌ Error syncing user (created):", err);
      throw err;
    }
  }
);

export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    try {
      console.log("📩 User Updated Event:", event.data);
      const { id, first_name, last_name, email_addresses, image_url } =
        event.data;

      const userData = {
        email: email_addresses?.[0]?.email_address ?? null,
        name:
          [first_name, last_name].filter(Boolean).join(" ") || "Unnamed User",
        imageUrl: image_url,
      };

      await connectDB();
      const result = await User.findByIdAndUpdate(
        id,
        { $set: userData },
        { new: true }
      );

      console.log("✅ User synced (updated):", result?._id);
      return { success: true, userId: result?._id };
    } catch (err) {
      console.error("❌ Error syncing user (updated):", err);
      throw err;
    }
  }
);

export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      console.log("📩 User Deleted Event:", event.data);
      const { id } = event.data;

      await connectDB();
      const result = await User.findByIdAndDelete(id);

      if (result) {
        console.log("🗑 User deleted:", id);
      } else {
        console.warn("⚠️ User not found for deletion:", id);
      }

      return { success: true, userId: id };
    } catch (err) {
      console.error("❌ Error syncing user (deleted):", err);
      throw err;
    }
  }
);
/* ===========================
   🎨 CREATE PAINT ORDER
=========================== */

export const createPaintOrder = inngest.createFunction(
  {
    id: "create-paint-order",
    batchEvents: { maxSize: 5, timeout: "5s" },
  },
  { event: "paintOrder/created" },
  async ({ events }) => {
    try {
      await connectDB();
      console.log("🎨 INNGEST: Processing", events.length, "paint order events");

      const paintOrders = events.map((event) => {
        const { userId, items, amount, address, date, status } = event.data;
        return {
          userId,
          address,
          items: items.map((i) => ({
            paintProduct: i.paintProduct,
            shadeNumber: i.shadeNumber || "N/A",
            quantity: i.quantity,
            price: i.price,
            offerPrice: i.offerPrice || 0,
          })),
          amount,
          date: new Date(date || Date.now()),
          status: status || "Order Placed",
        };
      });

      const inserted = await PaintOrder.insertMany(paintOrders);
      console.log("✅ INNGEST: Created", inserted.length, "paint orders");

      return {
        success: true,
        processed: inserted.length,
        orderIds: inserted.map((o) => o._id),
      };
    } catch (error) {
      console.error("❌ INNGEST: Error creating paint orders:", error);
      throw new Error(`Failed to create paint orders: ${error.message}`);
    }
  }
);
