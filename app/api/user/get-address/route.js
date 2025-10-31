import connectDB from "@/config/db";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    // Debug: Log the userId being searched
    console.log("🔍 Looking for addresses with userId:", userId);

    const addresses = await Address.find({ userId });

    // Debug: Log what was found
    console.log("📦 Found addresses:", addresses.length);

    // If no addresses found, return empty array with success true
    if (addresses.length === 0) {
      return NextResponse.json({
        success: true,
        addresses: [],
        message: "No addresses found. Please add an address."
      });
    }

    return NextResponse.json({ 
      success: true, 
      addresses 
    });
    
  } catch (error) {
    console.error("❌ Error fetching addresses:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}