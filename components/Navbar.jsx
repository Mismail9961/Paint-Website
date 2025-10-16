"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { ShoppingCart, Menu } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart count when user logs in
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        if (!user) return setCartCount(0);

        const res = await axios.get(`/api/user/${user.id}/cart`);
        setCartCount(res.data?.cartCount || 0);
      } catch (err) {
        console.error("Error fetching cart count:", err);
      }
    };

    fetchCartCount();
  }, [user]);

  return (
    <nav className="bg-gradient-to-r from-blue-800 via-indigo-700 to-indigo-600 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-12 py-4">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => router.push("/")}
        >
          <Image
            src={assets.logo}
            alt="logo"
            className="w-24 md:w-32 object-contain"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-yellow-400 transition font-medium">
            Home
          </Link>
          <Link
            href="/all-products"
            className="hover:text-yellow-400 transition font-medium"
          >
            Shop
          </Link>
          <Link href="/about" className="hover:text-yellow-400 transition font-medium">
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-yellow-400 transition font-medium"
          >
            Contact
          </Link>

          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs bg-yellow-400 text-blue-900 font-semibold px-4 py-1.5 rounded-full hover:bg-yellow-300 transition"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            onClick={() => router.push("/cart")}
            className="relative hover:scale-110 transition-transform"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 text-xs font-bold rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Auth */}
          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center gap-2 font-medium hover:text-yellow-400 transition"
            >
              <Image
                src={assets.user_icon}
                alt="user icon"
                className="w-5 h-5 object-contain"
              />
              Account
            </button>
          )}

          {/* Mobile Menu */}
          <button className="md:hidden hover:text-yellow-400 transition">
            <Menu size={26} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
