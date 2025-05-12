import { useEffect, useState, useRef } from "react";
import { FaCheckCircle, FaTwitter } from "react-icons/fa";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { BiSolidExit } from "react-icons/bi";
import { FaComment } from "react-icons/fa6";
import { RiShakeHandsFill } from "react-icons/ri";
import { FaCommentDollar } from "react-icons/fa6";
import { HiChartPie } from "react-icons/hi";
import { RiBuildingFill } from "react-icons/ri";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const navItems = [
  { label: "Comments", icon: <FaComment className="text-[#337E66]" /> },
  {
    label: "Commissions",
    icon: <RiShakeHandsFill className="text-[#6778C6]" />,
  },
  {
    label: "Inspection fees",
    icon: <FaCommentDollar className="text-[#69B399]" />,
  },
  { label: "Total Rents", icon: <RiBuildingFill className="text-[#00BB91]" /> },
  { label: "Total Sales", icon: <HiChartPie className="text-[#DEB887]" /> },
];

const Sidebar = ({ agentInfo }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const sidebarRef = useRef(null);

  // Collapse automatically on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // run it once on load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

   useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !collapsed
      ) {
        setCollapsed(true);
      }
    }

    if (!collapsed) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [collapsed]);

  function getFirstName(fullName) {
    if (!fullName) return "";
    const names = fullName.trim().split(" ");
    return names[0];
  }

  const handleSignout = () => {
    Cookies.remove("token");
    window.location.href = '/';
  };

  return (
    // <div
    //   className={`bg-white border-r border-r-[#fff] min-h-screen p-4 flex flex-col
    //   ${collapsed ? "w-20" : "w-64"} 
    //   transition-all duration-500 ease-in-out`}
    // >
    <div
    ref={sidebarRef}
  className={`
    bg-white border-r border-r-[#fff] min-h-screen p-4 flex flex-col
    ${collapsed ? "w-20" : "w-64"} 
    ${!collapsed ? "absolute top-0 left-0 z-50 shadow-lg md:relative" : "relative"}
    transition-all duration-500 ease-in-out
  `}
>
      {/* Top */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed && <h1 className="text-xl font-bold" onClick={()=>navigate('/')}>RentIt</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-600 md:hidden"
        >
          ☰
        </button>
      </div>

      {/* Profile Picture */}
      <div className="relative mb-5 flex justify-center">
        <div className="relative">
          <img
            src={agentInfo.image}
            alt="Profile"
            className={`rounded-full object-cover border-2 border-gray-200
              ${collapsed ? "w-12 h-12" : "w-[118px] h-[118px]"}
            `}
          />
          <div
            className={`absolute ${
              collapsed ? "top-0 -right-1" : "top-[30px] -right-2"
            }`}
          >
            <BsFillPatchCheckFill
              className="text-[#1DE9B6] bg-white rounded-full p-[2px]"
              size={collapsed ? 16 : 24}
            />
          </div>
        </div>
      </div>
      {!collapsed && <h3 className=" font-semibold text-[20px] text-center leading-[100%] mb-[42px] tracking-[0]">
        Welcome, {getFirstName(agentInfo.name)}
      </h3>}

      {/* Navigation */}
      <div className="flex flex-col items-center gap-6">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center text-gray-700 cursor-pointer hover:text-black w-full
              ${collapsed ? "justify-center" : "justify-center gap-3"}`}
          >
            <div className="text-xl">{item.icon}</div>
            {!collapsed && (
              <span className="text-md w-29 text-center font-semibold text-[14px] leading-none tracking-[0] text-[#000]">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="mt-auto w-full flex justify-center">
        <button
          className="flex items-center gap-2 text-red-600 mt-6"
          onClick={handleSignout}
        >
          {/* <div className="text-xl">🚪</div> */}
          <div className="text-xl">
            <BiSolidExit className="text-[#000000]" />
          </div>
          {!collapsed && (
            <span className="w-[84px] text-[20px] text-[#000] leading-[100%]  text-center">
              Log Out
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
