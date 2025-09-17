import React from "react";
import { SparklesIcon, UserGroupIcon,DevicePhoneMobileIcon, ShieldCheckIcon } from "@heroicons/react/24/outline"; // Heroicons optional

const REASONS = [
  {
    icon: <SparklesIcon className="w-8 h-8 text-blue-600" />,
    title: "Modern & Unique",
    desc: "Impress with a digital card that stands out and adapts to every device."
  },
  {
    icon: <DevicePhoneMobileIcon className="w-8 h-8 text-blue-600" />,
    title: "100% Responsive",
    desc: "Access your cards on any device, seamlessly and reliably."
  },
  {
    icon: <UserGroupIcon className="w-8 h-8 text-blue-600" />,
    title: "Share Instantly",
    desc: "Send your card to anyone, anywhere, with a click."
  },
  {
    icon: <ShieldCheckIcon className="w-8 h-8 text-blue-600" />,
    title: "Secure & Private",
    desc: "Your data stays safe with full privacy controls."
  }
];

const WhyChooseUs = () => (
  <section className="container mx-auto py-12">
    <h2 className="text-2xl font-bold mb-8 text-center text-blue-600">Why Choose Us?</h2>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 justify-items-center">
      {REASONS.map(({ icon, title, desc }) => (
        <div
          key={title}
          className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center transform transition duration-300 hover:scale-105"
        >
          {icon}
          <h3 className="text-lg font-bold mt-4">{title}</h3>
          <p className="text-gray-500 mt-2 text-center">{desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default WhyChooseUs;
