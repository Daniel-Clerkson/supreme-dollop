import React from "react";
import { useNavigate } from "react-router";
import Footer from "../components/Footer";
import HeroSection from "../components/Home/Hero";

const Display = () => {

  let navigate = useNavigate();

  return (
    <div>
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Display;
