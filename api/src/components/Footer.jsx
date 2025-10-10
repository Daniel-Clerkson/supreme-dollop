import React from "react";
import { Instagram, Facebook, Globe, Youtube } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-white w-full">
      <div className="max-w-7xl w-full mx-auto py-16">
        <div className="grid grid-cols-1 p-[10px] md:grid-cols-2 lg:grid-cols-6 gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="./logo.png" alt="" width="120" height="60" />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Bringing people together through flavour, warmth, and
              unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <Link
                to="https://www.instagram.com"
                target="blank"
                className="w-10 h-10 rounded-full border-[#e59a0d] flex items-center justify-center text-[#e59a0d] hover:bg-orange-50 transition-colors"
              >
                <Instagram size={18} />
              </Link>
              <Link
                to="https://www.facebook.com"
                target="blank"
                className="w-10 h-10 rounded-full border-[#e59a0d] flex items-center justify-center text-[#e59a0d] hover:bg-orange-50 transition-colors"
              >
                <Facebook size={18} />
              </Link>
              <Link
                to="https://www.google.com"
                target="blank"
                className="w-10 h-10 rounded-full border-[#e59a0d] flex items-center justify-center text-[#e59a0d] hover:bg-orange-50 transition-colors"
              >
                <Globe size={18} />
              </Link>
              <Link
                to="https://www.youtube.com"
                target="blank"
                className="w-10 h-10 rounded-full border-orange-400 flex items-center justify-center text-[#e59a0d] hover:bg-orange-50 transition-colors"
              >
                <Youtube size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-[#e59a0d] transition-colors"
                  onClick={() => navigate("../")}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-[#e59a0d] transition-colors"
                  onClick={() => navigate(".././contact")}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-[#e59a0d] transition-colors"
                  onClick={() => navigate(".././wedding")}
                >
                  Weddings
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-[#e59a0d] transition-colors"
                  onClick={() => navigate(".././corporate")}
                >
                  Corporate
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-[#e59a0d] transition-colors"
                  onClick={() => navigate(".././schools")}
                >
                  Schools
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-[#e59a0d] transition-colors"
                  onClick={() => navigate(".././shop")}
                >
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Legals */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Legals</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-[#e59a0d] transition-colors"
                  onClick={() => navigate(".././terms-condition")}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-[#e59a0d] transition-colors"
                  onClick={() => navigate(".././terms-condition")}
                >
                  Terms & Condition
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-[#e59a0d] transition-colors"
                  onClick={() => navigate(".././terms-condition")}
                >
                  Allergens and Dietary Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-[#e59a0d] transition-colors"
                  onClick={() => navigate(".././terms-condition")}
                >
                  Refund and Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Location & Contact
            </h3>
            <div className="space-y-3 text-gray-600">
              <p className="font-medium">London UK</p>
              <p>
                Email:
                <br />
                <Link
                  to="mailto:info@vyskcatering.co.uk"
                  className="text-[#e59a0d] hover:underline"
                >
                  info@vyskcatering.co.uk
                </Link>
              </p>
              <Link to="tel:0208194211">Phone: 0208194211</Link>
            </div>
          </div>
          {/* Food Hygiene Rating */}
          <div className="col-span-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Our Standards
            </h3>
            <img
              src="./Images/rating.png"
              alt="Food Hygiene Rating"
              className="w-full"
              width="400"
              height="400"
            />
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
