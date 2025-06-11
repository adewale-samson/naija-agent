import Spread from "../assets/about-spread.png";
import Meet from "../assets/about-meet.png";
import Woman from "../assets/woman-key.png";
import Women from "../assets/women-meeting.png";
import Room from "../assets/room.png";
import { motion } from "framer-motion";

const About = () => {
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="px-4 sm:px-6 md:px-[48px]"
    >
      <h1 className="font-montagu text-[40px] text-center leading-[100%] tracking-[0%] py-[40px]">
        ABOUT US
      </h1>
      <section className="font-montagu flex flex-col md:flex-row md:justify-between md:items-center items-center gap-6 md:gap-10">
        <h2 className="text-[20px] font-normal leading-[100%] tracking-[0%] ">
          About us at 9ja Agents
        </h2>
        <div className="max-w-full md:max-w-[450px]">
          <p className="font-normal text-[15px] leading-[150%] tracking-[0%] mb-6">
            Finding the perfect apartment in Nigeria can often feel like an
            overwhelming challenge. Many prospective renters and buyers struggle
            to locate trustworthy agents who truly understand their needs and
            preferences.
          </p>
          {/* <p className="font-normal text-[15px] leading-[150%] tracking-[0%]">
            Recognizing this gap, we have developed RentIt to serve as a
            comprehensive solution for all your housing needs. Our platform
            connects users with agents who specialize in rental properties,
            ensuring that you receive personalized guidance throughout the
            rental process. With RentIt, you can navigate the housing market
            with confidence, making it easier than ever to find your ideal home
            without stress typically associated with renting or buying property.
            Let us help you simplify your search and make informed decisions
            when it comes to securing your next apartment.
          </p> */}
        </div>
      </section>
      <section className="w-full mb-[40px] md:mb-[80px]">
        <img src={Spread} alt="house picture" className="w-full object-cover" />
      </section>
      <section className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10 mb-[40px] md:mb-[80px]">
        <p className="w-full md:w-[465px] text-center md:text-left font-platypi font-normal italic text-[20px] lg:text-[24px] text-[#000] leading-[120%] md:leading-[100%] tracking-[0%]">
          "9ja Agents is a directory for agents in Nigeria. With this site, you can
          say goobye to spending so much time before finding the right agents
          that can rent you a house"
        </p>
        <div className="w-full md:w-auto">
          <img
            src={Meet}
            alt="meet"
            className="w-full md:w-auto object-cover"
          />
        </div>
      </section>
      <section className="mb-[40px]">
        {/* <h3 className="max-w-[592px] font-mont font-bold text-[40px] text-[#000] mx-auto leading-[100%] tracking-[0%] mb-[30px]">What you are guaranteed to gain by using our site</h3> */}
        <h3 className="max-w-[592px] font-mont font-bold text-[24px] sm:text-[32px] md:text-[40px] text-[#000] mx-auto leading-[120%] md:leading-[100%] tracking-[0%] mb-[30px] text-center">
          What you are guaranteed to gain by using our site
        </h3>
        <div className="flex flex-col md:flex-row gap-6 md:justify-between flex-wrap">
          <div className="w-full md:w-[278px] rounded-[30px] border border-[#008000] bg-[#fff] overflow-hidden">
            <div className="w-full md:w-[278px] h-[152px]">
              <img
                src={Woman}
                alt="woman giving out key"
                className="w-full h-full object-cover rounded-t-[30px]"
              />
            </div>
            <p className="font-mont font-[700] text-[12px] md:text-[14px] leading-[120%] md:leading-[100%] tracking-[0%] text-center text-[#000000] px-[14px] py-[12px]">
              100% certified agents
            </p>
          </div>
          <div className="w-full md:w-[278px] rounded-[30px] border border-[#008000] bg-[#fff] overflow-hidden">
            <div className="w-full md:w-[278px] h-[152px]">
              <img
                src={Women}
                alt="women discussing"
                className="w-full h-full object-cover rounded-t-[30px]"
              />
            </div>
            <p className="font-mont font-[700] text-[12px] md:text-[14px] leading-[120%] md:leading-[100%] tracking-[0%] text-center text-[#000000] px-[14px] py-[12px]">
              Trusted services
            </p>
          </div>
          <div className="w-full md:w-[278px] rounded-[30px] border border-[#008000] bg-[#fff] overflow-hidden">
            <div className="w-full md:w-[278px] h-[152px] overflow-none">
              <img
                src={Room}
                alt="picture of a room"
                className="w-full h-full object-cover rounded-t-[30px]"
              />
            </div>
            <p className="font-mont font-[700] text-[12px] md:text-[14px] leading-[120%] md:leading-[100%] tracking-[0%] text-center text-[#000000] px-[14px] py-[12px]">
              Easy access to options
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
