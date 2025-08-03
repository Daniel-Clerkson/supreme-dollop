import React, { useState } from "react";
import { API_BASE_URL } from "../../../API_MODULES/API_ADDRESS";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import bg from "../../assets/bg.png"
import logo from "../../assets/logo.png";

export default function LoginPage() {
  const [email, setEmail] = useState("vyskkitchen.org@gmail.com");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // API Service
  const loginUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Login failed (${response.status})`);
    }
    
    return response.json();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    
    try {
      const response = await loginUser({ email, password, rememberMe });
      console.log("Login successful:", response);
      setSuccess("Welcome back! Redirecting...");
      
      setTimeout(() => {
        console.log("Redirecting to dashboard...");
        window.location.href = "/display"; // Using regular navigation
      }, 2000);
    } catch (error) {
      setError(error.message || "Invalid email or password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleEditEmail = () => {
    setIsEditingEmail(!isEditingEmail);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 bg-white bg-contain bg-repeat`} style={{ backgroundImage: `url(${bg})` }}>
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mb-8">
        <img src={logo} className="max-w-32" />
        </div>

        <h1 className="text-2xl font-semibold text-[#515050] mb-4 text-center">
          Welcome Back to Vysk Kitchen
        </h1>

        <p className="text-[#515050] text-center mb-8">
          Log back into your Vysk Kitchen Account
        </p>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              {isEditingEmail ? (
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow p-3 outline-none"
                  autoFocus
                />
              ) : (
                <div className="flex-grow p-3">{email}</div>
              )}
              <button
                type="button"
                onClick={toggleEditEmail}
                className="px-4 py-3 text-[#e59a0d] font-medium hover:underline"
              >
                {isEditingEmail ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-[#515050] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-3 border border-gray-300 rounded-md focus:border-[#e59a0d] focus:ring-1 focus:ring-[#e59a0d] outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon size={20} />
                ) : (
                  <EyeIcon size={20} />
                )}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#e59a0d] border-gray-300 rounded focus:ring-[#e59a0d] focus:ring-1"
              />
              <span className="ml-2 text-sm text-[#515050]">Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#e59a0d] text-white rounded-md hover:bg-opacity-90 transition-colors mb-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Continue"}
          </button>
        </form>

        <p className="text-[#515050] mb-2 text-center">
          Forgot your password?{" "}
          <a
            href="/auth/forgot-password"
            className="text-[#e59a0d] hover:underline"
          >
            Get Password
          </a>
        </p>
        <p className="text-[#515050] mb-6 text-center">
          Don't have an account?{" "}
          <a
            href="/auth/register"
            className="text-[#e59a0d] hover:underline"
          >
            Register
          </a>
        </p>

        <p className="text-[#515050] text-sm text-center">
          For further support, you may visit the{" "}
          <a href="/help" className="text-[#e59a0d] hover:underline">
            Help Center
          </a>{" "}
          or contact our customer service team.
        </p>
      </div>
    </div>
  );
}