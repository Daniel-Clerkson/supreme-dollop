import React from 'react';
import { Instagram, Facebook, Globe, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl w-full mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
              <span className="text-2xl font-semibold text-gray-800">Vysk Catering</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Bringing people together through flavour, warmth, and unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border-2 border-orange-400 flex items-center justify-center text-orange-500 hover:bg-orange-50 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border-2 border-orange-400 flex items-center justify-center text-orange-500 hover:bg-orange-50 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border-2 border-orange-400 flex items-center justify-center text-orange-500 hover:bg-orange-50 transition-colors">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border-2 border-orange-400 flex items-center justify-center text-orange-500 hover:bg-orange-50 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Weddings</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Corporate</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Schools</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Shop</a></li>
            </ul>
          </div>

          {/* Legals */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Legals</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Terms & Condition</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Allergens and Dietary Disclaimer</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Refund and Cancellation Policy</a></li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Location & Contact</h3>
            <div className="space-y-3 text-gray-600">
              <p className="font-medium">London UK</p>
              <p>
                Email:<br />
                <a href="mailto:info@vyskcatering.co.uk" className="text-orange-500 hover:underline">
                  info@vyskcatering.co.uk
                </a>
              </p>
              <p>Phone: 0208194211</p>
            </div>
          </div>
        </div>

        {/* Food Hygiene Rating */}
        <div className="mt-12 flex justify-end">
          <div className="bg-gradient-to-b from-lime-400 to-lime-500 p-6 rounded-lg shadow-lg max-w-xs">
            <div className="text-center">
              <h4 className="font-bold text-gray-800 mb-2">FOOD HYGIENE RATING</h4>
              <div className="flex items-center justify-center space-x-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-gray-700">
                  <span className="text-xs font-bold">0</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-gray-700">
                  <span className="text-xs font-bold">1</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-gray-700">
                  <span className="text-xs font-bold">2</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-gray-700">
                  <span className="text-xs font-bold">3</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-gray-700">
                  <span className="text-xs font-bold">4</span>
                </div>
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center border-4 border-white">
                  <span className="text-3xl font-bold text-white">5</span>
                </div>
              </div>
              <p className="text-xs font-semibold text-gray-800">VERY GOOD</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 py-6">
        <p className="text-center text-gray-500 text-sm">
          © 2025 VY's Kitchen. All rights reserved.
        </p>
      </div>
    </footer>
  );
}