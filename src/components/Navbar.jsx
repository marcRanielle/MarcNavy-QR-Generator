import React from "react";
import { ZapIcon } from "./Icons";
import Logo from "../assets/img/marcnavylogo.png";

const Navbar = () => (
  <nav className="bg-white sticky top-0 z-50 shadow-md backdrop-blur-md bg-opacity-90 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center group cursor-pointer">
          <img
            src= {Logo}
            alt="icon"
            className="w-8 h-8 mr-2 group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight group-hover:text-blue-700 transition-colors">
            MarcNavy
          </span>
          <span className="hidden sm:inline text-lg font-light text-gray-500 ml-1">
            QR Generator
          </span>
        </div>
        {/* Navigation Links (Scroll based in SPA) */}
        <div className="flex space-x-4">
          <a
            href="#generator"
            className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-blue-50"
          >
            Generator
          </a>
          <a
            href="#howitworks"
            className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-blue-50"
          >
            How It Works
          </a>
          <a
            href="#about"
            className="hidden md:inline text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-blue-50"
          >
            About
          </a>
        </div>
        {/* CTA Button */}
        <a
          href="#generator"
          className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          Generate Now
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
