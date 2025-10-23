import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function Contact() {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <>
      <section className=" min-h-screen overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source
              src="https://res.cloudinary.com/dj3rzny5p/video/upload/Vys_K_fnjthp.webm"
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-emerald-900/50"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex items-center min-h-screen px-8 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Headline */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Bold Flavours,
                <br />
                Unforgettable Taste.
              </h1>
            </div>

            {/* Right Column - Description and CTA */}
            <div className="space-y-8">
              <p className="text-white text-lg md:text-xl leading-relaxed">
                At Vysk, we believe great food brings people together. Whether
                it's an intimate gathering, corporate event, or special
                celebration, we deliver delicious, beautifully presented meals
                made with fresh, locally sourced ingredients. With years of
                experience in the catering industry, our team is passionate
                about flavour, presentation, and exceptional service.
              </p>

              <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-10 py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                Order Now
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
      </section>
      <section className="hero-2 bg-gray-100 flex flex-col items-center justify-center px-5 md:px-20">
        <div className="text text-center">
          <p className="text-2xl md:text-4xl font-black my-5">Epic Moments</p>
          <p className="text-2xl md:text-4xl font-bold my-3">Flawless Feasts</p>
          <button className="bg-[#e59a0d] text-white font-bold py-2 md:py-3 rounded-lg text-[16px] md:text-[18px] my-5 px-6 md:px-10">
            Book Now
          </button>
        </div>
        <div className="images grid grid-cols-1 md:grid-cols-3 gap-4 grid-rows-6 mx-5 md:mx-20">
          <img
            className="row-span-6 object-cover w-full h-full rounded-2xl"
            src="https://www.vyskcatering.co.uk/images/home-section-2-img1.png"
            alt="Grid 1"
          />
          <div className="p-3 md:p-5 row-span-2 bg-[#222] text-sm md:text-2xl flex items-center text-white rounded-2xl">
            Creating Unforgettable Moments, One Dish at a Time. Exceptional
            Catering for Weddings & Events - Where Taste Meets Elegance
          </div>
          <img
            className="p-3 md:p-5 row-span-4 rounded-2xl w-full h-full"
            src="https://www.vyskcatering.co.uk/images/home-section-2-img3.png"
            alt="Grid 3"
          />
          <img
            className="p-3 md:p-5 row-span-4 rounded-2xl w-full h-full"
            src="https://www.vyskcatering.co.uk/images/home-section-2-img2.png"
            alt="Grid 2"
          />
          <div className="p-3 md:p-5 row-span-2 bg-white rounded-2xl text-center flex flex-col justify-between items-center mb-5 text-xs md:text-base">
            Our wedding day was truly magical, and the food played a huge role
            in making it unforgettable! Every dish was beautifully presented and
            absolutely delicious. Thank you for making our special day even more
            memorable!
            <span className="inline-flex items-center justify-between text-xs md:text-sm font-black mt-3">
              <img
                src=""
                width={40}
                height={40}
                className="rounded-full"
                alt="Aina and Daniel"
              />
              Aina And Daniel, Happily Married
            </span>
          </div>
        </div>
      </section>
      <section>
        <div className="text text-center px-4 md:px-10">
          <p className="text-2xl md:text-4xl font-black my-5">
            Wholesome Meal Plans for Growing
          </p>
          <p className="text-2xl md:text-4xl font-bold my-3">
            Learners – Because Every Bite Matters!{" "}
          </p>
          <button
            className="bg-[#e59a0d] text-white font-bold py-2 md:py-3 rounded-lg
          text-[16px] md:text-[18px] my-5 px-6 md:px-10"
          >
            Book Now
          </button>
        </div>
        <div className="img flex justify-center">
          <img
            src="../../public/images/kitchen.png"
            className="px-4 md:px-20 rounded-2xl md:rounded-lg"
            alt=""
          />
        </div>
      </section>
      <section className="bg-gray-100 flex justify-between items-center px-10">
        <div className="text">
          <p className="text-5xl font-black mb-5">
            Bringing People Together Through the Art of Food
          </p>
          <p className="text-gray-700">
            At Vysk, we believe that food is more than just sustenance – it's an
            experience that brings people together and creates lasting memories.
            With a passion for flavor, elegance, and excellence, we specialize
            in crafting unforgettable culinary moments for every occasion.
          </p>
          <button className="bg-[#e59a0d] text-white font-bold py-2 cursor-pointer hover:transform-[translate(-10px)] hover:w-48 md:py-3 rounded-lg text-[16px] md:text-[18px] my-5 px-6 md:px-10">
            About Us
          </button>
        </div>
        <div className="img p-5">
          <img src="../Images/about.png" alt="" />
        </div>
      </section>
      <section>
        <img src="../Images/kitchen-2.png" alt="" />
      </section>
      <Footer />
    </>
  );
}
