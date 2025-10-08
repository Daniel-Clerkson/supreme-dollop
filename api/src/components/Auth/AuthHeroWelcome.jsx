import React from "react";
import Logo from "../../assets/Images/Logo.png";
import AuthHeroImg from "./AuthHeroImg";
import Button from "../Button";
import Google from "../../assets/Images/google.png"
import { useNavigate } from "react-router-dom";

const AuthHeroWelcome = () => {
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
              <h1 className="text-2xl">Welcome to Vysk Kitchen</h1>
              <p>Type your email address to log in or create a Vysk account</p>
            </div>
            <div className="input mt-10 mb-10">
              <input
                type="text"
                className="w-4/5 h-12 rounded-2xl border pl-4 pr-4 pt-4 pb-4 outline-0"
                placeholder="Enter Your Email Address"
              />
            </div>
            <button className="text-white bg-[#e59a0d] cursor-pointer w-4/5 h-12 rounded-2xl pl-4 pr-4 pt-2 pb-2" onClick={()=>{navigate(".././verify")}}>Create Account</button>
            <div className="mt-5">
              <p>
                By continuing you agree to Vsyk kitchen{" "}
                <span className="hover:underline cursor-pointer text-link" onClick={()=>(navigate(".././terms-condition"))}>
                  Terms
                </span>{" "}
                &{" "}
                <span className="hover:underline cursor-pointer text-link" onClick={()=>(navigate(".././terms-consition"))}>
                  Conditions
                </span>
              </p>
            </div>
            <div className="or flex justify-center items-center">
              <div className="border-2 w-40"></div>
              <div className="m-5">
                <p>Or</p>
              </div>
              <div className="border-2 w-40"></div>
            </div>
            <div className="google">
              <button className="w-4/5 h-12 rounded-2xl bg-yellow-200 pl-4 pr-4 pt-2 pb-2">
              <img src={Google} alt="" className="absolute w-6 rounded-full" />
                Sign Up With Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthHeroWelcome;
