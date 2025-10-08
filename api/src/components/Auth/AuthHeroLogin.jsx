import React from "react";
import Logo from "../../assets/Images/Logo.png";
import AuthHeroImg from "./AuthHeroImg";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const navigate = useNavigate();

  return (
    <>
      <AuthHeroImg />
      <div className="justify-center items-center flex">
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
            <div className="form w-lg">
            <input
                type="text"
                className="w-4/5 h-12 rounded-2xl border pl-4 pr-4 pt-4 pb-4 m-3 outline-0 placeholder:text-gray-600"
                placeholder="Enter Your Email Address"
              />
              <input
                type="text"
                className="w-4/5 h-12 rounded-2xl border pl-4 pr-4 pt-4 pb-4 m-3 outline-0 placeholder:text-gray-600"
                placeholder="Enter Password"
              />
              <Button />
              <p className="mt-10">Forgot Your Password ? <span className="hover:underline cursor-pointer text-link" onClick={()=>(navigate(".././forgot-password"))}>Get Password</span></p>
              <p className="mt-2">Don't Have an Account ? <span className="hover:underline cursor-pointer text-link" onClick={()=>(navigate(".././create-account"))}>Create Account</span></p>
              <p className="m-5">For further support, you may visit the Help Center or contact our customer service team.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
