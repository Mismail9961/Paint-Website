"use client";
import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets"; // make sure upload_area is defined here

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (!image) {
        setMessage("❌ Please upload an image before submitting");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("images", image);

      const res = await fetch("/api/products/add", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to add product");
      }

      setMessage("✅ Product added successfully!");
      setTitle("");
      setDescription("");
      setQuantity("");
      setImage(null);
    } catch (err) {
      console.error("Error adding product:", err);
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form
        onSubmit={handleSubmit}
        className="md:p-10 p-4 space-y-6"
      >
        {/* Product Image */}
        <div>
          <p className="text-base font-medium">Product Image (1 required)</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <label htmlFor="productImage">
              <input
                type="file"
                id="productImage"
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <Image
                className="max-w-24 cursor-pointer rounded border"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Product"
                width={100}
                height={100}
              />
            </label>
          </div>
        </div>

        {/* Product Title */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="title">
            Product Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="quantity">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`px-8 py-2.5 rounded font-medium text-white ${
            loading ? "bg-gray-400" : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {loading ? "Uploading..." : "ADD PRODUCT"}
        </button>

        {/* Message */}
        {message && (
          <p
            className={`mt-3 text-sm ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
