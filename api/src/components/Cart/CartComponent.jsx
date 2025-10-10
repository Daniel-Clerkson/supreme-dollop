// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => { /* localStorage init */ });
  // ... addToCart, removeFromCart, updateQty, totals etc.

  // Drawer UI state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openCart = () => setDrawerOpen(true);
  const closeCart = () => setDrawerOpen(false);
  const toggleCart = () => setDrawerOpen((s) => !s);

  const value = useMemo(() => ({
    items, addToCart, removeFromCart, updateQty, clearCart,
    totalItems, totalPrice,
    drawerOpen, openCart, closeCart, toggleCart
  }), [items, /* totals */, drawerOpen]);

  return (
    <CartContext.Provider value={value}>
      {children}
      {/* Render the drawer here so it's mounted once for the whole app */}
      <CartDrawer open={drawerOpen} onClose={closeCart} />
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
