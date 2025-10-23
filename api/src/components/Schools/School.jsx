import React from "react";
import {
  BookOpen,
  Heart,
  Utensils,
  GraduationCap,
  Users,
  Sparkles,
  Award,
  Star,
} from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Schools() {
  return (
    <>
      <section className=" min-h-screen flex overflow-hidden">
        <div className="relative z-10 px-6 py-5 flex flex-col md:flex-row items-center justify-around w-full">
          <div>
            {" "}
            <h1 className="text-5xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Nourishing Young Minds
            </h1>
            <p className="text-xl md:text-lg text-gray-700 mb-10 leading-relaxed max-w-2xl mx-auto">
              Vysk African Catering brings authentic African flavours to schools
              across South East London and culturally diverse areas, offering
              delicious meals like jollof rice, rice & peas, puff puff, and
              more. We cater for primary, secondary, and university events,
              including Black History Month and cultural celebration days.
            </p>
            <button className="bg-[#e59a0d] hover:bg-[#efc77b] text-white px-10 py-4 rounded-xl text-lg font-semibold transition transform hover:scale-105 shadow-lg">
              Request a Quote
            </button>
          </div>
          <div className="img h-[488px]">
            <img
              src="https://www.vyskcatering.co.uk/images/school-hero.png"
              className="w-full h-full"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* Video/Image Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200"
              alt="Students enjoying school meals"
              className="w-full h-96 md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Why Schools Trust Us Section */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="relative z-10 px-6 py-20 flex flex-col md:flex-row items-center justify-around w-full">
          <div>
            {" "}
            <h1 className="text-5xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Why Schools Trust Vysk
            </h1>
            <p className="text-xl md:text-lg text-gray-700 mb-10 leading-relaxed max-w-2xl mx-auto">
              Nutritious meals, thoughtful planning, and a deep commitment to
              student wellbeing. We partner with schools to provide food that
              not only tastes great but also fuels learning and development.
            </p>
            <button className="bg-[#e59a0d] hover:bg-[#efc77b] text-white px-10 py-4 rounded-xl text-lg font-semibold transition transform hover:scale-105 shadow-lg">
              Contact Us Today
            </button>
          </div>
          <div className="img h-[488px] flex items-center flex-col md:flex-row justify-between">
            <img
              src="https://www.vyskcatering.co.uk/images/why-school1.png"
              className="w-full h-[300px] m-5"
              alt=""
            />
            <img
              src="https://www.vyskcatering.co.uk/images/why-school2.png"
              className="w-full h-[500px]"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Our School Catering Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 hover:shadow-xl transition duration-300">
              <div className="bg-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Daily Lunch Service
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Nutritious and delicious daily lunch options that meet all
                dietary requirements and introduce students to diverse flavors.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 hover:shadow-xl transition duration-300">
              <div className="bg-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Cultural Events
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Special menus for cultural celebrations, Black History Month,
                and international days to educate through food.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 hover:shadow-xl transition duration-300">
              <div className="bg-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Educational Workshops
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Interactive cooking demonstrations and food education workshops
                that teach students about nutrition and cultural food heritage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            What Schools Say About Us
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-current"
                  />
                ))}
              </div>
              <p className="text-lg text-gray-800 mb-6 leading-relaxed italic">
                "VY's Kitchen has transformed our school lunch program. Students
                are excited about lunchtime and we've seen improved focus in
                afternoon classes. The cultural education aspect has been
                invaluable."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  SJ
                </div>
                <div>
                  <div className="font-bold text-gray-900">Sarah Johnson</div>
                  <div className="text-sm text-gray-600">
                    Headteacher, St. Mary's School
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-current"
                  />
                ))}
              </div>
              <p className="text-lg text-gray-800 mb-6 leading-relaxed italic">
                "The team at VY's Kitchen goes above and beyond. They've worked
                with us to accommodate all dietary needs and have been
                instrumental in our cultural awareness initiatives."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  MB
                </div>
                <div>
                  <div className="font-bold text-gray-900">Michael Brown</div>
                  <div className="text-sm text-gray-600">
                    School Administrator, Imperial Academy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#e59a0d] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-6">
            Ready to create your perfect wedding menu?
          </h2>
          <p className="text-lg mb-10">
            Let's discuss how we can bring your culinary vision to life on your
            special day.
          </p>
          <div className="btn flex items-center justify-center">
            <button className="bg-white hover:bg-[#efc77b] border border-[#e59a0d] text-[#e59a0d] px-8 py-4 cursor-pointer rounded-lg text-md font-bold transition transform hover:scale-105 shadow-lg">
              Book A Consultation
            </button>
            <button className="bg-[#e59a0d] border-2 border-white hover:bg-gray-100 ml-8 cursor-pointer text-white hover:text-[#e59a0d] px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-lg">
              View Sample Menus
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
