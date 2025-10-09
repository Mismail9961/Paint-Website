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
} from "react";
import { toast } from "react-hot-toast";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
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

  // ✅ Fetch all products
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
      console.error("Error fetching products:", error);
      toast.error("Error loading products");
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // ✅ Fetch user + cart data
  const fetchUserData = useCallback(async () => {
    try {
      const token = await getToken();
      if (!token || !user) return;

      if (user?.publicMetadata?.role === "seller") setIsSeller(true);
      else setIsSeller(false);

      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) setUserData(data.user);

      // Fetch saved cart
      const cartRes = await axios.get("/api/cart/get", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (cartRes.data.success) {
        const cartArray = cartRes.data.cartItems || [];
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
    }
  }, [user, getToken]);

  // ✅ Sync cart to DB
  const syncCartToServer = useCallback(
    async (updatedCart) => {
      try {
        const token = await getToken();
        if (!token || !user) return;

        const cartArray = Object.entries(updatedCart).map(
          ([productId, item]) => ({
            productId,
            quantity: item.quantity,
            shadeNumber: item.shadeNumber || "",
          })
        );

        await axios.post(
          "/api/cart/update",
          { cartData: cartArray },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Error syncing cart:", error);
      }
    },
    [user, getToken]
  );

  // ✅ Cart functions
  const addToCart = async (productId, extraData = {}) => {
    setCartItems((prev) => {
      const existing = prev[productId];
      const updated = {
        ...prev,
        [productId]: {
          quantity: existing ? existing.quantity + 1 : 1,
          shadeNumber: extraData.shadeNumber || existing?.shadeNumber || "",
        },
      };
      if (user) syncCartToServer(updated);
      return updated;
    });
    toast.success("Added to cart!");
  };

  const removeFromCart = async (productId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      if (user) syncCartToServer(updated);
      return updated;
    });
    toast.success("Item removed from cart!");
  };

  const updateCartQuantity = async (productId, quantity) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (quantity > 0) updated[productId] = { ...prev[productId], quantity };
      else delete updated[productId];
      if (user) syncCartToServer(updated);
      return updated;
    });
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((sum, i) => sum + i.quantity, 0);

  const getCartAmount = () =>
    Object.entries(cartItems).reduce((total, [id, item]) => {
      const product =
        products.find((p) => String(p._id) === id) ||
        paintProducts.find((p) => String(p._id) === id);
      const price = product?.offerPrice || product?.price || 0;
      return total + price * item.quantity;
    }, 0);

  // ✅ Initial Load
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
