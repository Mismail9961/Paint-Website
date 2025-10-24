"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, XCircle, CheckCircle } from "lucide-react";
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
  const [success, setSuccess] = useState(null);
  const [serverError, setServerError] = useState(null);

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
    setSuccess(null);
    setServerError(null);
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

      toast("Thanks! Your message was sent. We'll reply within 24 hours.");
      setForm({ name: "", email: "", orderNumber: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      setServerError(err?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 bg-white text-[#2F3C50]">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-semibold">Contact Us</h1>
        <p className="mt-2 text-[#2F3C50]/80">
          Need help with an order, returns or product details? We&apos;re here for you.
        </p>
      </motion.header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <aside className="space-y-6">
          <div className="rounded-2xl p-6 shadow-sm border bg-[#2F3C50] text-white">
            <h3 className="text-lg font-medium">Customer Support</h3>
            <p className="mt-2 text-sm text-white/80">Mon - Fri: 9:00 — 18:00 (PKT)</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 shrink-0" />
                <div>
                  <dt className="font-medium">Phone</dt>
                  <dd className="text-white/80">+92 3102437201</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 shrink-0" />
                <div>
                  <dt className="font-medium">Email</dt>
                  <dd className="text-white/80">sheikhmuhammadismail79@gmail.com</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0" />
                <div>
                  <dt className="font-medium">Address</dt>
                  <dd className="text-white/80">Gulberg, Karachi, Pakistan</dd>
                </div>
              </div>
            </dl>
            <div className="mt-6 flex gap-3">
              <a href="/faq" className="text-sm underline">
                FAQ
              </a>
              <a href="/returns" className="text-sm underline">
                Returns & Refunds
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border">
            <iframe
              title="Store location"
              className="w-full h-52"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.1234567890123!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190123456789ab%3A0xc0ffee123456789!2sGulberg%2C%20Lahore!5e0!3m2!1sen!2s!4v1699999999999"
            />
          </div>

          <div className="rounded-2xl p-4 bg-[#2F3C50]/10 border border-[#2F3C50]">
            <h4 className="text-sm font-medium">Pro tip</h4>
            <p className="text-sm mt-2">
              Include your order number if your message is about an existing order — it helps us
              resolve things faster.
            </p>
          </div>
        </aside>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 rounded-2xl border p-6 bg-white shadow-sm"
          aria-label="Contact form"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Full name</label>
              <input
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                  errors.name ? "border-red-400 focus:ring-red-200" : "border-[#2F3C50]"
                }`}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                  errors.email ? "border-red-400 focus:ring-red-200" : "border-[#2F3C50]"
                }`}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@domain.com"
                type="email"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Order number (optional)</label>
              <input
                className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm border-[#2F3C50]"
                value={form.orderNumber}
                onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                placeholder="e.g. #123456"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Subject</label>
              <input
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                  errors.subject ? "border-red-400 focus:ring-red-200" : "border-[#2F3C50]"
                }`}
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="What is this about?"
              />
              {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Message</label>
            <textarea
              className={`mt-1 block w-full rounded-md border px-3 py-2 min-h-[140px] shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                errors.message ? "border-red-400 focus:ring-red-200" : "border-[#2F3C50]"
              }`}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us what's happening and what you'd like us to do — include relevant details."
            />
            {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-[#2F3C50] text-white px-4 py-2 text-sm font-medium shadow hover:opacity-95 disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send message"}
            </button>

            <button
              type="button"
              onClick={() => {
                setForm({ name: "", email: "", orderNumber: "", subject: "", message: "" });
                setErrors({});
                setSuccess(null);
                setServerError(null);
              }}
              className="text-sm underline"
            >
              Reset
            </button>

            <div className="ml-auto text-sm text-[#2F3C50]/80">
              <span className="inline-flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Response time: <strong className="ml-1">within 24 hours</strong>
              </span>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
