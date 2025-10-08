import React from "react";
import Logo from "../../assets/Images/Logo.png";
import AuthHeroImg from "./AuthHeroImg";
import Button from "../Button";

const AuthHeroAddress = () => {
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
                <h1 className="text-2xl">Delivery Address</h1>
                <br />
                <p>Tell us a little more about you so we can personalize your experience.</p>
            </div>
            <div className="form w-lg">
            <input
                type="text"
                className="w-4/5 h-12 rounded-2xl border pl-4 pr-4 pt-4 pb-4 m-3 outline-0 placeholder:text-gray-600"
                placeholder="Enter Your Home Address"
              />
              <input
                type="text"
                className="w-4/5 h-12 rounded-2xl border pl-4 pr-4 pt-4 pb-4 m-3 outline-0 placeholder:text-gray-600"
                placeholder="Enter Your City"
              />
              <input
                type="text"
                className="w-4/5 h-12 rounded-2xl border pl-4 pr-4 pt-4 pb-4 m-3 mb-10 outline-0 placeholder:text-gray-600"
                placeholder="Enter Zip Code"
              />
              <Button />
              <p className="m-5">For further support, you may visit the Help Center or contact our customer service team.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthHeroAddress;
