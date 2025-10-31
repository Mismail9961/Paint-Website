"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react"; // ✅ icon for checkpoints

const Product = () => {
  const { id } = useParams();
  const { products, paintProducts, router, addToCart } = useAppContext();

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [isPaintProduct, setIsPaintProduct] = useState(false);
  const [showShadeModal, setShowShadeModal] = useState(false);
  const [shadeNumber, setShadeNumber] = useState("");
  const [quantityType, setQuantityType] = useState("");

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
    if (!quantityType) {
      toast.error("Please select a quantity type (Drum, Quarter, or Gallon).");
      return;
    }

    addToCart(productData._id, { shadeNumber, quantityType });
    setShowShadeModal(false);
    router.push("/cart");
  };

  return (
    <>
      <div className="px-2 sm:px-6 md:px-12 mb-4 lg:px-20 pt-14 space-y-10 bg-white text-black min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
          {/* LEFT IMAGES */}
          <div className="px-1 sm:px-3 md:px-6">
            <motion.div
              className="rounded-lg overflow-hidden mb-4 flex justify-center items-center bg-[#94d2bd]/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={main}
                alt={productData.title || productData.name}
                width={1280}
                height={720}
                className="w-full h-auto max-h-[350px] sm:max-h-[480px] md:max-h-[600px] object-contain"
              />
            </motion.div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {images.map((img, i) => (
                <motion.div
                  key={i}
                  onClick={() => setMainImage(img)}
                  whileHover={{ scale: 1.05 }}
                  className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-200 border ${
                    mainImage === img
                      ? "border-[#0a9396] ring-2 ring-[#94d2bd]"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`img-${i}`}
                    width={300}
                    height={300}
                    className="w-full h-[60px] sm:h-[90px] md:h-[110px] object-contain bg-white"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-3 text-[#0a9396]">
              {productData.title || productData.name}
            </h1>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {productData.description || "No description available."}
            </p>

            <p className="text-2xl sm:text-3xl font-semibold mt-6 text-[#0a9396]">
              PKR {productData.offerPrice || productData.price}
              {productData.offerPrice && (
                <span className="text-sm sm:text-base font-normal text-gray-500 line-through ml-2">
                  PKR {productData.price}
                </span>
              )}
            </p>

            <hr className="border-[#94d2bd] my-6" />

            {isPaintProduct && (
              <div className="text-sm text-gray-700 space-y-1">
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

            {/* ✅ Checkpoints Section */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                "Premium Quality",
                "Long-lasting Finish",
                "Eco-friendly Formula",
                "Trusted Brand",
                "Smooth Application",
                "Affordable Price",
              ].map((point, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-sm sm:text-base bg-[#94d2bd]/20 px-3 py-2 rounded-lg"
                >
                  <CheckCircle2 className="text-[#0a9396] w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-gray-800">{point}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center mt-10 gap-3 sm:gap-4">
              <button
                onClick={() => addToCart(productData._id)}
                className="w-full py-3.5 bg-[#94d2bd] text-black hover:bg-[#7cc6aa] rounded-lg transition text-sm sm:text-base font-medium"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-[#0a9396] text-white hover:bg-[#08777a] rounded-lg transition text-sm sm:text-base font-medium"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        </div>

        {/* FEATURED PRODUCTS */}
        {featuredProducts.length > 0 && (
          <div className="flex flex-col items-center">
            <motion.div
              className="flex flex-col items-center mb-4 mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-2xl sm:text-3xl font-semibold text-[#0a9396]">
                Featured{" "}
                <span className="text-[#94d2bd]">
                  {isPaintProduct ? "Paint Products" : "Products"}
                </span>
              </p>
              <div className="w-24 h-1 bg-[#0a9396] mt-2 rounded-full"></div>
            </motion.div>

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
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-2 sm:p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-white p-4 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full sm:w-[90%] md:w-[80%] max-h-[95vh] flex flex-col items-center overflow-y-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0a9396] text-center">
              Select Your Shade
            </h2>
            <p className="text-gray-600 text-center text-sm sm:text-lg mt-2">
              Hover to zoom and inspect shade details closely.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mt-8">
              {productData.shadeCardImages?.map((img, i) => (
                <div
                  key={i}
                  className="relative bg-[#94d2bd]/10 border border-[#0a9396]/20 rounded-xl overflow-hidden group flex justify-center items-center"
                  style={{ width: "100%", maxWidth: "1200px", height: "400px" }}
                >
                  <Image
                    src={img}
                    alt={`Shade ${i + 1}`}
                    width={1200}
                    height={1000}
                    className="object-contain w-full h-full transform transition-transform duration-500 group-hover:scale-150"
                  />
                </div>
              ))}
            </div>

            <input
              type="text"
              placeholder="Enter Shade Number"
              value={shadeNumber}
              onChange={(e) => setShadeNumber(e.target.value)}
              className="w-full sm:w-1/2 border border-[#0a9396] px-4 py-3 rounded-lg mt-6 outline-none focus:ring-2 focus:ring-[#94d2bd] text-center text-lg text-black"
            />

            <select
              value={quantityType}
              onChange={(e) => setQuantityType(e.target.value)}
              className="w-full sm:w-1/2 border border-[#0a9396] px-4 py-3 rounded-lg mt-4 outline-none focus:ring-2 focus:ring-[#94d2bd] text-center text-lg text-black"
            >
              <option value="">Select Quantity Type</option>
              <option value="Drum">Drum</option>
              <option value="Quarter">Quarter</option>
              <option value="Gallon">Gallon</option>
            </select>

            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 mb-6 w-full sm:w-auto">
              <button
                onClick={() => setShowShadeModal(false)}
                className="px-8 py-3 border border-[#0a9396] rounded-lg hover:bg-[#94d2bd]/20 text-[#0a9396] text-base sm:text-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmShade}
                className="px-8 py-3 bg-[#0a9396] text-white rounded-lg hover:bg-[#08777a] text-base sm:text-lg font-medium"
              >
                Confirm
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Product;
