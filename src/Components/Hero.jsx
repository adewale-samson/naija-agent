import { useEffect, useState } from "react";
import HeroLady from "../assets/hero-lady.png";
import LandingHero from "../assets/landing-hero.png";
import { AiOutlineHome } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { useNavigate, Link } from "react-router";
import Cookies from "js-cookie";

const Hero = () => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(null);
  const [showSignup, setShowSignup] = useState(true);
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
    } else {
      setShowSignup(true);
    }
  }, [userToken]);
  return (
    <section className="font-mont bg-[#F9FAFB] px-[16px] sm:px-[33px] ">
      <div className="max-w-7xl border border-[#D9D9D9] rounded-[20px] bg-[#E7ECF080] px-6 pt-[32px] pb-[40px] md:pb-[157px] grid md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <div className="space-y-6 max-w-[600px]">
          <h1 className="text-[26px] lg:text-5xl font-medium text-[#000] leading-none tracking-[0%]">
            Connect with as many <span className="text-[#337E66]">agents</span>{" "}
            as you want
            <br className="hidden md:block" /> in Nigeria.
          </h1>
          <p className="max-w-[327px] font-normal text-[#000] text-[16px] leading-none">
            Do you need to rent or buy a new House or apartment in Nigeria and
            can’t find the right agent to help online?
          </p>

          {/* Buttons */}
          <div className="flex flex-col flex-wrap gap-4">
            <button className="w-[178px] bg-[#337E66] text-[#fff] text-[16px] leading-none font-medium py-2 rounded-[20px] hover:bg-[#006a50] transition cursor-pointer" onClick={()=>navigate('/trending')}>
              Search here
            </button>
            {/* {showSignup && (
              <button
                onClick={() => navigate("/signup")}
                className="w-[178px] border border-[#337E66] bg-[#fff] text-[#007F5F] text-[16px] leading-none font-medium py-2 rounded-[20px] hover:bg-[#f0fdfa] transition"
              >
                Sign up
              </button>
            )} */}
            {showSignup && (
              // <button
              //   onClick={() => navigate("/signup")}
              //   className="w-[178px] border border-[#337E66] bg-[#fff] text-[#007F5F] text-[16px] leading-none font-medium py-2 rounded-[20px] hover:bg-[#f0fdfa] transition"
              // >
              //   Sign up
              // </button>
                <p>Sign up as an agent <Link className="text-[#007F5F] text-[16px] leading-none font-medium underline cursor-pointer" to='/signup'>here</Link></p>
            )}
          </div>

        </div>

        {/* Image */}
        <div className="relative">
          <img
            // src={HeroLady}
            src={LandingHero}
            alt="Happy agent"
            className="w-full max-w-sm md:max-w-full mx-auto"
          />

          {/* Floating tag on image */}
          {/* <div className="absolute top-[100px] sm:top-[150px] lg:top-[190px] right-[10px] sm:right-[20px] md:right-[40px] bg-white shadow-md px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-[15px] md:rounded-[20px] flex items-center gap-1 sm:gap-1.5 md:gap-2 max-w-[180px] sm:max-w-[200px] md:max-w-[250px]"> */}
          <div className="absolute top-[15px] sm:top-[31px] -right-[20px] bg-white shadow-md px-2 py-1 rounded-[15px] md:rounded-[20px] flex items-center gap-1 sm:gap-1.5 md:gap-2 max-w-[180px]">
            <AiFillHome className="text-[#00BB91] text-[10px] flex-shrink-0" />
            <span className="text-[8px] sm:text-[10px] font-bold">
              More than 10,000 agents
            </span>
          </div>
          {/* <div className="absolute top-[160px] sm:top-[220px] lg:top-[280px] right-[5px] sm:right-[15px] md:right-[20px] bg-white shadow-md px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-[15px] md:rounded-[20px] flex items-center gap-1 sm:gap-1.5 md:gap-2 max-w-[180px] sm:max-w-[200px] md:max-w-[250px]"> */}
          <div className="absolute top-[90px] -right-[20px] bg-white shadow-md px-2 py-1 rounded-[15px] md:rounded-[20px] flex items-center gap-1 sm:gap-1.5 md:gap-2 max-w-[133px] sm:max-w-[180px]">
            <BsTelephone className="text-[#FF0000] text-[10px] flex-shrink-0" />
            <span className="text-[8px] sm:text-[10px] text-center font-bold">
              Connecting with agents with just one call
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
