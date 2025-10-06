"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";

const Product = () => {
  const { id } = useParams();
  const { products, paintProducts, router, addToCart } = useAppContext();

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (!id || (!products.length && !paintProducts.length)) return;

    const foundProduct =
      products.find((p) => p._id === id) ||
      paintProducts.find((p) => p._id === id);

    setProductData(foundProduct || null);
  }, [id, products, paintProducts]);

  if (!productData) return <Loading />;

  // ✅ Support both normal and paint product images
  const images =
    productData.images ||
    productData.image ||
    productData.shadeCardImages ||
    [];

  const validImages = Array.isArray(images)
    ? images.filter((img) => img && img.trim() !== "")
    : [];

  const main = mainImage || validImages[0] || assets.placeholder;

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* LEFT - IMAGES */}
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-100 mb-4">
              {main ? (
                <Image
                  src={main}
                  alt={productData.name || productData.title || "Product image"}
                  width={1280}
                  height={720}
                  className="w-full h-auto object-cover"
                />
              ) : (
                <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}
            </div>

            {validImages.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {validImages.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setMainImage(image)}
                    className="cursor-pointer rounded-lg overflow-hidden bg-gray-100 hover:opacity-80"
                  >
                    <Image
                      src={image}
                      alt={`${productData.name || productData.title}-${index}`}
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT - DETAILS */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800 mb-4">
              {productData.name || productData.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <Image
                    key={i}
                    src={assets.star_icon}
                    alt="star"
                    width={16}
                    height={16}
                    className="h-4 w-4"
                  />
                ))}
                <Image
                  src={assets.star_dull_icon}
                  alt="star_dull"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
              </div>
              <p className="text-gray-500">(4.5)</p>
            </div>

            <p className="text-gray-600 mt-3">
              {productData.description || "No description available."}
            </p>

            {/* Price */}
            {productData.price || productData.offerPrice ? (
              <p className="text-3xl font-medium mt-6">
                ${productData.offerPrice || productData.price}
                {productData.offerPrice && (
                  <span className="text-base font-normal text-gray-500 line-through ml-2">
                    ${productData.price}
                  </span>
                )}
              </p>
            ) : (
              <p className="text-lg text-gray-500 mt-6">Price not available</p>
            )}

            <hr className="bg-gray-300 my-6" />

            {/* Product Info */}
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full max-w-72">
                <tbody>
                  <tr>
                    <td className="text-gray-600 font-medium">Brand</td>
                    <td className="text-gray-800/70">Generic</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Color</td>
                    <td className="text-gray-800/70">Multi</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Category</td>
                    <td className="text-gray-800/70">
                      {productData.category || "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Buttons */}
            <div className="flex items-center mt-10 gap-4">
              <button
                onClick={() => addToCart(productData._id)}
                className="w-full py-3.5 bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(productData._id);
                  router.push("/cart");
                }}
                className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        {/* FEATURED PRODUCTS */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              Featured <span className="text-orange-600">Products</span>
            </p>
            <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {products.slice(0, 5).map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>

          <button className="px-8 py-2 mb-16 border rounded text-gray-500 hover:bg-slate-50 transition">
            See more
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
