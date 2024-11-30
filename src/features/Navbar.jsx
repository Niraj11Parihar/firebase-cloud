import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-md flex justify-center space-x-8">
        <Link to="/" className="hover:text-gray-200 text-lg font-semibold">
          Add Student
        </Link>
        <Link
          to="/students"
          className="hover:text-gray-200 text-lg font-semibold"
        >
          Student List
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
