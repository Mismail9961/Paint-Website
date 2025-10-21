"use client";

import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-[#3C4A5C] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-200">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Introduction */}
        <section className="mb-10">
          <p className="text-gray-700 leading-relaxed">
            Welcome to our Privacy Policy page. Your privacy is critically important to us. This Privacy Policy document contains types of information that is collected and recorded by our website and how we use it.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#3C4A5C] mb-4 pb-2 border-b-2 border-[#3C4A5C]">
            Information We Collect
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We collect several different types of information for various purposes to provide and improve our service to you.
          </p>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-[#3C4A5C] mb-2">Personal Data</h3>
              <p className="text-gray-700">
                While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include, but is not limited to:
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1 ml-4">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Cookies and Usage Data</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-[#3C4A5C] mb-2">Usage Data</h3>
              <p className="text-gray-700">
                We may also collect information on how the service is accessed and used. This Usage Data may include information such as your computer's Internet Protocol address, browser type, browser version, the pages of our service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.
              </p>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#3C4A5C] mb-4 pb-2 border-b-2 border-[#3C4A5C]">
            How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use the collected data for various purposes:
          </p>
          <ul className="space-y-3">
            {[
              "To provide and maintain our service",
              "To notify you about changes to our service",
              "To allow you to participate in interactive features of our service when you choose to do so",
              "To provide customer support",
              "To gather analysis or valuable information so that we can improve our service",
              "To monitor the usage of our service",
              "To detect, prevent and address technical issues",
              "To provide you with news, special offers and general information about other goods, services and events"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-[#3C4A5C] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Data Security */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#3C4A5C] mb-4 pb-2 border-b-2 border-[#3C4A5C]">
            Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>
        </section>

        {/* Cookies */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#3C4A5C] mb-4 pb-2 border-b-2 border-[#3C4A5C]">
            Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use cookies and similar tracking technologies to track the activity on our service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
          </p>
        </section>

        {/* Third-Party Services */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#3C4A5C] mb-4 pb-2 border-b-2 border-[#3C4A5C]">
            Third-Party Services
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may employ third-party companies and individuals to facilitate our service, to provide the service on our behalf, to perform service-related services or to assist us in analyzing how our service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>
        </section>

        {/* Your Rights */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#3C4A5C] mb-4 pb-2 border-b-2 border-[#3C4A5C]">
            Your Rights
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Depending on your location, you may have certain rights regarding your personal information:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <p className="text-gray-700"><strong className="text-[#3C4A5C]">Right to Access:</strong> You have the right to request copies of your personal data.</p>
            <p className="text-gray-700"><strong className="text-[#3C4A5C]">Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</p>
            <p className="text-gray-700"><strong className="text-[#3C4A5C]">Right to Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</p>
            <p className="text-gray-700"><strong className="text-[#3C4A5C]">Right to Data Portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you.</p>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#3C4A5C] mb-4 pb-2 border-b-2 border-[#3C4A5C]">
            Children's Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us.
          </p>
        </section>

        {/* Changes to Privacy Policy */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#3C4A5C] mb-4 pb-2 border-b-2 border-[#3C4A5C]">
            Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#3C4A5C] mb-4 pb-2 border-b-2 border-[#3C4A5C]">
            Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="bg-[#3C4A5C] text-white p-6 rounded-lg">
            <p className="mb-2"><strong>Email:</strong> privacy@yourcompany.com</p>
            <p className="mb-2"><strong>Phone:</strong> +92 XXX XXXXXXX</p>
            <p><strong>Address:</strong> Your Company Address, Karachi, Pakistan</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;