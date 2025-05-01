import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router";
import Cookies from 'js-cookie'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [showSignup, setShowSignup] = useState(true)
  const [showSignout, setShowSignout] = useState(false)

  const navigate = useNavigate()

    useEffect(() => {
      try {
        const token = Cookies.get("token");
        if (token) {
          setUserToken(token);
        } else {
        }
      } catch (error) {
        // console.error("Error retrieving token:", error);
      }
    }, [])
  useEffect(()=>{
    if (userToken) {
      setShowSignup(false)
      setShowSignout(true)  
    } else {
      setShowSignup(true)
      setShowSignout(false)
    }

  },[userToken])

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleSignout = () => {
    Cookies.remove('token');
    window.location.reload();
    // navigate('/')
  }
  return (
    <nav className="font-mont relative px-4 sm:px-6 md:px-8 lg:px-[40px] py-[30px]">
      <div className="flex justify-between items-center">
        <NavLink to="/">
          <p className="text-[#337E66] text-[18px] lg:text-[32px] leading-[100%] tracking-[0%] font-bold">
            RentIt
          </p>
        </NavLink>

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
        <div className="hidden md:flex items-center gap-4">
          <ul className="flex gap-[8px] lg:gap-[16px] font-medium items-center text-[16px] leading-[100%] tracking-[0%]">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "ABOUT US" },
              { to: "/location/abuja", label: "ABUJA" },
              { to: "/location/lagos", label: "LAGOS" },
              { to: "/location/others", label: "OTHERS" },
            ].map(({ to, label }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  isActive
                    // ? "w-fit bg-[#337E66] rounded-[15px] font-bold text-[16px] text-[#FFFFFF] px-[20px] lg:px-[31.5px] py-[7px]"
                    ? "border-b-2 border-[#337E66]"
                    : ""
                }
              >
                <li>{label}</li>
              </NavLink>
            ))}
          </ul>
          {showSignup &&<NavLink
            to="signup"
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-[#337E66] text-[#FFFFFF]"
                  : "w-fit bg-[#337E66] rounded-[15px] font-bold text-[16px] text-[#FFFFFF] px-[20px] lg:px-[31.5px] py-[7px]"
              } rounded-[15px] font-bold text-[16px] px-[20px] lg:px-[31.5px] py-[7px]`
            }
          >
            SIGN UP
          </NavLink>}
          {showSignout &&<div
            className="w-fit bg-[#337E66] rounded-[15px] font-bold text-[16px] text-[#FFFFFF] px-[20px] lg:px-[31.5px] py-[7px]"
            onClick={handleSignout}
          >
            SIGN OUT
          </div>}
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden absolute top-[100%] left-0 right-0 bg-white shadow-lg z-100`}
      >
        <ul className="flex flex-col py-4 px-4 gap-4 font-medium text-[16px] leading-[100%] tracking-[0%]">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "ABOUT US" },
            { to: "/location/abuja", label: "ABUJA" },
            { to: "/location/lagos", label: "LAGOS" },
            { to: "/location/others", label: "OTHERS" },
          ].map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-[#337E66] w-fit"
                  : ""
              }
            >
              <li>{label}</li>
            </NavLink>
          ))}
          {showSignup && <NavLink
            to="signup"
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-[#337E66] text-[#FFFFFF]"
                  : "w-fit bg-[#337E66] rounded-[15px] font-bold text-[16px] text-[#FFFFFF] px-[20px] lg:px-[31.5px] py-[7px]"
              } rounded-[15px] font-bold text-[16px] px-[31.5px] py-[7px]`
            }
          >
            SIGN UP
          </NavLink>}
          {showSignout && <div
            className="w-fit bg-[#337E66] rounded-[15px] font-bold text-[16px] text-[#FFFFFF] px-[20px] lg:px-[31.5px] py-[7px]"
            onClick={handleSignout}
          >
            SIGN OUT
          </div>}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
