"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";

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

  const images = productData.images?.filter(Boolean) || [];
  const main = mainImage || images[0] || assets.placeholder;

  // Get featured products based on product type
  const featuredProducts = isPaintProduct 
    ? paintProducts.filter((p) => p._id !== id).slice(0, 5)
    : products.filter((p) => p._id !== id).slice(0, 5);

  const handleBuyNow = () => {
    if (isPaintProduct) setShowShadeModal(true);
    else {
      addToCart(productData._id);
      router.push("/cart");
    }
  };

  const handleConfirmShade = () => {
    if (!shadeNumber.trim()) {
      toast.error("Please enter a shade number.");
      return;
    }
    addToCart(productData._id, { shadeNumber });
    setShowShadeModal(false);
    router.push("/cart");
  };

  return (
    <>
      <div className="px-3 sm:px-6 md:px-12 lg:px-20 pt-14 space-y-10 bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* LEFT IMAGES */}
          <div className="px-2 sm:px-4 md:px-8">
            <div className="rounded-lg overflow-hidden bg-slate-100 mb-4 flex justify-center items-center shadow-sm">
              <Image
                src={main}
                alt={productData.title || productData.name}
                width={1280}
                height={720}
                className="w-full h-auto max-h-[380px] sm:max-h-[500px] md:max-h-[600px] object-contain"
              />
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`cursor-pointer rounded-lg overflow-hidden bg-slate-200 hover:ring-2 hover:ring-slate-500 transition-all duration-200 ${
                    mainImage === img ? "ring-2 ring-slate-700" : ""
                  }`}
                >
                  <Image
                    src={img}
                    alt={`img-${i}`}
                    width={300}
                    height={300}
                    className="w-full h-[60px] sm:h-[90px] md:h-[120px] lg:h-[140px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="flex flex-col text-slate-800">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3">
              {productData.title || productData.name}
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {productData.description || "No description available."}
            </p>

            <p className="text-2xl sm:text-3xl font-semibold mt-6 text-slate-900">
              PKR {productData.offerPrice || productData.price}
              {productData.offerPrice && (
                <span className="text-sm sm:text-base font-normal text-slate-500 line-through ml-2">
                  PKR {productData.price}
                </span>
              )}
            </p>

            <hr className="bg-slate-300 my-6" />

            {isPaintProduct && (
              <div className="text-sm text-slate-700 space-y-1">
                <p>
                  <strong>Category:</strong> {productData.category}
                </p>
                <p>
                  <strong>Brand:</strong> {productData.brandCategory}
                </p>
                <p>
                  <strong>Quantity:</strong> {productData.quantity}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center mt-10 gap-3 sm:gap-4">
              <button
                onClick={() => addToCart(productData._id)}
                className="w-full py-3.5 bg-slate-200 text-slate-800 hover:bg-slate-300 rounded-lg transition text-sm sm:text-base"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-slate-700 text-white hover:bg-slate-800 rounded-lg transition text-sm sm:text-base"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* FEATURED PRODUCTS */}
        {featuredProducts.length > 0 && (
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center mb-4 mt-16">
              <p className="text-2xl sm:text-3xl font-semibold text-slate-800">
                Featured <span className="text-slate-600">
                  {isPaintProduct ? "Paint Products" : "Products"}
                </span>
              </p>
              <div className="w-28 h-0.5 bg-slate-700 mt-2"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mt-6 pb-14 w-full">
              {featuredProducts.map((p, i) => (
                <ProductCard key={i} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SHADE MODAL */}
      {showShadeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full sm:w-[90%] md:w-[80%] h-[95%] overflow-y-auto flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 text-center">
              Select Your Shade
            </h2>
            <p className="text-slate-500 text-center text-sm sm:text-lg mt-2">
              Hover to zoom and inspect shade details closely.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mt-10">
              {productData.shadeCardImages?.map((img, i) => (
                <div
                  key={i}
                  className="relative bg-slate-100 border border-slate-300 rounded-xl overflow-hidden group flex justify-center items-center"
                  style={{
                    width: "100%",
                    maxWidth: "1200px",
                    height: "300px",
                  }}
                >
                  <Image
                    src={img}
                    alt={`Shade ${i + 1}`}
                    width={1200}
                    height={800}
                    className="object-contain w-full h-full transform transition-transform duration-500 group-hover:scale-150"
                  />
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-center text-sm sm:text-lg mt-2">
              Enter the right number or else your order will be rejected
            </p>
            <input
              type="text"
              placeholder="Enter Shade Number"
              value={shadeNumber}
              onChange={(e) => setShadeNumber(e.target.value)}
              className="w-full sm:w-1/2 border px-4 py-3 rounded-lg mt-10 outline-none focus:ring-2 focus:ring-slate-600 text-center text-lg text-slate-800"
            />
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 mb-6 w-full sm:w-auto">
              <button
                onClick={() => setShowShadeModal(false)}
                className="px-8 py-3 border rounded-lg hover:bg-slate-100 text-slate-700 text-base sm:text-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmShade}
                className="px-8 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 text-base sm:text-lg"
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