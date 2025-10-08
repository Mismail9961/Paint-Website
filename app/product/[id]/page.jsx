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
  const [isPaintProduct, setIsPaintProduct] = useState(false);
  const [showShadeModal, setShowShadeModal] = useState(false);
  const [shadeNumber, setShadeNumber] = useState("");

  useEffect(() => {
    if (!id || (!products.length && !paintProducts.length)) return;

    const foundNormal = products.find((p) => p._id === id);
    const foundPaint = paintProducts.find((p) => p._id === id);

    if (foundPaint) {
      setProductData(foundPaint);
      setIsPaintProduct(true);
    } else if (foundNormal) {
      setProductData(foundNormal);
      setIsPaintProduct(false);
    }
  }, [id, products, paintProducts]);

  if (!productData) return <Loading />;

  const images = [
    ...(productData.images || []),
    ...(productData.shadeCardImages || []),
  ].filter(Boolean);

  const main = mainImage || images[0] || assets.placeholder;

  const handleBuyNow = () => {
    if (isPaintProduct) setShowShadeModal(true);
    else {
      addToCart(productData._id);
      router.push("/cart");
    }
  };

  const handleConfirmShade = () => {
    if (!shadeNumber.trim()) {
      alert("Please enter a shade number.");
      return;
    }
    addToCart(productData._id, { shadeNumber });
    setShowShadeModal(false);
    router.push("/cart");
  };

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* LEFT IMAGES */}
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-100 mb-4">
              <Image
                src={main}
                alt={productData.title || productData.name}
                width={1280}
                height={720}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(img)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-100 hover:opacity-80"
                >
                  <Image
                    src={img}
                    alt={`img-${i}`}
                    width={300}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800 mb-4">
              {productData.title || productData.name}
            </h1>
            <p className="text-gray-600 mt-3">
              {productData.description || "No description available."}
            </p>

            <p className="text-3xl font-medium mt-6">
              ${productData.offerPrice || productData.price}
              {productData.offerPrice && (
                <span className="text-base font-normal text-gray-500 line-through ml-2">
                  ${productData.price}
                </span>
              )}
            </p>

            <hr className="bg-gray-300 my-6" />

            {isPaintProduct && (
              <div className="text-sm text-gray-700">
                <p>
                  <strong>Category:</strong> {productData.category}
                </p>
                <p>
                  <strong>Quantity:</strong> {productData.quantity}
                </p>
              </div>
            )}

            <div className="flex items-center mt-10 gap-4">
              <button
                onClick={() => addToCart(productData._id)}
                className="w-full py-3.5 bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* FEATURED */}
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
        </div>
      </div>

      <Footer />

      {/* SHADE MODAL */}
      {showShadeModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              Select Your Shade
            </h2>
            <p className="text-gray-500 text-center text-sm">
              Enter your desired shade number from the shade cards below.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {productData.shadeCardImages?.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`Shade ${i + 1}`}
                  width={300}
                  height={300}
                  className="rounded-lg border object-cover"
                />
              ))}
            </div>

            <input
              type="text"
              placeholder="Enter Shade Number"
              value={shadeNumber}
              onChange={(e) => setShadeNumber(e.target.value)}
              className="w-full border px-3 py-2 rounded mt-4 outline-none focus:ring-2 focus:ring-orange-500"
            />

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowShadeModal(false)}
                className="w-1/2 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmShade}
                className="w-1/2 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
