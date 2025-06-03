import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router";
import Cookies from "js-cookie";
import { VscSignOut } from "react-icons/vsc";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [showSignup, setShowSignup] = useState(true);
  const [showSignout, setShowSignout] = useState(false);
  const [showOthersDropdown, setShowOthersDropdown] = useState(false);

  const navigate = useNavigate();

  const otherLocations = [
    { to: "/location/abia", label: "Abia" },
    { to: "/location/adamawa", label: "Adamawa" },
    { to: "/location/akwa-ibom", label: "Akwa Ibom" },
    { to: "/location/anambra", label: "Anambra" },
    { to: "/location/bauchi", label: "Bauchi" },
    { to: "/location/bayelsa", label: "Bayelsa" },
    { to: "/location/benue", label: "Benue" },
    { to: "/location/borno", label: "Borno" },
    { to: "/location/cross-river", label: "Cross River" },
    { to: "/location/delta", label: "Delta" },
    { to: "/location/ebonyi", label: "Ebonyi" },
    { to: "/location/edo", label: "Edo" },
    { to: "/location/ekiti", label: "Ekiti" },
    { to: "/location/enugu", label: "Enugu" },
    { to: "/location/gombe", label: "Gombe" },
    { to: "/location/imo", label: "Imo" },
    { to: "/location/jigawa", label: "Jigawa" },
    { to: "/location/kaduna", label: "Kaduna" },
    { to: "/location/kano", label: "Kano" },
    { to: "/location/katsina", label: "Katsina" },
    { to: "/location/kebbi", label: "Kebbi" },
    { to: "/location/kogi", label: "Kogi" },
    { to: "/location/kwara", label: "Kwara" },
    { to: "/location/nasarawa", label: "Nasarawa" },
    { to: "/location/niger", label: "Niger" },
    { to: "/location/ogun", label: "Ogun" },
    { to: "/location/ondo", label: "Ondo" },
    { to: "/location/osun", label: "Osun" },
    { to: "/location/oyo", label: "Oyo" },
    { to: "/location/plateau", label: "Plateau" },
    { to: "/location/rivers", label: "Rivers" },
    { to: "/location/sokoto", label: "Sokoto" },
    { to: "/location/taraba", label: "Taraba" },
    { to: "/location/yobe", label: "Yobe" },
    { to: "/location/zamfara", label: "Zamfara" },
  ];

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
  }, []);
  useEffect(() => {
    if (userToken) {
      setShowSignup(false);
      setShowSignout(true);
    } else {
      setShowSignup(true);
      setShowSignout(false);
    }
  }, [userToken]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleSignout = () => {
    Cookies.remove("token");
    Cookies.remove("id");
    Cookies.remove("name");
    Cookies.remove("email");
    window.location.href = "/";
    // navigate('/')
  };
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
            ].map(({ to, label }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-[#337E66]" : ""
                }
              >
                <li>{label}</li>
              </NavLink>
            ))}
            <div className="relative">
              <div
                onMouseEnter={() => setShowOthersDropdown(true)}
                onMouseLeave={() => setShowOthersDropdown(false)}
              >
                <li className="cursor-pointer">OTHERS</li>
                {showOthersDropdown && (
                  <div className="h-[500px] overflow-y-auto absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-[150px] z-100">
                    {otherLocations.map(({ to, label }) => (
                      <NavLink
                        key={label}
                        to={to}
                        onClick={() => setShowOthersDropdown(false)}
                        className={({ isActive }) =>
                          `block px-4 py-2 hover:bg-gray-100 ${
                            isActive ? "text-[#337E66] font-bold" : ""
                          }`
                        }
                      >
                        {label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ul>
          {showSignup && (
            <NavLink
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
            </NavLink>
          )}
          {showSignout && (
            <div
              className="w-fit bg-[#337E66] rounded-[15px] font-bold text-[16px] text-[#FFFFFF] px-[20px] lg:px-[31.5px] py-[7px]"
              onClick={()=>navigate('/dashboard')}
            >
              Dashboard
            </div>
          )}
          {showSignout && <div>
            <VscSignOut className="text-[#337E66] text-[20px]" onClick={handleSignout}/>
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
          ].map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                isActive ? "border-b-2 border-[#337E66] w-fit" : ""
              }
            >
              <li>{label}</li>
            </NavLink>
          ))}
          <div className="space-y-2">
            <div onClick={() => setShowOthersDropdown(!showOthersDropdown)}>
              <li className="cursor-pointer">OTHERS</li>
            </div>
            {showOthersDropdown && (
              <div className="pl-4 space-y-2">
                {otherLocations.map(({ to, label }) => (
                  <NavLink
                    key={label}
                    to={to}
                    onClick={() => setShowOthersDropdown(false)}
                    className={({ isActive }) =>
                      `block ${isActive ? "text-[#337E66] font-bold" : ""}`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
          {showSignup && (
            <NavLink
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
            </NavLink>
          )}
          {showSignout && (
            <div
              className="w-fit bg-[#337E66] rounded-[15px] font-bold text-[16px] text-[#FFFFFF] px-[20px] lg:px-[31.5px] py-[7px]"
              onClick={()=>navigate('/dashboard')}
            >
              Dashboard
            </div>
          )}
          {showSignout && <div>
            <VscSignOut className="text-[#337E66] text-[20px]" onClick={handleSignout}/>
          </div>}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
