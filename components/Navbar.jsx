"use client";
import React, { useEffect, useState } from "react";
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
        {/* Brand Name instead of Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => router.push("/")}
        >
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-neutral-100">
          Rang<span className="text-blue-300">Reza</span>
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-slate-300 transition font-medium">
            Home
          </Link>
          <Link
            href="/all-products"
            className="hover:text-slate-300 transition font-medium"
          >
            Shop
          </Link>
          <Link href="/about" className="hover:text-slate-300 transition font-medium">
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-slate-300 transition font-medium"
          >
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
        <div className="flex items-center gap-4">
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

          {/* User Auth */}
          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center gap-2 font-medium hover:text-slate-300 transition"
            >
              <Image
                src="/user-icon.svg"
                alt="user icon"
                className="w-5 h-5 object-contain"
                width={20}
                height={20}
              />
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
