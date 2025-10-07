import React from "react";
import Logo from "../assets/Images/Logo2.png";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <div className="hidden sm:flex items-center justify-center shadow-md mb-10">
      <div className="flex justify-between items-center bg-white rounded-2xl mt-10 w-11/12 p-5">
        <div className="logo">
          <img src={Logo} alt="" className="" />
        </div>
        <div className="links flex justify-between items-center w-2/5">
          <div className="link">
            <p>Home</p>
          </div>
          <div className="link">
            <p>Weddings</p>
          </div>
          <div className="link">
            <p>Corporate</p>
          </div>
          <div className="link">
            <p>Schools</p>
          </div>
          <div className="link">
            <p>Cookery Shops</p>
          </div>
          <div className="link">
            <p>Shop</p>
          </div>
          <div className="link">
            <p>Contact</p>
          </div>
        </div>
        <div className="carts flex justify-between items-center w-1/6">
          <div className="cart">
            <FaShoppingCart />
          </div>
          <div className="cart pt-2 button pb-2 pr-10 pl-10 rounded-lg"
            onClick={()=>(navigate("/login"))}
          >Login</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
