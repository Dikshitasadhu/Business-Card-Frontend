import React from "react";
import Navbar from "../components/home/Navbar";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonial from "../components/home/Testimonial";
import Footer from "../components/home/Footer";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-700 mb-4 animate-fade-in-down">
          Share Your <span className="text-purple-700">Professional Identity</span> Instantly
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 max-w-2xl mx-auto mb-8 animate-fade-in-up">
          Build, share, and manage your <b>digital business card</b> in seconds – stand out and never lose an opportunity again!
        </p>
        <button
          onClick={() => navigate("/card/create")}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg font-bold text-xl tracking-wide transition transform hover:-translate-y-1 animate-bounce"
        >
          Create Card
        </button>
      </header>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonial />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
