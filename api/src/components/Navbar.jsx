import React, { useState } from "react";
import { ShoppingCart, User } from "lucide-react";
import logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "./Cart/CartFunctionality";
import { FaChevronDown } from "react-icons/fa";

export default function Navbar({ onOpenCart }) {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileVendorsOpen, setMobileVendorsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Weddings", path: "/wedding" },
    { name: "Corporate", path: "/corporate" },
    { name: "Schools", path: "/schools" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];

  const handleNavigate = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };
  const { totalItems, openCart } = useCart();

  return (
    <nav className="sticky top-4 z-50 mx-4 md:mx-32">
      <div className="bg-white/95 backdrop-blur-sm shadow-md rounded-2xl px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 cursor-pointer bg-transparent border-none"
            aria-label="Go to homepage"
          >
            <img
              src={logo}
              alt="Vysk Catering Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavigate(link.path)}
                className="transition-all cursor-pointer text-gray-700 hover:text-[#e59a0d]"
                aria-label={`Go to ${link.name}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Side Actions (desktop) */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={openCart}
              className="relative p-2"
              aria-label="Open cart"
            >
              <ShoppingCart size={25} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 bg-[#e59a0d] text-white text-xs px-1 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {localStorage.getItem("isLoggedIn") ? (
              <Link to="/profile" aria-label="Login">
                <button className="text-white font-semibold cursor-pointer px-4 py-2 rounded-full bg-[#efba57] hover:scale-105 transition-all duration-300">
                  <User />
                </button>
              </Link>
            ) : (
              <Link to="/login">
              <button className="text-white font-semibold px-4 cursor-pointer py-2 rounded-lg bg-[#e59a0d] hover:scale-105 transition-all duration-300">
                Login
              </button>
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center justify-between gap-3">
            <button
              onClick={() => onOpenCart?.()}
              className="relative p-2 rounded-full bg-white text-black hover:bg-gray-100"
              aria-label="Open cart"
            >
              <ShoppingCart size={18} onClick={openCart} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e59a0d] text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen((s) => !s)}
              className="text-2xl p-2"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-3 bg-[#e59a0d] rounded-lg text-white px-6 py-4 space-y-3">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-orange-200"
          >
            Home
          </Link>
          <Link
            to="/menu"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-orange-200"
          >
            Menu
          </Link>

          {/* Shop */}
          <Link
            to="/shop"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-orange-200"
          >
            Shop
          </Link>

          {/* Mobile Vendors dropdown */}
          <div>
            <button
              onClick={() => setMobileVendorsOpen((s) => !s)}
              className="w-full flex justify-between items-center hover:text-orange-200"
              aria-expanded={mobileVendorsOpen}
              aria-controls="mobile-vendors-list"
            >
              <span>Vendors</span>
              <FaChevronDown
                className={`transition-transform ${
                  mobileVendorsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileVendorsOpen && (
              <div id="mobile-vendors-list" className="ml-4 mt-2 space-y-2">
                <Link
                  to="/vendors/list"
                  onClick={() => setIsMenuOpen(false)}
                  className="block hover:text-orange-200"
                >
                  Vendor List
                </Link>
                <Link
                  to="/vendors/apply"
                  onClick={() => setIsMenuOpen(false)}
                  className="block hover:text-orange-200"
                >
                  Become a Vendor
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/events"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-orange-200"
          >
            Events
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-orange-200"
          >
            Contact
          </Link>

          <div className="flex items-center justify-between pt-2">
            {localStorage.getItem("isLoggedIn") ? (
              <Link to="/profile" aria-label="Login">
                <button className="bg-white font-semibold px-4 py-2 rounded-full text-[#e59a0d] hover:scale-105 transition-all duration-300">
                  User
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="bg-white font-semibold px-4 py-2 rounded-lg text-[#e59a0d] hover:scale-105 transition-all duration-300">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
