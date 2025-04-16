import React, { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="font-mont relative px-4 sm:px-6 md:px-8 lg:px-[40px] py-[30px]">
      <div className="flex justify-between items-center">
        <Link to='/'>
          <p className="text-[#337E66] text-[18px] lg:text-[32px] leading-[100%] tracking-[0%] font-bold">
            RentIt
          </p>
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden flex items-center" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-[8px] lg:gap-[16px] font-medium items-center text-[16px] leading-[100%] tracking-[0%]">
          <Link to='/'>
            <li className="w-fit bg-[#337E66] rounded-[15px] font-bold text-[16px] text-[#FFFFFF] px-[20px] lg:px-[31.5px] py-[7px]">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li>ABOUT US</li>
          </Link>
          <Link to="signup">
            <li>SIGN UP</li>
          </Link>
          <Link to="/">
            <li>ABUJA</li>
          </Link>
          <Link to="/">
            <li>LAGOS</li>
          </Link>
          <Link to="/">
            <li>OTHERS</li>
          </Link>
        </ul>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden absolute top-[100%] left-0 right-0 bg-white shadow-lg`}
      >
        <ul className="flex flex-col py-4 px-4 gap-4 font-medium text-[16px] leading-[100%] tracking-[0%]">
          <Link to='/'>
            <li className="w-fit bg-[#337E66] rounded-[15px] font-bold text-[16px] text-[#FFFFFF] px-[31.5px] py-[7px]">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li>ABOUT US</li>
          </Link>
          <Link to="signup">
            <li>SIGN UP</li>
          </Link>
          <Link to="/">
            <li>ABUJA</li>
          </Link>
          <Link to="/">
            <li>LAGOS</li>
          </Link>
          <Link to="/">
            <li>OTHERS</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
