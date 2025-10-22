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
    <div className="bg-[#E4E8EE] text-[#324053] text-sm py-2.5 px-6 md:px-16 lg:px-32 flex flex-col md:flex-row items-center justify-between gap-2 border-b border-[#d3d8df] shadow-sm">
      {/* Left Info */}
      <div className="flex flex-wrap items-center gap-6 font-medium">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#4CAF50]/20 rounded-full">
            <FaPhone className="text-[#4CAF50]" />
          </div>
          <span className="hover:text-[#4CAF50] transition-colors duration-200">
            +92 331 3649161
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#324053]/10 rounded-full">
            <FaEnvelope className="text-[#324053]" />
          </div>
          <a
            href="mailto:info@karachipaint.com"
            className="hover:text-[#324053]/70 transition-colors duration-200"
          >
            info@karachipaint.com
          </a>
        </div>
      </div>

      {/* Right Social Links */}
      <div className="flex items-center gap-3 mt-1 md:mt-0">
        <a
          href="#"
          className="w-7 h-7 flex items-center justify-center rounded-full bg-[#324053] hover:bg-[#4CAF50] text-white transition-all duration-200 shadow-sm"
        >
          <FaFacebookF className="text-xs" />
        </a>
        <a
          href="#"
          className="w-7 h-7 flex items-center justify-center rounded-full bg-[#324053] hover:bg-[#E4405F] text-white transition-all duration-200 shadow-sm"
        >
          <FaInstagram className="text-xs" />
        </a>
        <a
          href="#"
          className="w-7 h-7 flex items-center justify-center rounded-full bg-[#324053] hover:bg-[#25D366] text-white transition-all duration-200 shadow-sm"
        >
          <FaWhatsapp className="text-xs" />
        </a>
      </div>
    </div>
  );
};

export default TopBar;
