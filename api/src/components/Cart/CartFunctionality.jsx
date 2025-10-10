// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import CartDrawer from "./AddCartItem";
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  // cart API
  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const id = product._id ?? product.id;
      const idx = prev.findIndex((i) => i._id === id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: (next[idx].qty || 0) + qty };
        return next;
      }
      return [
        ...prev,
        {
          _id: id,
          name: product.name,
          price: product.price,
          image: product.image ?? product.imageUrl ?? [],
          stock: product.stock ?? 0,
          qty,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((i) => i._id !== productId));
  };

  const updateQty = (productId, qty) => {
    setItems((prev) => prev.map((i) => (i._id === productId ? { ...i, qty: Math.max(1, qty) } : i)));
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(() => items.reduce((s, i) => s + (i.qty || 0), 0), [items]);
  const totalPrice = useMemo(() => items.reduce((s, i) => s + (i.price || 0) * (i.qty || 0), 0), [items]);

  // Drawer UI state (Option B)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openCart = () => setDrawerOpen(true);
  const closeCart = () => setDrawerOpen(false);
  const toggleCart = () => setDrawerOpen((s) => !s);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      totalItems,
      totalPrice,
      // drawer controls
      drawerOpen,
      openCart,
      closeCart,
      toggleCart,
    }),
    [items, totalItems, totalPrice, drawerOpen]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer open={drawerOpen} onClose={closeCart} />
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
