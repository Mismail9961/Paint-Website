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
      console.error("❌ Error fetching products:", error);
      toast.error("Error loading products");
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // ✅ Fetch user + saved cart
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
          try {
            const id =
              typeof item.productId === "object"
                ? item.productId.toString()
                : String(item.productId);
            newCart[id] = {
              quantity: item.quantity || 1,
              shadeNumber: item.shadeNumber || "",
            };
          } catch (e) {
            console.warn("⚠️ Skipped invalid cart item", item);
          }
        });
        console.log("Loaded cart from server:", newCart);
        setCartItems(newCart);
      }
    } catch (error) {
      console.error("❌ Error fetching user/cart:", error);
    }
  }, [user, getToken]);

  // ✅ Sync full cart with backend
  const syncCartToServer = useCallback(
    async (cart) => {
      if (!user || syncing.current) return;

      const token = await getToken();
      if (!token) return;

      const cartArray = Object.entries(cart)
        .filter(([id, item]) => item && item.quantity > 0)
        .map(([id, item]) => ({
          productId: id,
          quantity: item.quantity,
          shadeNumber: item.shadeNumber || "",
        }));

      if (!cartArray.length) return;

      try {
        syncing.current = true;
        await axios.post(
          "/api/cart/update",
          { cartData: cartArray },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Cart synced successfully");
      } catch (error) {
        console.error("Cart sync failed:", error);
      } finally {
        syncing.current = false;
      }
    },
    [user, getToken]
  );

  // ✅ Add item
  const addToCart = (productId, extra = {}) => {
    if (!productId) return toast.error("Invalid product");

    setCartItems((prev) => {
      const existing = prev[productId];
      const updated = {
        ...prev,
        [productId]: {
          quantity: existing ? existing.quantity + 1 : 1,
          shadeNumber: extra.shadeNumber || existing?.shadeNumber || "",
        },
      };
      user && syncCartToServer(updated);
      return updated;
    });

    toast.success("Added to cart!");
  };

  // ✅ Remove item
  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      user && syncCartToServer(updated);
      return updated;
    });
  };

  // ✅ Update quantity
  const updateCartQuantity = (productId, quantity) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (quantity > 0)
        updated[productId] = { ...prev[productId], quantity };
      else delete updated[productId];
      user && syncCartToServer(updated);
      return updated;
    });
  };

  // ✅ Helpers
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

export default AppContextProvider;

