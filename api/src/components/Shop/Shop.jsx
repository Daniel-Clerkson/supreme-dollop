import React, { useState } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  Search,
  ChevronDown,
  Heart,
  Star,
} from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Shop() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const categories = [
    "All Products",
    "Spices & Seasonings",
    "Grains & Rice",
    "Sauces & Oils",
    "Snacks",
    "Beverages",
  ];

  const products = [
    {
      id: 1,
      name: "Premium Jollof Spice Mix",
      price: 8.99,
      image:
        "https://images.unsplash.com/photo-1596040033229-a0b3b7d3b854?w=500&h=500&fit=crop",
      category: "Spices & Seasonings",
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: "Authentic Suya Spice",
      price: 7.5,
      image:
        "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=500&h=500&fit=crop",
      category: "Spices & Seasonings",
      rating: 4.9,
      reviews: 98,
    },
    {
      id: 3,
      name: "Long Grain Basmati Rice",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop",
      category: "Grains & Rice",
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      name: "Palm Oil - Traditional",
      price: 9.99,
      image:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&h=500&fit=crop",
      category: "Sauces & Oils",
      rating: 4.6,
      reviews: 87,
    },
    {
      id: 5,
      name: "Plantain Chips",
      price: 4.99,
      image:
        "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500&h=500&fit=crop",
      category: "Snacks",
      rating: 4.8,
      reviews: 203,
    },
    {
      id: 6,
      name: "Hibiscus Tea (Zobo)",
      price: 6.5,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&h=500&fit=crop",
      category: "Beverages",
      rating: 4.9,
      reviews: 145,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="relative z-10 px-6 py-5 flex flex-col md:flex-row items-center justify-around w-full">
        <div className="absolute inset-0 z-10 bg-white/20"></div>
        <img className="absolute inset-0 text-transparent w-full h-full bg-[url('../Images/Hero.png')] bg-cover bg-center" />
        <div className="relative z-10 flex items-center w-full justify-around flex-col md:flex-row">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-5xl font-bold text-black mb-6 leading-tight">
              Your one-stop shop for Afro-inspired products.
            </h1>
            <p className="text-xl md:text-lg text-black mb-10 leading-relaxed mx-auto">
              Explore our curated selection of quality food products to elevate
              your cooking and bring a taste of tradition to your table.
            </p>
            <button className="bg-[#e59a0d] hover:bg-[#efc77b] text-white px-10 py-4 rounded-xl text-lg font-semibold transition transform hover:scale-105 shadow-lg">
              Shop Now
            </button>
          </div>
          <div className="img h-[250px]">
            <img
              src="../Images/product.png"
              className="w-full h-full"
              alt=""
              width="500"
              height="400"
            />
          </div>
        </div>
      </div>{" "}
      {/* Categories */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 overflow-x-auto pb-4">
          {categories.map((category, idx) => (
            <button
              key={idx}
              className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition ${
                idx === 0
                  ? "bg-[#e59d0a] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      {/* Products Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Featured Products
          </h3>
          <select className="px-4 py-2 border rounded-lg text-gray-700">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Best Selling</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                />
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="p-5">
                <span className="text-xs text-[#e59d0a] font-semibold">
                  {product.category}
                </span>
                <h4 className="text-lg font-bold text-gray-900 mt-2 mb-2">
                  {product.name}
                </h4>
                <div className="flex items-center space-x-1 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">
                    {product.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    £{product.price}
                  </span>
                  <button
                    onClick={() => setCartCount(cartCount + 1)}
                    className="bg-[#e59d0a] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#e59d0d] transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
