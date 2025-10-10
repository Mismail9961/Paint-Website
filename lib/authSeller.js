import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const authSeller = async (userId) => {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    return user.publicMetadata.role === "seller";
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
};

export default authSeller;
