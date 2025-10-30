"use client";
import React from "react";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";

const TopBar = () => {
  return (
    <>
      {/* Desktop & Tablet View */}
      <div className="hidden sm:flex bg-[#0A9396] text-white text-sm py-2.5 px-6 sm:px-10 md:px-16 lg:px-32 
                      items-center justify-between gap-3 border-b border-[#94D2BD]/40 shadow-md">
        {/* Left Info */}
        <div className="flex flex-wrap items-center gap-5 font-medium">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-full">
              <FaPhone className="text-white" />
            </div>
            <a
              href="tel:+923313649161"
              className="hover:text-[#94D2BD] transition-colors duration-200"
            >
              +92 331 3649161
            </a>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-full">
              <FaEnvelope className="text-white" />
            </div>
            <a
              href="mailto:info@karachipaint.com"
              className="hover:text-[#94D2BD] transition-colors duration-200"
            >
              info@karachipaint.com
            </a>
          </div>
        </div>

        {/* Right Social Links */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#94D2BD] hover:bg-white text-[#0A9396] 
                       transition-all duration-200 shadow-sm"
          >
            <FaFacebookF className="text-xs" />
          </a>
          <a
            href="#"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#94D2BD] hover:bg-white text-[#0A9396] 
                       transition-all duration-200 shadow-sm"
          >
            <FaInstagram className="text-xs" />
          </a>
          <a
            href="#"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#94D2BD] hover:bg-white text-[#0A9396] 
                       transition-all duration-200 shadow-sm"
          >
            <FaWhatsapp className="text-xs" />
          </a>
        </div>
      </div>

      {/* Mobile View (iPhone 5s) */}
      <div className="sm:hidden flex flex-wrap items-center justify-center gap-2 py-2 bg-[#0A9396] text-white text-xs">
        <a href="tel:+923313649161" className="flex items-center gap-1">
          <FaPhone className="text-[#94D2BD]" />
          <span>Call</span>
        </a>
        <span className="opacity-50">|</span>
        <a href="mailto:info@karachipaint.com" className="flex items-center gap-1">
          <FaEnvelope className="text-[#94D2BD]" />
          <span>Email</span>
        </a>
        <span className="opacity-50">|</span>
        <div className="flex items-center gap-2">
          <FaFacebookF className="text-[#94D2BD]" />
          <FaInstagram className="text-[#94D2BD]" />
          <FaWhatsapp className="text-[#94D2BD]" />
        </div>
      </div>
    </>
  );
};

export default TopBar;
