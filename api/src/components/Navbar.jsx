import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Weddings", path: "/wedding" },
    { name: "Corporate", path: "/corporate" },
    { name: "Schools", path: "/schools" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  
  const handleLinkClick = (path) => {
    setActiveLink(path);
    setIsMenuOpen(false);
  };
  
  const isActive = (path) => activeLink === path;
  
  const navigate = useNavigate();
  return (
    <nav className="sticky top-4 z-50 mx-4 md:mx-32">
      <div className="bg-white/95 backdrop-blur-sm shadow-md rounded-2xl px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src={logo} alt="Vysk Catering Logo" width={120} height={40} className="object-contain" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.path}
                onClick={() => {handleLinkClick(link.path); navigate(link.path);
                }}
                className={`transition-all cursor-pointer ${
                  isActive(link.path)
                    ? 'text-[#e59a0d] font-bold'
                    : 'text-gray-700 hover:text-[#e59a0d]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Shopping Cart */}
            <button 
              className="text-gray-700 hover:text-[#e59a0d] transition-colors relative"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-[#e59a0d] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                0
              </span>
            </button>

            {/* Login Button - Desktop */}
            <button 
              className="hidden lg:block bg-[#e59a0d] hover:bg-[#e9ca91] cursor-pointer text-white font-semibold px-10 py-2 rounded-lg transition-all"
              onClick={() => navigate('/login')}
            >
              Login
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-gray-700 hover:text-[#e59a0d] transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 py-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <p
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`transition-all cursor-pointer ${
                  isActive(link.path)
                    ? 'text-[#e59a0d] font-bold'
                    : 'text-gray-700 hover:text-[#e59a0d]'
                }`}
              >
                {link.name}
              </p>
            ))}
            <button 
              className="bg-[#e59a0d] hover:bg-[#e9ca91] cursor-pointer text-white font-semibold px-10 py-2 rounded-lg transition-all w-full"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}