"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    orderNumber: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      e.email = "Please enter a valid email.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Message should be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to send message.");

      toast.success("Thanks! Your message was sent. We'll reply within 24 hours.");
      setForm({ name: "", email: "", orderNumber: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      toast.error(err?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="w-full mx-auto px-3 sm:px-6 md:px-10 py-10 bg-white text-black min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center sm:text-left"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A9396]">
          Contact Us
        </h1>
        <p className="mt-2 text-gray-700 text-sm sm:text-base">
          Need help with an order, returns, or product details? We’re here for you.
        </p>
      </motion.header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Contact Info */}
        <aside className="space-y-6">
          <div className="rounded-2xl p-6 shadow-md border border-[#94D2BD]/40 bg-[#94D2BD]/20">
            <h3 className="text-lg font-semibold text-[#0A9396]">
              Customer Support
            </h3>
            <p className="mt-1 text-sm text-gray-800">
              Mon – Fri : 9:00 — 18:00 (PKT)
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 shrink-0 text-[#0A9396]" />
                <div>
                  <dt className="font-medium">Phone</dt>
                  <dd className="text-gray-700">+92 310 2437201</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 shrink-0 text-[#0A9396]" />
                <div>
                  <dt className="font-medium">Email</dt>
                  <dd className="text-gray-700">
                    sheikhmuhammadismail79@gmail.com
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-[#0A9396]" />
                <div>
                  <dt className="font-medium">Address</dt>
                  <dd className="text-gray-700">Gulberg, Karachi, Pakistan</dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#94D2BD]/40">
            <iframe
              title="Store location"
              className="w-full h-52"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.1234567890123!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190123456789ab%3A0xc0ffee123456789!2sGulberg%2C%20Lahore!5e0!3m2!1sen!2s!4v1699999999999"
            />
          </div>

          <div className="rounded-2xl p-4 bg-[#94D2BD]/20 border border-[#0A9396]/30">
            <h4 className="text-sm font-semibold text-[#0A9396]">Pro tip</h4>
            <p className="text-sm mt-2 text-gray-800">
              Include your order number if your message is about an existing
              order — it helps us resolve faster.
            </p>
          </div>
        </aside>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="lg:col-span-2 rounded-2xl border border-[#94D2BD]/40 p-6 bg-[#94D2BD]/10 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["name", "email", "orderNumber", "subject"].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium capitalize text-[#0A9396]">
                  {field === "orderNumber"
                    ? "Order number (optional)"
                    : field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  placeholder={
                    field === "email"
                      ? "you@domain.com"
                      : `Enter your ${field}`
                  }
                  value={form[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                    errors[field]
                      ? "border-red-400 focus:ring-red-200"
                      : "border-[#0A9396]/60 focus:ring-[#94D2BD]"
                  } bg-white text-black placeholder-gray-500`}
                />
                {errors[field] && (
                  <p className="mt-1 text-xs text-red-500">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-[#0A9396]">
              Message
            </label>
            <textarea
              placeholder="Type your message here..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`mt-1 block w-full rounded-md border px-3 py-2 min-h-[140px] text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                errors.message
                  ? "border-red-400 focus:ring-red-200"
                  : "border-[#0A9396]/60 focus:ring-[#94D2BD]"
              } bg-white text-black placeholder-gray-500`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-500">{errors.message}</p>
            )}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0A9396] text-white px-4 py-2 font-medium shadow hover:opacity-95 disabled:opacity-60 transition-all"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
            <button
              type="button"
              onClick={() =>
                setForm({
                  name: "",
                  email: "",
                  orderNumber: "",
                  subject: "",
                  message: "",
                })
              }
              className="text-sm underline text-[#0A9396]"
            >
              Reset
            </button>

            <div className="ml-auto mt-2 sm:mt-0 text-sm flex items-center gap-2 text-[#0A9396]">
              <CheckCircle className="w-4 h-4" />
              Response time: <strong className="ml-1">within 24 hours</strong>
            </div>
          </div>
        </motion.form>
      </section>
    </main>
  );
}
