import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../assets/hero.png";

const Homepage = () => {
  return (
    <div className="font-mont">
      <Navbar />
      <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-[64px] mt-[40px] px-4 sm:px-6 md:px-8 lg:px-[80px]">
        <div className="w-full md:w-[523px] text-center md:text-start">
          <h1 className="font-bold leading-[100%] tracking-[0%] text-[32px] md:text-[40px] mb-[40px] ">
            Need a new <span className="text-[#00BB91]">Apartment</span> and
            can't find the right <span className="text-[#00BB91]">agents</span>{" "}
            to help?
          </h1>
          <button className="w-[242px] h-[56px] font-bold leading-[100%] tracking-[0%] rounded-[15px] py-[16px] text-[#fff] text-[20px] bg-[#00BB91]">
            Search here
          </button>
        </div>
        <div className="w-full md:w-auto">
          <div>
            <img src={Hero} alt="hero image" className="w-full md:w-auto" />
            <div className="flex justify-between mt-[30px] md:mt-[59px]">
              <div>
                <h2 className="font-bold leading-[100%] tracking-[0%] text-[18px] md:text-[20px] text-[#00BB91] mb-3">
                  1000+
                </h2>
                <p className="font-mooli font-normal text-[16px] md:text-[20px] leading-[100%] tracking-[0%]">
                  Rentals
                </p>
              </div>
              <div>
                <h2 className="font-bold leading-[100%] tracking-[0%] text-[18px] md:text-[20px] text-[#00BB91] mb-3">
                  500+
                </h2>
                <p className="font-mooli font-normal text-[16px] md:text-[20px] leading-[100%] tracking-[0%]">
                  Sales
                </p>
              </div>
              <div>
                <h2 className="font-bold leading-[100%] tracking-[0%] text-[18px] md:text-[20px] text-[#00BB91] mb-3">
                  1000+
                </h2>
                <p className="font-mooli font-normal text-[16px] md:text-[20px] leading-[100%] tracking-[0%]">
                  AirBnB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
