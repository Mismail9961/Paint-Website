"use client";

import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* ===== Header Section ===== */}
      <div className="bg-gradient-to-r from-[#0a9396] to-[#94d2bd] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg text-white/90">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* ===== Content Section ===== */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Introduction */}
        <section className="mb-10">
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            Welcome to our Privacy Policy page. Your privacy is critically
            important to us. This Privacy Policy document contains the types of
            information that are collected and recorded by our website and how
            we use it.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#0a9396] mb-4 pb-2 border-b-2 border-[#94d2bd]">
            Information We Collect
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
            We collect several different types of information for various
            purposes to provide and improve our service to you.
          </p>

          <div className="space-y-5">
            {/* Personal Data */}
            <div className="bg-[#94d2bd]/20 border border-[#94d2bd]/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-[#0a9396] mb-2">
                Personal Data
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                While using our service, we may ask you to provide us with
                certain personally identifiable information that can be used to
                contact or identify you. This may include, but is not limited
                to:
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1 ml-4 text-sm sm:text-base">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Cookies and Usage Data</li>
              </ul>
            </div>

            {/* Usage Data */}
            <div className="bg-[#94d2bd]/20 border border-[#94d2bd]/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-[#0a9396] mb-2">
                Usage Data
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                We may also collect information on how the service is accessed
                and used. This Usage Data may include information such as your
                IP address, browser type, the pages you visit, and the time you
                spend on our site.
              </p>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#0a9396] mb-4 pb-2 border-b-2 border-[#94d2bd]">
            How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
            We use the collected data for various purposes:
          </p>
          <ul className="space-y-3 text-sm sm:text-base">
            {[
              "To provide and maintain our service",
              "To notify you about changes to our service",
              "To allow participation in interactive features",
              "To provide customer support",
              "To gather analysis to improve our service",
              "To monitor service usage",
              "To detect and prevent technical issues",
              "To provide updates, offers, and general info",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-[#0a9396] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Data Security */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#0a9396] mb-4 pb-2 border-b-2 border-[#94d2bd]">
            Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            The security of your data is important to us. However, no method of
            transmission over the Internet or electronic storage is 100%
            secure. While we strive to protect your data, we cannot guarantee
            absolute security.
          </p>
        </section>

        {/* Cookies */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#0a9396] mb-4 pb-2 border-b-2 border-[#94d2bd]">
            Cookies & Tracking Technologies
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
            We use cookies and similar tracking technologies to track activity
            on our service and store certain information. You can instruct your
            browser to refuse cookies; however, some parts of the site may not
            function properly.
          </p>
        </section>

        {/* Third-Party Services */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#0a9396] mb-4 pb-2 border-b-2 border-[#94d2bd]">
            Third-Party Services
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            We may employ third-party companies to facilitate our service. These
            parties are obligated not to disclose or use your personal data for
            any other purpose.
          </p>
        </section>

        {/* Your Rights */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#0a9396] mb-4 pb-2 border-b-2 border-[#94d2bd]">
            Your Rights
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
            Depending on your location, you may have certain rights regarding
            your personal information:
          </p>
          <div className="bg-[#94d2bd]/20 border border-[#94d2bd]/50 p-4 rounded-lg space-y-2">
            <p>
              <strong className="text-[#0a9396]">Right to Access:</strong> You
              can request copies of your data.
            </p>
            <p>
              <strong className="text-[#0a9396]">Right to Rectification:</strong>{" "}
              You can ask us to correct inaccurate info.
            </p>
            <p>
              <strong className="text-[#0a9396]">Right to Erasure:</strong> You
              can request data deletion under certain conditions.
            </p>
            <p>
              <strong className="text-[#0a9396]">Right to Portability:</strong>{" "}
              You can request data transfer to another service.
            </p>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#0a9396] mb-4 pb-2 border-b-2 border-[#94d2bd]">
            Children's Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            We do not knowingly collect data from children under 13. If you
            believe your child has provided us information, please contact us.
          </p>
        </section>

        {/* Changes */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#0a9396] mb-4 pb-2 border-b-2 border-[#94d2bd]">
            Changes to This Policy
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            We may update this policy periodically. Updates will be reflected
            here with a new “Last updated” date.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#0a9396] mb-4 pb-2 border-b-2 border-[#94d2bd]">
            Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
            If you have any questions about this Privacy Policy, contact us:
          </p>
          <div className="bg-gradient-to-r from-[#0a9396] to-[#94d2bd] text-white p-6 rounded-lg shadow-md">
            <p className="mb-2">
              <strong>Email:</strong> privacy@yourcompany.com
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> +92 XXX XXXXXXX
            </p>
            <p>
              <strong>Address:</strong> Your Company Address, Karachi, Pakistan
            </p>
          </div>
        </section>
      </div>

      {/* iPhone 5s Optimization */}
      <style jsx>{`
        @media (max-width: 320px) {
          h1 {
            font-size: 1.5rem !important;
          }
          h2 {
            font-size: 1.2rem !important;
          }
          p,
          li {
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;
