import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../API_MODULES/API_ADDRESS";
import logo from "../../assets/logo.png";
import bg from "../../assets/bg.png";

export default function RegisterPage() {
  const [email, setEmail] = useState("vyskkitchen.org@gmail.com");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const createUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Registration failed (${response.status})`);
    }

    return response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setIsSubmitting(true);

    try {
      const newUser = await createUser({ email, password });
      setSuccess(`Welcome ${newUser.email || "aboard"}! Account created successfully.`);
      setEmail("");
      setPassword("");
      localStorage.setItem("userEmail", newUser.email);
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 bg-white bg-contain bg-repeat`}
          style={{ backgroundImage: `url(${bg})` }}>
      <div className="w-full max-w-md flex flex-col items-center">
        <img src={logo} alt="VY's KITCHEN Logo" width={180} height={80} style={{ marginBottom: "2rem" }} />

        <h1 className="text-2xl font-semibold text-[#515050] mb-4 text-center">
          Create Your Vysk Kitchen Account
        </h1>

        <p className="text-[#515050] text-center mb-8">
          Enter your email and password to get started
        </p>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#515050] mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-md focus:border-[#e59a0d] focus:ring-1 focus:ring-[#e59a0d] outline-none"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-[#515050] mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              className="w-full p-3 border border-gray-300 rounded-md focus:border-[#e59a0d] focus:ring-1 focus:ring-[#e59a0d] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#e59a0d] text-white rounded-md hover:bg-opacity-90 transition-colors mb-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>

          <p className="text-[#515050] mb-6 text-center">
            Already have an account?{" "}
            <a href="./login" className="text-[#e59a0d] hover:underline">Login</a>
          </p>
        </form>

        <p className="text-[#515050] text-sm text-center mt-6">
          For further support, you may visit the{" "}
          <a href="/display" className="text-[#e59a0d] hover:underline">Help Center</a>{" "}
          or contact our customer service team.
        </p>
   x   </div>
    </div>
  );
}
