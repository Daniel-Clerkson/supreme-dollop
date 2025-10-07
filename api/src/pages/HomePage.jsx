import React from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/Home/Hero";

const Display = () => {

  let navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Display;
