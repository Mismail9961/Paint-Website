"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = (props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "PKR";
  const router = useRouter();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [products, setProducts] = useState([]);
  const [paintProducts, setPaintProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(true);

  // ✅ Fetch both normal & paint products
  const fetchProductData = async () => {
    try {
      setLoadingProducts(true);
      const [productRes, paintRes] = await Promise.all([
        axios.get("/api/products/list"),
        axios.get("/api/paintProduct/list"),
      ]);

      if (productRes.data.success) setProducts(productRes.data.data);
      else toast.error("Failed to load products");

      if (paintRes.data.success) setPaintProducts(paintRes.data.data);
      else toast.error("Failed to load paint products");

      setLoadingProducts(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error loading products");
      setLoadingProducts(false);
    }
  };

  // ✅ Fetch user + saved cart
  const fetchUserData = async () => {
    try {
      if (user?.publicMetadata?.role === "seller") setIsSeller(true);
      else setIsSeller(false);

      const token = await getToken();
      if (!token) return;

      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) setUserData(data.user);

      // Fetch cart from DB
      const cartRes = await axios.get("/api/cart/get", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (cartRes.data.success) {
        const cartArray = cartRes.data.cartItems || [];

        // 🔄 Convert array → object
        const cartObj = {};
        cartArray.forEach((item) => {
          cartObj[item.productId] = {
            quantity: item.quantity,
            shadeNumber: item.shadeNumber || "",
          };
        });

        setCartItems(cartObj);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data");
    }
  };

  // ✅ Sync cart to backend
  const syncCartToServer = async (updatedCart) => {
    try {
      const token = await getToken();
      if (!token) return;

      // Convert object → array before sending
      const cartArray = Object.entries(updatedCart).map(([productId, item]) => ({
        productId,
        quantity: item.quantity,
        shadeNumber: item.shadeNumber || "",
      }));

      await axios.post(
        "/api/cart/update",
        { cartData: cartArray },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error syncing cart:", error);
    }
  };

  // ✅ Add to Cart (supports shadeNumber)
  const addToCart = (productId, extraData = {}) => {
    setCartItems((prev) => {
      const existingItem = prev[productId];
      const updated = {
        ...prev,
        [productId]: {
          quantity: existingItem ? existingItem.quantity + 1 : 1,
          shadeNumber: extraData.shadeNumber || existingItem?.shadeNumber || "",
        },
      };

      if (user) syncCartToServer(updated);
      return updated;
    });

    toast.success("Added to cart!");
  };

  // ✅ Delete item from cart
const removeFromCart = (productId) => {
  setCartItems((prev) => {
    const updated = { ...prev };
    delete updated[productId];

    if (user) syncCartToServer(updated);
    return updated;
  });

  toast.success("Item removed from cart!");
};


  // ✅ Update Cart Quantity
  const updateCartQuantity = (productId, quantity) => {
    setCartItems((prev) => {
      const updated = { ...prev };

      if (quantity > 0) {
        updated[productId] = { ...prev[productId], quantity };
      } else {
        delete updated[productId];
      }

      if (user) syncCartToServer(updated);
      return updated;
    });
  };

  // ✅ Cart Count
  const getCartCount = () =>
    Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);

  // ✅ Cart Total
  const getCartAmount = () => {
    let total = 0;
    for (const [productId, item] of Object.entries(cartItems)) {
      const product =
        products.find((p) => String(p._id) === String(productId)) ||
        paintProducts.find((p) => String(p._id) === String(productId));

      if (product) {
        const price = product.offerPrice || product.price || 0;
        total += price * item.quantity;
      }
    }
    return Math.floor(total * 100) / 100;
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    if (user) fetchUserData();
  }, [user]);

  const value = {
    removeFromCart,
    getToken,
    user,
    currency,
    router,
    isSeller,
    setIsSeller,
    userData,
    fetchUserData,
    products,
    paintProducts,
    fetchProductData,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    loadingProducts,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
