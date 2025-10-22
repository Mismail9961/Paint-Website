"use client";
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Navbar = () => {
  const { isSeller, router } = useAppContext();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  return (
    <nav className="sticky top-0 z-50 bg-[#324053]/95 backdrop-blur-md shadow-md border-b border-white/10">
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4 text-white">
        {/* Brand */}
        <h1
          onClick={() => router.push("/")}
          className="cursor-pointer text-2xl md:text-3xl font-extrabold tracking-wide"
        >
          <span className="text-white">Rang</span>
          <span className="text-[#93C5FD]">Reza</span>
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Home", "Shop", "About Us", "Contact"].map((item, i) => {
            let href = "/";
            if (item === "Shop") href = "/all-products";
            if (item === "About Us") href = "/about-us";
            if (item === "Contact") href = "/contact-us";

            return (
              <Link
                key={i}
                href={href}
                className="relative group transition text-white/90 hover:text-white"
              >
                {item}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}

          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs font-semibold border border-white px-5 py-2 rounded-full hover:bg-white hover:text-[#324053] transition"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        {/* Right side (desktop) */}
        <div className="hidden md:flex items-center gap-5">
          <a href="/cart">
            <Image
              className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100 transition"
              src={assets.cart_icon}
              alt="cart"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </a>

          {isSignedIn ? (
            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }}>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push("/cart")}
                />
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center gap-2 font-medium hover:text-gray-400 transition"
            >
              <Image
                src={assets.user_icon}
                alt="user"
                className="w-5 h-5 opacity-90"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              Account
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center md:hidden gap-3">
          {/* Seller Button (if seller) */}
          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs border border-white text-white px-3 py-1.5 rounded-full hover:bg-white hover:text-[#324053] transition"
            >
              Seller
            </button>
          )}

          {/* Auth Section */}
          {isSignedIn ? (
            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }}>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Home"
                  labelIcon={<HomeIcon />}
                  onClick={() => router.push("/")}
                />
                <UserButton.Action
                  label="Products"
                  labelIcon={<BoxIcon />}
                  onClick={() => router.push("/all-products")}
                />
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push("/cart")}
                />
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center gap-2 font-medium hover:text-indigo-300 transition"
            >
              <Image
                src={assets.user_icon}
                alt="user"
                className="w-5 h-5 opacity-90"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              Account
            </button>
          )}

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#324053] hover:bg-[#4267B2] text-white transition-all duration-200 shadow-sm"
            >
              <FaFacebookF className="text-sm" />
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#324053] hover:bg-[#E4405F] text-white transition-all duration-200 shadow-sm"
            >
              <FaInstagram className="text-sm" />
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#324053] hover:bg-[#25D366] text-white transition-all duration-200 shadow-sm"
            >
              <FaWhatsapp className="text-sm" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
