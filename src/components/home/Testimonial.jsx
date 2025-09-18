import React from "react";

const TESTIMONIALS = [
  {
    name: "Aman Verma",
    text: "This app made sharing my professional details so easy. Big fan of the UI!",
    title: "Designer, Freelance"
  },
  {
    name: "Priya Roy",
    text: "I landed a new client after sharing my digital card. Love the instant updates.",
    title: "Business Consultant"
  },
  {
    name: "Kartik Singh",
    text: "Super-fast and mobile-friendly. Highly recommend to all professionals.",
    title: "Developer, Tech Startup"
  }
];

const Testimonial = () => (
  <section className="container mx-auto py-10 px-4">
    <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">Testimonials</h2>
    <div className="flex flex-col md:flex-row md:justify-center md:space-x-8 gap-8">
      {TESTIMONIALS.map((t, idx) => (
        <div
          key={t.name}
          className="p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl duration-300 transform hover:scale-105 transition"
          style={{ animationDelay: `${idx * 150}ms` }}
        >
          <p className="italic text-lg text-gray-700">"{t.text}"</p>
          <div className="mt-4">
            <span className="block font-semibold">{t.name}</span>
            <span className="block text-sm text-slate-400">{t.title}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonial;
