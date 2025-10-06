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

  // ✅ Fetch normal & paint products
  const fetchProductData = async () => {
    try {
      setLoadingProducts(true);
      const [productRes, paintRes] = await Promise.all([
        axios.get("/api/products/list"),
        axios.get("/api/paintProduct/list"),
      ]);

      if (productRes.data.success) {
        setProducts(productRes.data.data);
      } else {
        toast.error("Failed to load products");
      }

      if (paintRes.data.success) {
        setPaintProducts(paintRes.data.data);
      } else {
        toast.error("Failed to load paint products");
      }

      setLoadingProducts(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error loading products");
      setLoadingProducts(false);
    }
  };

  // ✅ Fetch user data + cart
  const fetchUserData = async () => {
    try {
      if (user?.publicMetadata?.role === "seller") {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }

      const token = await getToken();
      if (!token) return;

      // Fetch user base info
      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (data.success) {
        setUserData(data.user);
      }

      // Fetch saved cart - UPDATED PATH
      const cartRes = await axios.get("/api/cart/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (cartRes.data.success) {
        setCartItems(cartRes.data.cartItems || {});
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data");
    }
  };

  // ✅ Sync cart to backend (merge-safe)
  const syncCartToServer = async (updatedCart) => {
    try {
      const token = await getToken();
      
      if (!token) {
        console.warn("No auth token available, skipping cart sync");
        return;
      }

      await axios.post(
        "/api/cart/update",
        { cartData: updatedCart },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error syncing cart:", error);
      // Don't show toast for sync errors to avoid spam
    }
  };

  // ✅ Add to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      
      // Sync to server only if user is logged in
      if (user) {
        syncCartToServer(updated);
      }
      
      return updated;
    });
  };

  // ✅ Update cart quantity
  const updateCartQuantity = (itemId, quantity) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      
      if (quantity <= 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = Number(quantity);
      }
      
      // Sync to server only if user is logged in
      if (user) {
        syncCartToServer(updated);
      }
      
      return updated;
    });
  };

  // ✅ Cart total count
  const getCartCount = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + Number(qty), 0);

  // ✅ Cart total amount
  const getCartAmount = () => {
    let total = 0;
    
    for (const id in cartItems) {
      const item =
        products.find((p) => String(p._id) === String(id)) ||
        paintProducts.find((p) => String(p._id) === String(id));
      
      if (item) {
        const price = item.offerPrice || item.price || 0;
        total += price * Number(cartItems[id]);
      }
    }
    
    return Math.floor(total * 100) / 100;
  };

  // Load products on mount
  useEffect(() => {
    fetchProductData();
  }, []);

  // Load user + cart after login
  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const value = {
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