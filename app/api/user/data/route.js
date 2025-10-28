import { auth, currentUser } from "@clerk/nextjs/server";
import User from "@/models/User";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    await connectDB();

    // Try to find by Clerk ID (stored in clerkId field)
    let user = await User.findOne({ clerkId: userId });

    // If not found, create or upsert the user
    if (!user) {
      console.log("Fetching current user from Clerk for:", userId);

      const clerkUser = await currentUser();
      if (!clerkUser) {
        throw new Error("No current user found");
      }

      const email = clerkUser.emailAddresses?.[0]?.emailAddress;
      if (!email) {
        throw new Error("Clerk user missing email address");
      }

      // Use findOneAndUpdate with upsert to avoid duplicate key errors
      user = await User.findOneAndUpdate(
        { email }, // find by email
        {
          $setOnInsert: {
            clerkId: userId,
            name:
              `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
              "Unnamed User",
            email,
            imageUrl: clerkUser.imageUrl || "",
          },
        },
        { upsert: true, new: true }
      );

      console.log("User created or updated:", email);
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
