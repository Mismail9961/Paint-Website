"use client";
import React from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart, ShoppingBag, Home } from "lucide-react"; 

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      {/* Logo */}
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />

      {/* Links - Desktop */}
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Right Section - Desktop */}
      <ul className="hidden md:flex items-center gap-4">
        <Image
          className="w-4 h-4"
          src={assets.search_icon}
          alt="search icon"
        />
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Cart"
                labelIcon={<ShoppingCart size={18} />}
                onClick={() => router.push("/cart")}
              />
              <UserButton.Action
                label="My Orders"
                labelIcon={<ShoppingBag size={18} />}
                onClick={() => router.push("/my-orders")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      {/* Mobile Menu */}
      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs font-semibold border border-indigo-500 text-indigo-600 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition"
          >
            Seller Dashboard
          </button>
        )}
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Home"
                labelIcon={<Home size={18} />}
                onClick={() => router.push("/")}
              />
              <UserButton.Action
                label="Cart"
                labelIcon={<ShoppingCart size={18} />}
                onClick={() => router.push("/cart")}
              />
              <UserButton.Action
                label="My Orders"
                labelIcon={<ShoppingBag size={18} />}
                onClick={() => router.push("/my-orders")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
