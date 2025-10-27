import React, { useState } from "react";
import Logo from "../../assets/Images/Logo.png";
import AuthHeroImg from "./AuthHeroImg";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../API_MODULES/API_ADDRESS";
import { ToastContainer, toast } from "react-toastify";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function postData(url, data) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const responseData = await response.json();
      localStorage.setItem("userToken", responseData.user.token);
      return responseData;
    } catch (error) {
      console.error("Error during POST request:", error);
      throw error;
    }
  }

  // Function to create user
  const loginUser = async (userData) => {
    return await postData(`${API_BASE_URL}/users/login`, userData);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoggingIn(true);

    try {
      const newUser = await loginUser({ email, password });
      setEmail("");
      setPassword("");

      toast.success("Log In Successful");
      localStorage.setItem("isLoggedIn", "LoggedIn");
      if (localStorage.getItem("isLoggedIn")) {
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        setTimeout(() => {
          navigate("/create-profile");
        }, 2000);
      }
    } catch (err) {
      toast.error(err.message || "Failed to register. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center mb-10 min-h-screen px-4">
        <div className="flex justify-center items-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl text-center flex-col">
          <div className="opacity-100 flex justify-center items-center flex-col">
            <img src={Logo} alt="" className="w-2/3 sm:w-1/2 md:w-2/5" />
          </div>
          <div className="w-full">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                Welcome Back to Vysk Kitchen
              </h1>
              <br />
              <p className="text-sm sm:text-base">
                Log back into your Vysk Kitchen Account.
              </p>
            </div>
            <div className="input mt-10 mb-10 flex flex-col items-center">
              <input
                type="text"
                className="w-4/5 h-12 rounded-2xl border pl-4 pr-4 pt-4 pb-4 outline-0"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative w-full sm:w-4/5 ml-0">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full h-12 rounded-2xl border px-4 py-3 m-2 ml-0 outline-0 placeholder:text-gray-600"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-5 text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <button
                className={
                  loggingIn
                    ? "text-white bg-[#f3bd5b] cursor-not-allowed w-full sm:w-4/5 h-12 rounded-2xl px-4 py-2"
                    : "text-white bg-[#e59a0d] cursor-pointer w-full sm:w-4/5 h-12 rounded-2xl px-4 py-2"
                }
                onClick={handleSubmit}
                disabled={loggingIn}
              >
                {loggingIn ? "Logging In..." : "Log In"}
              </button>
              <p className="mt-8 text-sm">
                Forgot Your Password?{" "}
                <span
                  className="hover:underline cursor-pointer text-link"
                  onClick={() => navigate("./forgot-password")}
                >
                  Get Password
                </span>
              </p>
              <p className="mt-2 text-sm">
                Don't Have an Account?{" "}
                <span
                  className="hover:underline cursor-pointer text-link"
                  onClick={() => navigate(".././create-account")}
                >
                  Create Account
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
