"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { toast } from "react-hot-toast";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const router = useRouter();
  const { user } = useUser();
  const { getToken } = useAuth();
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "PKR";

  const [products, setProducts] = useState([]);
  const [paintProducts, setPaintProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(true);

  const syncing = useRef(false);

  // ✅ Fetch products
  const fetchProductData = useCallback(async () => {
    try {
      setLoadingProducts(true);
      const [productRes, paintRes] = await Promise.all([
        axios.get("/api/products/list"),
        axios.get("/api/paintProduct/list"),
      ]);

      if (productRes.data.success) setProducts(productRes.data.data);
      if (paintRes.data.success) setPaintProducts(paintRes.data.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      toast.error("Error loading products");
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // ✅ Fetch user + cart
  const fetchUserData = useCallback(async () => {
    try {
      const token = await getToken();
      if (!token || !user) return;

      setIsSeller(user?.publicMetadata?.role === "seller");

      const [{ data: userRes }, { data: cartRes }] = await Promise.all([
        axios.get("/api/user/data", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("/api/cart/get", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (userRes.success) setUserData(userRes.user);

      if (cartRes.success && Array.isArray(cartRes.cartItems)) {
        const newCart = {};
        cartRes.cartItems.forEach((item) => {
          // 🔥 FIX: Convert ObjectId to string for consistency
          const productId = item.productId.toString ? item.productId.toString() : String(item.productId);
          newCart[productId] = {
            quantity: item.quantity,
            shadeNumber: item.shadeNumber || "",
          };
        });
        console.log("📥 Loaded cart from server:", newCart);
        setCartItems(newCart);
      }
    } catch (error) {
      console.error("❌ Error fetching user/cart data:", error);
    }
  }, [user, getToken]);

  // ✅ Sync cart to backend (FIXED - sends entire cart)
  const syncCartToServer = useCallback(
    async (updatedCart) => {
      if (syncing.current) return;
      syncing.current = true;
  
      try {
        const token = await getToken();
        if (!token || !user) {
          syncing.current = false;
          return;
        }
  
        // 🔥 Convert entire cart to array format
        const cartArray = Object.entries(updatedCart)
          .filter(([productId, item]) => {
            // Filter out invalid entries
            return (
              productId && 
              productId !== "0" && 
              item && 
              item.quantity > 0
            );
          })
          .map(([productId, item]) => ({
            productId,
            quantity: item.quantity,
            shadeNumber: item.shadeNumber || "",
          }));
  
        console.log("📤 Syncing cart to server:", cartArray);
  
        const response = await axios.post(
          "/api/cart/update",
          { cartData: cartArray },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          console.log("✅ Cart synced successfully");
        }
      } catch (error) {
        console.error("❌ Error syncing cart:", error);
        toast.error("Failed to sync cart");
      } finally {
        syncing.current = false;
      }
    },
    [user, getToken]
  );

  // ✅ Add to Cart
  const addToCart = async (productId, extraData = {}) => {
    if (!productId || productId === "0") {
      toast.error("Invalid product");
      return;
    }

    setCartItems((prev) => {
      const existing = prev[productId];
      const updated = {
        ...prev,
        [productId]: {
          quantity: existing ? existing.quantity + 1 : 1,
          shadeNumber: extraData.shadeNumber || existing?.shadeNumber || "",
        },
      };
      
      // ✅ Sync after state updates
      if (user) {
        // Use a small delay to ensure state is updated
        setTimeout(() => syncCartToServer(updated), 100);
      }
      
      return updated;
    });

    toast.success("Added to cart!");
  };

  // ✅ Remove from Cart
  const removeFromCart = async (productId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      
      if (user) {
        setTimeout(() => syncCartToServer(updated), 100);
      }
      
      return updated;
    });

    toast.success("Item removed from cart!");
  };

  // ✅ Update Quantity (FIXED)
  const updateCartQuantity = async (productId, quantity) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      
      if (quantity > 0) {
        // Update quantity while preserving shadeNumber
        updated[productId] = { 
          ...prev[productId], 
          quantity 
        };
      } else {
        // Remove item if quantity is 0
        delete updated[productId];
      }
      
      if (user) {
        setTimeout(() => syncCartToServer(updated), 100);
      }
      
      return updated;
    });
  };

  // ✅ Totals
  const getCartCount = useCallback(
    () => Object.values(cartItems).reduce((sum, i) => sum + i.quantity, 0),
    [cartItems]
  );

  const getCartAmount = useCallback(() => {
    return Object.entries(cartItems).reduce((total, [id, item]) => {
      const product =
        products.find((p) => String(p._id) === id) ||
        paintProducts.find((p) => String(p._id) === id);

      const price = product?.offerPrice || product?.price || 0;
      return total + price * item.quantity;
    }, 0);
  }, [cartItems, products, paintProducts]);

  // ✅ Initial data load
  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  useEffect(() => {
    if (user) fetchUserData();
  }, [user, fetchUserData]);

  return (
    <AppContext.Provider
      value={{
        user,
        getToken,
        router,
        currency,
        isSeller,
        setIsSeller,
        userData,
        products,
        paintProducts,
        loadingProducts,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        getCartCount,
        getCartAmount,
        setCartItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};