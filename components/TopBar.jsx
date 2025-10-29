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
    // 👇 Hidden on mobile, visible on md+
    <div className="hidden md:flex bg-[#FFD60A] text-[#03045E] text-sm py-2.5 px-6 md:px-16 lg:px-32 items-center justify-between gap-2 border-b border-[#03045E]/20 shadow-md">
      
      {/* Left Info */}
      <div className="flex flex-wrap items-center gap-6 font-medium">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#03045E]/10 rounded-full">
            <FaPhone className="text-[#03045E]" />
          </div>
          <a
            href="tel:+923313649161"
            className="hover:text-[#00B4D8] transition-colors duration-200"
          >
            +92 331 3649161
          </a>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#03045E]/10 rounded-full">
            <FaEnvelope className="text-[#03045E]" />
          </div>
          <a
            href="mailto:info@karachipaint.com"
            className="hover:text-[#00B4D8] transition-colors duration-200"
          >
            info@karachipaint.com
          </a>
        </div>
      </div>

      {/* Right Social Links */}
      <div className="flex items-center gap-3">
        <a
          href="#"
          className="w-7 h-7 flex items-center justify-center rounded-full bg-[#03045E] hover:bg-[#00B4D8] text-white transition-all duration-200 shadow-sm"
        >
          <FaFacebookF className="text-xs" />
        </a>
        <a
          href="#"
          className="w-7 h-7 flex items-center justify-center rounded-full bg-[#03045E] hover:bg-[#00B4D8] text-white transition-all duration-200 shadow-sm"
        >
          <FaInstagram className="text-xs" />
        </a>
        <a
          href="#"
          className="w-7 h-7 flex items-center justify-center rounded-full bg-[#03045E] hover:bg-[#00B4D8] text-white transition-all duration-200 shadow-sm"
        >
          <FaWhatsapp className="text-xs" />
        </a>
      </div>
    </div>
  );
};

export default TopBar;
