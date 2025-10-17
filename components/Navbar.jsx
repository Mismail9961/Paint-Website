"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { ShoppingCart, Menu } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const [cartCount, setCartCount] = useState(0);

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
    <nav className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 text-neutral-100 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-12 py-4">
        {/* Brand */}
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer select-none"
        >
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
            Rang<span className="text-blue-300">Reza</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className="hover:text-slate-300 transition">
            Home
          </Link>
          <Link href="/all-products" className="hover:text-slate-300 transition">
            Shop
          </Link>
          <Link href="/about-us" className="hover:text-slate-300 transition">
            About Us
          </Link>
          <Link href="/contact-us" className="hover:text-slate-300 transition">
            Contact
          </Link>

          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs bg-neutral-200 text-slate-900 font-semibold px-4 py-1.5 rounded-full hover:bg-neutral-300 transition"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Cart Icon */}
          <button
            onClick={() => router.push("/cart")}
            className="relative hover:scale-110 transition-transform"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-neutral-200 text-slate-900 text-xs font-bold rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </button>

          {/* Account / Auth */}
          {isSignedIn ? (
            <UserButton
              appearance={{ elements: { avatarBox: "w-8 h-8" } }}
              afterSignOutUrl="/"
            />
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center gap-2 font-medium hover:text-slate-300 transition"
            >
              <FaUser className="text-lg" />
              Account
            </button>
          )}

          {/* Mobile Menu */}
          <button className="md:hidden hover:text-slate-300 transition">
            <Menu size={26} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
