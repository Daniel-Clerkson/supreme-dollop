import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import CartDrawer from "../Cart/AddCartItem";
import { useCart } from "../Cart/CartFunctionality";
import { API_BASE_URL } from "../../../API_MODULES/API_ADDRESS";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [cartOpen, setCartOpen] = useState(false);
  const { addToCart, totalItems } = useCart();

  const categories = useMemo(
    () => ["All Products", "Spices & Seasonings", "Grains & Rice", "Sauces & Oils", "Snacks", "Beverages", "Cakes", "Frozen food"],
    []
  );

  

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`${API_BASE_URL}/products`)
      .then((r) => {
        if (!r.ok) throw new Error("Network error");
        return r.json();
      })
      .then((data) => {
        if (!mounted) return;
        setProducts(Array.isArray(data.results) ? data.results : []);
      })
      .catch((err) => setError(err.message || "Failed"))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  useEffect(() => setCurrentPage(1), [searchQuery, activeCategory]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      const matchesSearch = q === "" || (p.name && p.name.toLowerCase().includes(q)) || (p.description && p.description.toLowerCase().includes(q));
      const matchesCategory = activeCategory === "All Products" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const goToPage = (page) => {
    const p = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(p);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleAddToCart = (product, qty = 1) => {
    if (product.stock !== undefined && product.stock <= 0) return;
    // normalize product shape expected by CartContext (ensure _id present)
    const item = {
      _id: product._id || product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.imageUrl || [],
      stock: product.stock,
    };
    addToCart(item, qty);
    setCartOpen(true);
  };

  return (
    <>
      <Navbar onOpenCart={() => setCartOpen(true)} />
        <div className=" px-6 py-8 bg-gradient-to-b from-white to-white/95">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your one-stop shop for Afro-inspired products.
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Explore our curated selection of quality food products to elevate your cooking and bring a taste of tradition to your table.
            </p>
            <button className="bg-[#e59d0a] hover:bg-[#efc77b] text-white px-8 py-3 rounded-xl text-lg font-semibold transition transform hover:scale-105 shadow">
              Shop Now
            </button>
          </div>
          <div className="w-full md:w-1/2 h-64 md:h-56 relative">
            <img
              src="../Images/product.png"
              alt="Hero product"
              className="w-full h-full object-contain"
              width="500"
              height="400"
            />
          </div>
        </div>
      </div>
      <main className="container mx-auto px-4 py-8">
        {/* Search / Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center w-full md:w-1/2 bg-white border rounded-lg px-3 py-2">
            <Search className="w-5 h-5 text-gray-400" />
            <label htmlFor="shop-search" className="sr-only">Search products</label>
            <input
              id="shop-search"
              type="text"
              placeholder="Search products by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-3 w-full outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredProducts.length}</span> results
            </div>
            <select
              aria-label="Sort products"
              className="px-4 py-2 border rounded-lg text-gray-700"
              onChange={() => {}}
            >
              <option>Sort by: Featured</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center space-x-4 overflow-x-auto pb-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium ${
                activeCategory === cat ? "bg-[#e59d0a] text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading products...</div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">Error: {error}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No products found.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((p) => (
                <article key={p._id || p.id} className="bg-white rounded-xl shadow-md overflow-hidden group">
                  <Link
                    to={`/product/${encodeURIComponent(p._id || p.id)}`}
                    className="block relative overflow-hidden"
                    aria-label={`View details for ${p.name}`}
                  >
                    <img
                      src={p.image?.[0]?.url || (p.imageUrl?.[0]?.url || "")}
                      alt={p.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          <Link to={`/product/${encodeURIComponent(p._id || p.id)}`} className="hover:underline">
                            {p.name}
                          </Link>
                        </h3>
                        <div className="text-sm text-gray-500">{p.category}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold">₦{p.price}</div>
                        <div className={`text-sm ${p.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                          {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">{(p.averageRating ?? 0).toFixed(1)}</span>
                        <span className="text-sm text-gray-500">({p.numOfReviews ?? 0})</span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(p, 1)}
                        disabled={p.stock <= 0}
                        className={`px-4 py-2 rounded-full text-white font-semibold ${
                          p.stock > 0 ? "bg-[#e59d0a] hover:bg-[#e59d0d]" : "bg-gray-300 cursor-not-allowed"
                        }`}
                        aria-disabled={p.stock <= 0}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination controls */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className={`px-3 py-2 rounded-md border ${currentPage <= 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-50"}`}
                  aria-disabled={currentPage <= 1}
                >
                  <ChevronLeft className="w-4 h-4 inline" /> Previous
                </button>

                <div className="hidden sm:flex items-center gap-2 ml-2">
                  {Array.from({ length: totalPages }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-2 rounded-md border ${currentPage === page ? "bg-[#e59d0a] text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                        aria-current={currentPage === page ? "page" : undefined}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className={`px-3 py-2 rounded-md border ${currentPage >= totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-50"}`}
                  aria-disabled={currentPage >= totalPages}
                >
                  Next <ChevronRight className="w-4 h-4 inline" />
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
