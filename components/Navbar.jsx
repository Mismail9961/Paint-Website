"use client";
import React, { useState } from "react";
import {
  assets,
  star_icon,
  BagIcon,
  BoxIcon,
  CartIcon,
  HomeIcon,
} from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { isSeller, router } = useAppContext();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0A9396] text-white shadow-lg border-b border-[#94D2BD]/40">
      <div className="flex items-center justify-between px-3 sm:px-5 md:px-10 lg:px-20 py-2 sm:py-3">

        {/* Brand */}
        <h1
          onClick={() => router.push("/")}
          className="cursor-pointer text-lg sm:text-2xl font-extrabold tracking-wide leading-tight text-white"
        >
          <span className="text-[#94D2BD]">Quality</span>{" "}
          <span className="text-white">Paint Palace</span>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Home", "Shop", "About Us", "Contact", "Privacy Policy"].map(
            (item, i) => {
              let href = "/";
              if (item === "Shop") href = "/all-products";
              if (item === "About Us") href = "/about-us";
              if (item === "Contact") href = "/contact-us";
              if (item === "Privacy Policy") href = "/privacy-policy";

              return (
                <Link
                  key={i}
                  href={href}
                  className="relative group text-white/90 hover:text-[#94D2BD] transition"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#94D2BD] transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            }
          )}

          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs font-semibold border border-[#94D2BD] text-[#94D2BD] px-4 py-1.5 rounded-full hover:bg-[#94D2BD] hover:text-[#0A9396] transition"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-5">
          <a href="/cart">
            <Image
              src={assets.cart_icon}
              alt="cart"
              className="w-5 h-5 cursor-pointer opacity-90 hover:opacity-100 transition"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </a>

          {isSignedIn ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-8 h-8 border-2 border-[#94D2BD] rounded-full",
                },
              }}
            >
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
              className="flex items-center gap-2 font-medium text-white hover:text-[#94D2BD] transition"
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

        {/* Mobile Right Side */}
        <div className="flex items-center md:hidden gap-3 h-10">
          {/* Cart Icon */}
          <button
            onClick={() => router.push("/cart")}
            className="relative flex items-center justify-center"
          >
            <Image
              src={assets.cart_icon}
              alt="cart"
              className="w-5 h-5 sm:w-6 sm:h-6 opacity-90 hover:opacity-100 transition"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </button>

          {/* Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center w-7 h-7 space-y-1 focus:outline-none"
          >
            <span
              className={`block h-0.5 w-5 bg-white transition-transform ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-white ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-white transition-transform ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A9396] border-t border-[#94D2BD]/40">
          <div className="flex flex-col items-center gap-3 py-4 text-sm font-medium text-white">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#94D2BD] transition"
            >
              Home
            </Link>
            <Link
              href="/about-us"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#94D2BD] transition"
            >
              About
            </Link>
            <Link
              href="/contact-us"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#94D2BD] transition"
            >
              Contact
            </Link>
            <Link
              href="/all-products"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#94D2BD] transition"
            >
              Shop
            </Link>

            {isSeller && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/seller");
                }}
                className="text-xs border border-[#94D2BD] text-[#94D2BD] px-3 py-1 rounded-full hover:bg-[#94D2BD] hover:text-[#0A9396] transition"
              >
                Seller Dashboard
              </button>
            )}

            {!isSignedIn && (
              <button
                onClick={() => {
                  openSignIn();
                  setMenuOpen(false);
                }}
                className="text-white hover:text-[#94D2BD] transition"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
