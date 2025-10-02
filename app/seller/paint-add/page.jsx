"use client";
import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets"; // your upload icon asset

const AddPaint = () => {
  const [paintImages, setPaintImages] = useState([null, null]);
  const [shadeImages, setShadeImages] = useState([null, null]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("gallon");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("category", category);

      paintImages.forEach((file) => {
        if (file) formData.append("images", file);
      });

      shadeImages.forEach((file) => {
        if (file) formData.append("shadeCardImages", file);
      });

      const res = await fetch("/api/paintProduct/add", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Paint product added successfully!");
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Error adding paint:", err);
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form
        onSubmit={handleSubmit}
        className="md:p-10 p-4 space-y-5 max-w-lg"
      >
        {/* Paint Images */}
        <div>
          <p className="text-base font-medium">Paint Images (2 required)</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {paintImages.map((file, index) => (
              <label key={index} htmlFor={`paintImage${index}`}>
                <input
                  type="file"
                  id={`paintImage${index}`}
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const updated = [...paintImages];
                    updated[index] = e.target.files[0];
                    setPaintImages(updated);
                  }}
                />
                <Image
                  className="max-w-24 cursor-pointer"
                  src={
                    file ? URL.createObjectURL(file) : assets.upload_area
                  }
                  alt="Paint image"
                  width={100}
                  height={100}
                />
              </label>
            ))}
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
                  className="max-w-24 cursor-pointer"
                  src={
                    file ? URL.createObjectURL(file) : assets.upload_area
                  }
                  alt="Shade image"
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="title">
            Paint Title
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

        {/* Description */}
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

        {/* Quantity + Category */}
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
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="gallon">Gallon</option>
              <option value="drum">Drum</option>
              <option value="quarter">Quarter</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded"
        >
          ADD PAINT
        </button>
      </form>
    </div>
  );
};

export default AddPaint;
