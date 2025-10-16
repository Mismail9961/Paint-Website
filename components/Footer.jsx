"use client";
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#FACC15]/15 via-white to-[#393AC3]/10 pt-14">
      {/* Upper Section */}
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 pb-14 border-b border-[#393AC3]/20 text-gray-600">
        {/* Logo & Description */}
        <div className="w-full md:w-2/5">
          <Image
            className="w-32 md:w-40"
            src={assets.logo}
            alt="logo"
            priority
          />
          <p className="mt-6 text-sm leading-relaxed text-gray-600/90">
            We bring premium paint brands like <b>Gobi’s</b>, <b>ICI</b>, and{" "}
            <b>Diamond Paints</b> to homes across Pakistan. Experience color,
            protection, and quality like never before.
          </p>
        </div>

        {/* Company Links */}
        <div className="w-full md:w-1/4 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-semibold text-gray-900 mb-5 text-lg">
              Company
            </h2>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  className="hover:text-[#393AC3] hover:underline transition-all"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#393AC3] hover:underline transition-all"
                  href="#"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#393AC3] hover:underline transition-all"
                  href="#"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#393AC3] hover:underline transition-all"
                  href="#"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="w-full md:w-1/4 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-semibold text-gray-900 mb-5 text-lg">
              Get in Touch
            </h2>
            <div className="text-sm space-y-2">
              <p className="hover:text-[#393AC3] transition-all cursor-pointer">
                +92 300 1234567
              </p>
              <p className="hover:text-[#393AC3] transition-all cursor-pointer">
                support@paintstore.pk
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-[#FACC15] to-[#393AC3] text-white py-4">
        <p className="text-center text-xs md:text-sm tracking-wide">
          © {new Date().getFullYear()} PaintStore.pk — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
