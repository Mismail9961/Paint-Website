import User from "@/models/User";
import Order from "@/models/Order";
import { Inngest } from "inngest";
import connectDB from "./db";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "paint-shop" });

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
        imageUrl: image_url, // <-- match schema
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
  
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
  
        const userData = {
          email: email_addresses?.[0]?.email_address ?? null,
          name: [first_name, last_name].filter(Boolean).join(" ") || "Unnamed User",
          imageUrl: image_url,
        };
  
        await connectDB();
  
        const result = await User.findByIdAndUpdate(id, userData, { new: true });
  
        console.log("✅ User synced (updated):", result?._id);
        return { success: true, userId: result?._id };
      } catch (err) {
        console.error("❌ Error syncing user (updated):", err.stack || err);
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

// Inngest Function to create user's order in database
export const createUserOrder = inngest.createFunction(
  {
    id: "create-user-order",
    batchEvents: {
      maxSize: 5,
      timeout: "5s"
    }
  },
  { event: "order/created" },
  async ({ events }) => {
    try {
      await connectDB();
      
      console.log("🔍 INNGEST: Processing", events.length, "order events");
      
      const orders = events.map((event) => {
        return {
          userId: event.data.userId,
          items: event.data.items,
          amount: event.data.amount,
          address: event.data.address,
          date: new Date(event.data.date),
          status: event.data.status || "Order Placed"
        };
      });
      
      // Insert all orders at once
      const insertedOrders = await Order.insertMany(orders);
      
      console.log("✅ INNGEST: Successfully created", insertedOrders.length, "orders");
      console.log("📦 INNGEST: Order IDs:", insertedOrders.map(order => order._id));
      
      return { 
        success: true, 
        processed: orders.length,
        orderIds: insertedOrders.map(order => order._id)
      };
      
    } catch (error) {
      console.error("❌ INNGEST: Error creating orders:", error);
      throw new Error(`Failed to create orders: ${error.message}`);
    }
  }
);