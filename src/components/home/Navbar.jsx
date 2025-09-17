import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  // Get card id from Redux store (make sure your card reducer has this shape)
  const cardId = useSelector((state) => state.card.card?._id);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto flex items-center justify-between py-4 px-8">
        <h1
          className="text-2xl font-extrabold text-blue-600 tracking-tight cursor-pointer"
          onClick={() => navigate("/")}
        >
          Business Card
        </h1>
        <div className="flex gap-6">
          <NavLink
            to="/"
            className="font-semibold text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </NavLink>
          <NavLink
            to="/card/create"
            className="font-semibold text-gray-700 hover:text-blue-600 transition-colors"
          >
            Create Card
          </NavLink>
          <NavLink
            to="/mycards"  /* Changed to always navigate to /mycards */
            className="font-semibold text-gray-700 hover:text-blue-600 transition-colors"
          >
            View Cards
          </NavLink>
          <NavLink
            to="/login"
            className="font-semibold text-gray-700 hover:text-red-500 transition-colors"
          >
            Logout
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
