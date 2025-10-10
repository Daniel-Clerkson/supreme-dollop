// src/components/CartDrawer.jsx
import React from "react";
import { useCart } from "./CartFunctionality";
import { Heart } from "lucide-react";

export default function CartDrawer({ open, onClose }) {
  const { items, totalItems, totalPrice, updateQty, removeFromCart, clearCart } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg p-4 overflow-auto" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Your Cart ({totalItems})</h3>
          <button onClick={onClose} className="text-gray-600" aria-label="Close cart">Close</button>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center text-gray-500">Your cart is empty.</div>
        ) : (
          <>
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item._id} className="flex gap-3 items-center">
                  <img src={item.image?.[0]?.url || item.image?.[0] || ""} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm text-gray-500">₦{item.price}</div>
                      </div>
                      <button onClick={() => removeFromCart(item._id)} className="text-sm text-red-500">Remove</button>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => updateQty(item._id, (item.qty || 1) - 1)} className="px-2 py-1 border rounded" aria-label={`Decrease quantity for ${item.name}`}>-</button>
                      <div className="px-3" aria-live="polite">{item.qty}</div>
                      <button onClick={() => updateQty(item._id, (item.qty || 1) + 1)} className="px-2 py-1 border rounded" aria-label={`Increase quantity for ${item.name}`}>+</button>
                      <div className="ml-auto font-semibold">₦{((item.price || 0) * (item.qty || 0)).toFixed(2)}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between mb-3">
                <span className="text-gray-600">Total</span>
                <span className="font-bold">₦{totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex gap-3">
                <button onClick={() => { /* placeholder checkout */ }} className="flex-1 bg-[#e59d0a] text-white py-2 rounded font-semibold">Checkout</button>
                <button onClick={() => clearCart()} className="px-4 py-2 border rounded">Clear</button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
