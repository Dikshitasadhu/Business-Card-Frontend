import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-6">
    <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
      <span className="text-lg font-semibold mb-2 md:mb-0">© {new Date().getFullYear()} Business Card</span>
      <div className="flex space-x-5">
        <a href="#" className="hover:text-blue-400"><FaGithub size={22} /></a>
        <a href="#" className="hover:text-blue-400"><FaLinkedin size={22} /></a>
        <a href="#" className="hover:text-blue-400"><FaTwitter size={22} /></a>
      </div>
    </div>
  </footer>
);

export default Footer;
