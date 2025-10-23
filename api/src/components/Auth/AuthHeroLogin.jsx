import React, { useState } from "react";
import Logo from "../../assets/Images/Logo.png";
import AuthHeroImg from "./AuthHeroImg";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../API_MODULES/API_ADDRESS";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");

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
      console.log("userToken", responseData.user.token);
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
      localStorage.setItem("isLoggedIn", "LoggedIn")
      setTimeout(() => {
        navigate("/create-profile");
      }, 5000);
    } catch (err) {
      toast.error(err.message || "Failed to register. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <>
      <AuthHeroImg />
      <ToastContainer />
      <div className="justify-center items-center flex mb-10">
        <div className="flex justify-center items-center absolute top-0.5 w-auto text-center flex-col">
          <div className="opacity-100 flex justify-center items-center flex-col">
            <img src={Logo} alt="" className="w-2/5" />
          </div>
          <div className="">
            <div>
              <h1 className="text-2xl">Welcome Back to Vysk Kitchen</h1>
              <br />
              <p>Log back into your Vysk Kitchen Account.</p>
            </div>
            <div className="form w-lg mt-5">
              <input
                type="text"
                className="w-4/5 h-12 rounded-2xl border pl-4 pr-4 pt-4 pb-4 m-3 outline-0 placeholder:text-gray-600"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="w-4/5 h-12 rounded-2xl border pl-4 pr-4 pt-4 pb-4 m-3 outline-0 placeholder:text-gray-600"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
              className={loggingIn ? "text-white bg-[#f3bd5b] cursor-not-allowed w-4/5 h-12 rounded-2xl pl-4 pr-4 pt-2 pb-2" : "text-white bg-[#e59a0d] cursor-pointer w-4/5 h-12 rounded-2xl pl-4 pr-4 pt-2 pb-2"}
              onClick={handleSubmit}
              disabled={loggingIn}
            >
              {loggingIn ? "Logging In..." : "Log In"}
            </button>
              <p className="mt-10">
                Forgot Your Password ?{" "}
                <span
                  className="hover:underline cursor-pointer text-link"
                  onClick={() => navigate("./forgot-password")}
                >
                  Get Password
                </span>
              </p>
              <p className="mt-2">
                Don't Have an Account ?{" "}
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
