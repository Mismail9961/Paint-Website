"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { assets } from "@/assets/assets"; // ensure upload_area exists here
import toast from "react-hot-toast";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
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

      // ✅ Prepare form data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("price", price);
      if (offerPrice) formData.append("offerPrice", offerPrice);
      formData.append("images", image);

      // ✅ Send data to API
      const { data } = await axios.post("/api/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast("Product added successfully!");
      setTitle("");
      setDescription("");
      setQuantity("");
      setPrice("");
      setOfferPrice("");
      setImage(null);
    } catch (err) {
      console.error("Error adding product:", err);
      const errMsg =
        err.response?.data?.error || err.message || "Something went wrong";
      setMessage("❌ " + errMsg);
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

        {/* Quantity / Price / Offer Price */}
        <div className="flex items-center gap-5 flex-wrap">
          {/* Quantity */}
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

          {/* Price */}
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          {/* Offer Price */}
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offerPrice">
              Offer Price
            </label>
            <input
              id="offerPrice"
              type="number"
              placeholder="(optional)"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
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
      </form>
    </div>
  );
};

export default AddProduct;
