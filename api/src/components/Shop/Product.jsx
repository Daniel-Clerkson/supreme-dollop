// src/pages/ProductPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useCart } from "../Cart/CartFunctionality";
import { API_BASE_URL } from "../../../API_MODULES/API_ADDRESS";
import CartDrawer from "../Cart/AddCartItem";

export default function ProductPage() {
  const { id } = useParams(); // expects route /product/:id where id matches backend "id"
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);


  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`Failed to fetch product (${res.status}) ${text}`);
        }
        const data = await res.json();
        if (!mounted) return;
        setProduct(data.product);
        setActiveImage(0);
        console.log(data);
        
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Failed to load product");
      } finally {
        if (mounted) setLoading(false);
        
      }
    };

    fetchProduct();
    return () => {
      mounted = false;
    };
  }, [id]);

  const images = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.imageUrl)) return product.imageUrl.map((i) => i.url);
    if (Array.isArray(product.image)) return product.image.map((i) => i.url);
    return [];
  }, [product]);

  const inStock = Boolean(product && product.stock > 0 && product.status !== "out-of-stock");

  const handleAddToCart = () => {
    if (!product || !inStock) return;
    const item = {
      // CartContext expects _id; backend provides id
      _id: product.id ?? product._id,
      name: product.name,
      price: product.price,
      image: product.imageUrl ?? product.image ?? [],
      stock: product.stock ?? 0,
    };
    addToCart(item, qty);
  };

  if (loading) {
    return (
      <>
      <Navbar onOpenCart={() => setCartOpen(true)} />
      <main className="container mx-auto px-4 py-20 text-center text-gray-600">Loading product…</main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-20 text-center text-red-500">Error loading product: {error}</main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-20 text-center text-gray-600">Product not found.</main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-600 hover:underline mb-4" aria-label="Go back">
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Images */}
          <section className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="w-full aspect-[4/3] bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                {images[activeImage] ? (
                  <img
                    src={images[activeImage]}
                    alt={`${product.name} image ${activeImage + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">No image available</div>
                )}
              </div>

              <div className="mt-3 flex gap-3 overflow-x-auto" role="list">
                {images.length ? (
                  images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-20 h-20 rounded overflow-hidden border focus:outline-none focus:ring-2 focus:ring-[#e59d0a] ${
                        i === activeImage ? "ring-2 ring-[#e59d0a]" : "border-gray-200"
                      }`}
                      aria-label={`Show image ${i + 1}`}
                      role="listitem"
                    >
                      <img src={src} alt={`${product.name} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No thumbnails</div>
                )}
              </div>
            </div>
          </section>

          {/* Info & actions */}
          <section className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-4 h-4 text-yellow-400" aria-hidden />
                    <span className="font-medium text-gray-700">{(product.averageRating ?? 0).toFixed(1)}</span>
                    <span className="text-sm text-gray-500">· {product.reviews?.length ?? 0} reviews</span>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">{product.category}</div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">₦{product.price}</div>
                  <div className={`mt-1 text-sm font-medium ${inStock ? "text-green-600" : "text-red-500"}`}>
                    {inStock ? `In stock • ${product.stock} available` : "Out of stock"}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded" role="group" aria-label="Quantity">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-2 py-1 bg-white rounded border" aria-label="Decrease quantity">−</button>
                  <div className="px-4 font-medium" aria-live="polite">{qty}</div>
                  <button onClick={() => setQty((q) => Math.min(product.stock ?? 9999, q + 1))} className="px-2 py-1 bg-white rounded border" aria-label="Increase quantity">+</button>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className={`px-6 py-3 rounded-lg font-semibold text-white transition ${inStock ? "bg-[#e59d0a] hover:bg-[#e59d0d]" : "bg-gray-300 cursor-not-allowed text-gray-600"}`}
                    aria-disabled={!inStock}
                  >
                    Add to Cart
                  </button>

                  <button onClick={() => { /* wishlist placeholder */ }} className="px-4 py-3 rounded-lg border" aria-label="Add to wishlist">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Tabs content */}
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{product.description}</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Specifications</h4>
                    <ul className="list-disc pl-5 text-gray-700">
                      {product.details?.specifications?.length ? product.details.specifications.map((s, i) => <li key={i}>{s}</li>) : <li className="text-gray-500">None provided</li>}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Dietary Info</h4>
                    <ul className="list-disc pl-5 text-gray-700">
                      {product.details?.dietaryInfo?.length ? product.details.dietaryInfo.map((d, i) => <li key={i}>{d}</li>) : <li className="text-gray-500">None provided</li>}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Key Features</h4>
                    <ul className="list-disc pl-5 text-gray-700">
                      {product.details?.keyFeatures?.length ? product.details.keyFeatures.map((f, i) => <li key={i}>{f}</li>) : <li className="text-gray-500">None provided</li>}
                    </ul>
                  </div>
                </div>

                {/* Reviews */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Reviews</h4>
                  {product.reviews?.length ? (
                    <div className="space-y-4">
                      {product.reviews.map((r, i) => (
                        <div key={i} className="border rounded p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">U</div>
                            <div>
                              <div className="font-semibold">User {i + 1}</div>
                              <div className="text-sm text-gray-500">Rating: {product.averageRating ?? 0}</div>
                            </div>
                          </div>
                          <div className="mt-3 text-gray-700">{r}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500">No reviews yet.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <div>Product ID: {product.id ?? product._id}</div>
              <div>Added: {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : "—"}</div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

    </>
  );
}
