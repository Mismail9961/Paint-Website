"use client";
import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { toast } from "react-hot-toast";

const AddPaint = () => {
  const [paintImage, setPaintImage] = useState(null);
  const [shadeImages, setShadeImages] = useState([null, null]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("gallon");
  const [brandCategory, setBrandCategory] = useState("ICI");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!paintImage || shadeImages.some((img) => img === null)) {
      toast.error("Please upload 1 paint image and 2 shade card images.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("category", category);
      formData.append("brandCategory", brandCategory);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);

      formData.append("images", paintImage);
      shadeImages.forEach((file) => {
        if (file) formData.append("shadeCardImages", file);
      });

      const res = await fetch("/api/paintProduct/add", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Paint product added successfully!");
        setTitle("");
        setDescription("");
        setQuantity("");
        setCategory("gallon");
        setBrandCategory("ICI");
        setPrice("");
        setOfferPrice("");
        setPaintImage(null);
        setShadeImages([null, null]);
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("❌ Error adding paint:", err);
      toast.error("Failed to add paint product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col py-8 px-8 md:px-16 lg:px-24">
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800">Add Paint Product</h2>

        {/* Paint Image */}
        <div>
          <p className="text-base font-medium">Paint Image (1 required)</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <label htmlFor="paintImage">
              <input
                type="file"
                id="paintImage"
                hidden
                accept="image/*"
                onChange={(e) => setPaintImage(e.target.files[0])}
              />
              <Image
                className="max-w-24 cursor-pointer rounded-lg border hover:opacity-90"
                src={paintImage ? URL.createObjectURL(paintImage) : assets.upload_area}
                alt="Paint image"
                width={100}
                height={100}
              />
            </label>
          </div>
        </div>

        {/* Shade Card Images */}
        <div>
          <p className="text-base font-medium">Shade Card Images (2 required)</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {shadeImages.map((file, index) => (
              <label key={index} htmlFor={`shadeImage${index}`}>
                <input
                  type="file"
                  id={`shadeImage${index}`}
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const updated = [...shadeImages];
                    updated[index] = e.target.files[0];
                    setShadeImages(updated);
                  }}
                />
                <Image
                  className="max-w-24 cursor-pointer rounded-lg border hover:opacity-90"
                  src={file ? URL.createObjectURL(file) : assets.upload_area}
                  alt={`Shade ${index + 1}`}
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="title">
            Paint Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Type here"
            className="outline-none py-2 px-3 rounded border border-gray-300"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Type here"
            className="outline-none py-2 px-3 rounded border border-gray-300 resize-none"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>

        {/* Quantity, Category, Brand */}
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="quantity">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              placeholder="0"
              className="outline-none py-2 px-3 rounded border border-gray-300"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none py-2 px-3 rounded border border-gray-300"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="gallon">Gallon</option>
              <option value="drum">Drum</option>
              <option value="quarter">Quarter</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-40">
            <label className="text-base font-medium" htmlFor="brandCategory">
              Brand
            </label>
            <select
              id="brandCategory"
              className="outline-none py-2 px-3 rounded border border-gray-300"
              onChange={(e) => setBrandCategory(e.target.value)}
              value={brandCategory}
              required
            >
              <option value="ICI">ICI</option>
              <option value="Dulux">Dulux</option>
              <option value="Brighto">Brighto</option>
              <option value="Diamond">Diamond</option>
              <option value="Gobis">Gobis</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Price & Offer Price */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="price">
              Price (PKR)
            </label>
            <input
              id="price"
              type="number"
              placeholder="0"
              className="outline-none py-2 px-3 rounded border border-gray-300"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offerPrice">
              Offer Price (PKR)
            </label>
            <input
              id="offerPrice"
              type="number"
              placeholder="0"
              className="outline-none py-2 px-3 rounded border border-gray-300"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`px-8 py-2.5 bg-orange-600 text-white font-medium rounded transition ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-orange-700"
          }`}
        >
          {loading ? "Adding..." : "ADD PAINT"}
        </button>
      </form>
    </div>
  );
};

export default AddPaint;
