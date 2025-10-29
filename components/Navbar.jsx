"use client";
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { isSeller, router } = useAppContext();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  return (
    <nav className="sticky top-0 z-50 bg-[#03045E]/95 backdrop-blur-md shadow-md border-b border-[#00B4D8]/30">
      <div className="flex items-center justify-between px-2 sm:px-4 md:px-10 lg:px-24 py-2 sm:py-3 text-white">
        {/* Brand */}
        <h1
          onClick={() => router.push("/")}
          className="cursor-pointer text-lg xs:text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide leading-tight"
        >
          <span className="text-[#FFD60A]">Quality</span>{" "}
          <span className="text-[#00B4D8]">Paint Palace</span>
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {["Home", "Shop", "About Us", "Contact"].map((item, i) => {
            let href = "/";
            if (item === "Shop") href = "/all-products";
            if (item === "About Us") href = "/about-us";
            if (item === "Contact") href = "/contact-us";

            return (
              <Link
                key={i}
                href={href}
                className="relative group transition text-white/90 hover:text-[#FFD60A]"
              >
                {item}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#FFD60A] transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}

          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs font-semibold border border-[#FFD60A] text-[#FFD60A] px-4 py-1.5 rounded-full hover:bg-[#FFD60A] hover:text-[#03045E] transition"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        {/* Right side (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <a href="/cart">
            <Image
              className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100 transition"
              src={assets.cart_icon}
              alt="cart"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </a>

          {isSignedIn ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-8 h-8 border-2 border-[#00B4D8] rounded-full",
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
              className="flex items-center gap-2 font-medium hover:text-[#FFD60A] transition"
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
        <div className="flex items-center md:hidden gap-3 h-10">
          {/* Cart icon (always visible on mobile) */}
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

          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-[10px] sm:text-xs border border-[#FFD60A] text-[#FFD60A] px-2.5 py-1 rounded-full hover:bg-[#FFD60A] hover:text-[#03045E] transition"
            >
              Seller
            </button>
          )}

          {isSignedIn ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-7 h-7 xs:w-8 xs:h-8 border border-[#00B4D8] rounded-full",
                },
              }}
            >
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
              className="flex items-center gap-1.5 font-medium hover:text-[#FFD60A] transition"
            >
              <Image
                src={assets.user_icon}
                alt="user"
                className="w-4 h-4 sm:w-5 sm:h-5 opacity-90"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
