"use client";
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 text-neutral-100 pt-14">
      {/* Upper Section */}
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 pb-14 border-b border-slate-500/40">
        {/* Logo & Description */}
        <div className="w-full md:w-2/5 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-neutral-100">
          Quality<span className="text-blue-300"> Paint Palace</span>
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-neutral-300 max-w-sm mx-auto md:mx-0">
            We bring premium paint brands like <b>Gobi’s</b>, <b>ICI</b>, and{" "}
            <b>Diamond Paints</b> to homes across Pakistan. Experience color,
            protection, and quality like never before.
          </p>
        </div>

        {/* Company Links */}
        <div className="w-full md:w-1/4 flex items-center justify-center">
          <div className="text-center md:text-left">
            <h2 className="font-semibold text-neutral-100 mb-5 text-lg">
              Company
            </h2>
            <ul className="text-sm space-y-2">
              {["Home", "About Us", "Contact Us", "Privacy Policy"].map(
                (link, i) => {
                  const path =
                    link === "Home"
                      ? "/"
                      : `/${link.toLowerCase().replace(/\s+/g, "-")}`;
                  return (
                    <li key={i}>
                      <a
                        href={path}
                        className="hover:text-blue-300 hover:underline transition-all"
                      >
                        {link}
                      </a>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="w-full md:w-1/4 flex items-start justify-center">
          <div className="text-center md:text-left">
            <h2 className="font-semibold text-neutral-100 mb-5 text-lg">
              Get in Touch
            </h2>
            <div className="text-sm space-y-2">
              <p className="hover:text-blue-300 transition-all cursor-pointer">
                +92 331 3649161
              </p>
              <p className="hover:text-blue-300 transition-all cursor-pointer break-all">
                support@RangReza.pk
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-neutral-200 py-4">
        <p className="text-center text-xs sm:text-sm tracking-wide px-2">
          © {new Date().getFullYear()} Quality Paint Palace.pk — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
