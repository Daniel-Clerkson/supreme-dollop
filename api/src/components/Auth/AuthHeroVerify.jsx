import React from "react";
import Logo from "../../assets/Images/Logo.png";
import AuthHeroImg from "./AuthHeroImg";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const AuthHeroVerify = () => {
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
              <h1 className="text-2xl">Verify Your Account</h1>
              <br />
              <p>
                We’ve sent a 6-digit verification code to youremail@example.com
              </p>
            </div>
            <div className="checkbox mt-10 mb-10">
                <input type="text" name="" id="" className="border w-14 rounded-2xl h-14 m-2 p-2 text-xl text-center" />
                <input type="text" name="" id="" className="border w-14 rounded-2xl h-14 m-2 p-2 text-xl text-center" />
                <input type="text" name="" id="" className="border w-14 rounded-2xl h-14 m-2  p-2 text-xl text-center" />
                <input type="text" name="" id="" className="border w-14 rounded-2xl h-14 m-2 p-2 text-xl text-center" />
                <input type="text" name="" id="" className="border w-14 rounded-2xl h-14 m-2 p-2 text-xl text-center" />
                <input type="text" name="" id="" className="border w-14 rounded-2xl h-14 m-2 p-2 text-xl text-center" />
            </div>
            <Button />
            <div className="mt-5" onClick={()=>(navigate('.././login'))}>
                <p> Didn’t get the code? <span className="hover:underline cursor-pointer text-link">Resend</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthHeroVerify;
