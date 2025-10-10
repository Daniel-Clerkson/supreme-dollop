import React from "react";
import { Heart, Sparkles, UtensilsCrossed } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Wedding() {
  return (
    <>
      <Navbar onOpenCart={() => setCartOpen(true)} />
      <section className="h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[url('https://www.vyskcatering.co.uk/images/home-section-2-img2.png')] bg-cover bg-center opacity-90"></div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 w-full">
            Your Dream Day,
            <br />
            <span className="text-[#e59a0d]">Perfectly Catered.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
            From elegant canapés to full-course feasts, we create a dining
            experience as unforgettable as your love story. Let us bring flavor,
            beauty, and seamless service to your special day.
          </p>
          <div className="btn flex items-center justify-center">
            <button className="bg-[#e59a0d] hover:bg-[#efc77b] text-white px-8 py-4 cursor-pointer rounded-full text-md font-bold transition transform hover:scale-105 shadow-lg">
              Book Now
            </button>
            <button className="bg-white hover:bg-gray-100 ml-8 cursor-pointer text-black px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105 shadow-lg">
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Why Couples Choose Vys'k
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl h-96 flex items-center justify-center">
                <img
                  src="../Images/couple-1.png"
                  className="w-full h-full"
                />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Tailored to You
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We don't believe in one-size-fits-all. Every menu is
                thoughtfully designed to reflect your personality, culture, and
                vision for the day.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Exquisite Craftsmanship
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                From the first bite to the final course, our dishes are crafted
                with the freshest ingredients and styled to impress—because your
                day deserves nothing less.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-3xl h-96 flex items-center justify-center">
                <img
                  src="../Images/couple-2.png"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            What we offer
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Welcome Bites & Sips",
                img: "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=400",
              },
              {
                title: "Food Stations",
                img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400",
              },
              {
                title: "Multi-Course Dining",
                img: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400",
              },
              {
                title: "Grazing Cart",
                img: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400",
              },
            ].map((item, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-4 h-72 bg-gray-100">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
              A glimpse into the
            </h2>
            <p className="text-xl md:text-2xl font-light text-black">
              delicious experiences
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "https://www.vyskcatering.co.uk/images/wedding-experiences1.jpg",
              "https://www.vyskcatering.co.uk/images/wedding-experiences2.jpg",
              "https://www.vyskcatering.co.uk/images/wedding-experiences3.jpg",
              "https://www.vyskcatering.co.uk/images/wedding-experiences4.jpg",
              "https://www.vyskcatering.co.uk/images/wedding-experiences5.jpg",
              "https://www.vyskcatering.co.uk/images/wedding-experiences6.jpg?w=600",
            ].map((img, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl aspect-square group cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Wedding experience ${idx + 1}`}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                {/* <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300"></div> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-6 ">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Heart
              className="w-12 h-12 text-[#e59a0d] mx-auto mb-6"
              fill="currentColor"
            />
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-2xl">
                  ★
                </span>
              ))}
            </div>
          </div>

          <blockquote className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-8 italic">
            "From the moment we reached out to Vys'k, we knew we were in good
            hands. The food was beyond amazing, the presentation was flawless,
            and the team handled everything with such professionalism and care.
            Our guests are still talking about it weeks later!"
          </blockquote>

          <p className="text-lg font-semibold text-gray-900">
            — Chimamanda & Tolu, Wedding Couple 💍
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-yellow-50 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-6 text-black">
            Ready to create your perfect wedding menu?
          </h2>
          <p className="text-lg mb-10 text-gray-600">
            Let's discuss how we can bring your culinary vision to life on your
            special day.
          </p>
          <div className="btn flex items-center justify-center">
            <button className="bg-[#e59a0d] hover:bg-[#efc77b] text-white px-8 py-4 cursor-pointer rounded-full text-md font-bold transition transform hover:scale-105 shadow-lg">
              Book A Consultation
            </button>
            <button className="bg-white hover:bg-gray-100 border border-[#e59a0d] ml-8 cursor-pointer text-black px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105 shadow-lg">
              View Sample Menus
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
