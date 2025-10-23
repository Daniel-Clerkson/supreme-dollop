import React from "react";
import {
  Briefcase,
  Clock,
  TrendingUp,
  Users,
  Plane,
  Ship,
  CheckCircle,
} from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Corporate() {
  return (
    <>
      <div className="min-h-screen bg-white ">
        <section className="h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-10 bg-black/50"></div>
          <img className="absolute inset-0 text-transparent w-full h-full bg-[url('https://www.vyskcatering.co.uk/images/corporate-hero.png')] bg-cover bg-center" />

          <div className="relative z-10 text-center px-6 max-w-5xl text-white">
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Elevate your workday with
              <br />
              <span className="text-white">food that fuels performance.</span>
            </h1>
            <p className="text-md md:text-lg text-white mb-10 leading-relaxed">
              Delicious, well-presented meals designed for meetings, events, and
              everyday office lunches.
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
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex items-start justify-between flex-col w-full">
                <h2 className="text-4xl md:text-3xl font-bold text-center mb-1">
                  Why Choose Vys'k for
                </h2>
                <h3 className="text-3xl md:text-3xl font-bold mb-5">
                  Corporate Catering
                </h3>

                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  At Vys'k, we understand the rhythm of corporate life. That's
                  why our catering is designed to be seamless, professional, and
                  nourishing. From prompt deliveries to customized menus that
                  cater to diverse dietary needs, we help businesses keep their
                  teams well-fed, energized, and focused—while leaving a lasting
                  impression on clients and guests.
                </p>
                <button className="bg-[#e59a0d] hover:bg-[#efc77b] text-white px-8 py-3 rounded-full font-semibold transition transform hover:scale-105 shadow-md">
                  Book Now
                </button>
              </div>
              <div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl h-96 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600"
                    alt="Corporate event"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Luxury Travel Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex justify-center gap-4 mb-6">
                <Plane className="w-12 h-12 text-[#e58a0d]" />
                <Ship className="w-12 h-12 text-[#e58a0d]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Luxury In the Skies & At Sea
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Whether you're cruising on serene waters or soaring through the
                skies, Vys'k delivers gourmet meals that match the elegance of
                your travel.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="relative overflow-hidden rounded-3xl h-80 group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800"
                  alt="Luxury jet catering"
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold">Private Jet Catering</h3>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl h-80 group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800"
                  alt="Luxury yacht catering"
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold">Yacht Catering</h3>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-3xl p-8 md:p-12">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">
                Perfect For:
              </h4>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  "Executive retreats",
                  "VIP client experiences",
                  "Luxury travel groups",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-[#e59a0d] flex-shrink-0" />
                    <span className="text-lg text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 bg-[#e59a0d] hover:bg-[#e60a0d] text-white px-8 py-3 rounded-full font-semibold transition transform hover:scale-105 shadow-md">
                Book Now
              </button>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-20 px-6 bg-white">
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
        <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                A glimpse into the
              </h2>
              <p className="text-3xl md:text-4xl font-light text-black">
                delicious experiences
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
                "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600",
                "https://images.unsplash.com/photo-1555244162-803834f70033?w=600",
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
                "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600",
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600",
              ].map((img, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-2xl aspect-square group cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`Corporate experience ${idx + 1}`}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6 bg-[#e58a0d] text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="flex justify-center mb-4">
                  <Users className="w-12 h-12" />
                </div>
                <div className="text-5xl font-bold mb-2">120+</div>
                <div className="text-xl text-blue-100">Companies Served</div>
              </div>
              <div>
                <div className="flex justify-center mb-4">
                  <Clock className="w-12 h-12" />
                </div>
                <div className="text-5xl font-bold mb-2">98%</div>
                <div className="text-xl text-blue-100">
                  On-Time Delivery Rate
                </div>
              </div>
              <div>
                <div className="flex justify-center mb-4">
                  <TrendingUp className="w-12 h-12" />
                </div>
                <div className="text-5xl font-bold mb-2">15,000+</div>
                <div className="text-xl text-blue-100">Meals Delivered</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-yellow-50 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-black mb-6 text-black">
              Ready to create your perfect wedding menu?
            </h2>
            <p className="text-lg mb-10 text-gray-600">
              Let's discuss how we can bring your culinary vision to life on
              your special day.
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
      </div>
      <Footer />
    </>
  );
}
