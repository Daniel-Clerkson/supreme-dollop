import React, { useState } from "react";
import Logo from "../../assets/Images/Logo.png";
import AuthHeroImg from "./AuthHeroImg";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../API_MODULES/API_ADDRESS";
import { ToastContainer, toast } from "react-toastify";

const AuthHeroProfile = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");

  const formData = {
    phone: phoneNumber,
    shippingInformation: {
      fullName,
      city,
      address,
      zipCode,
    },
  };

  const submitUserProfile = async (userProfile) => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify(userProfile),
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitUserProfile(formData);
      toast.success("Profile Created Successfully");
      localStorage.setItem("isProfileCreated", "true");
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to create profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <AuthHeroImg />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-opacity-90 rounded-lg p-6 md:p-10">
          <div className="flex flex-col items-center mb-6">
            <img src={Logo} alt="Logo" className="w-32 md:w-40" />
            <h1 className="text-xl md:text-2xl font-semibold mt-4 text-center">
              Let's Set Up Your Profile
            </h1>
            <p className="text-sm md:text-base text-gray-700 text-center mt-2">
              Tell us a little more about you so we can personalize your experience.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full h-12 rounded-xl border px-4 placeholder:text-gray-600"
              placeholder="Enter Your Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="tel"
              className="w-full h-12 rounded-xl border px-4 placeholder:text-gray-600"
              placeholder="Enter Phone Number eg. +2341234567890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="text"
              className="w-full h-12 rounded-xl border px-4 placeholder:text-gray-600"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              className="w-full h-12 rounded-xl border px-4 placeholder:text-gray-600"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              className="w-full h-12 rounded-xl border px-4 placeholder:text-gray-600"
              placeholder="ZipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <button
              type="submit"
              className={`w-full h-12 rounded-xl text-white ${
                isSubmitting ? "bg-[#f3bd5b] cursor-not-allowed" : "bg-[#e59a0d]"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            For further support, you may visit the Help Center or contact our customer service team.
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AuthHeroProfile;
