import { useNavigate, useParams } from "react-router";
import Girl from "../assets/city-img.png";
import { useEffect, useState } from "react";
import { getLocationData } from "../api/data";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";

const CityPage = () => {
  const navigate = useNavigate();
  const { cityName } = useParams();

  const [userToken, setUserToken] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({ type: null, message: "" });

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
    setLoader(true);
    setError({ type: null, message: "" });
    
    getLocationData(cityName, userToken)
      .then((res) => {
        setLocationData(res.data.data);
        setLoader(false);
      })
      .catch((err) => {
        setLocationData([]);
        setLoader(false);
        if (err.response?.status === 404) {
          setError({ 
            type: "not_found", 
            message: "No agents found in this location yet" 
          });
        } else if (!window.navigator.onLine) {
          setError({ 
            type: "network", 
            message: "Please check your internet connection and try again" 
          });
        } else {
          setError({ 
            type: "other", 
            message: "Something went wrong. Please try again later" 
          });
        }
      });
  }, [userToken, cityName]);

  const handleSeeMore = (agentId) => {
    navigate(`/agent/${agentId}`);
  };

  const EmptyState = ({ message }) => (
    <div className="min-h-[700px] flex flex-col justify-center items-center text-center px-4">
      <div className="mb-4">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#337E66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V12" stroke="#337E66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16H12.01" stroke="#337E66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No Results Found</h3>
      <p className="text-gray-600">{message}</p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="font-mont px-4 sm:px-6 py-[24px]"
    >
      {loader ? (
        <div className="min-h-[700px] flex justify-center items-center">
          <ClipLoader size={40} color={'#337E66'}/>
        </div>
      ) : error.type ? (
        <EmptyState message={error.message} />
      ) : (
        <div className="min-h-[1000px]">
          {locationData.map((data, index, arr) => (
            <div
              key={data.id}
              className={`flex items-center justify-between px-[8px] sm:px-[25px] py-[20px] border border-[#00000038] rounded-[20px] ${
                arr.length - 1 === index ? "mb-[0px]" : "mb-[16px]"
              }`}
            >
              <div className="w-[120px] md:w-[150px]">
                <div className="w-[55px] sm:w-[88px] h-[55px] sm:h-[88px] overflow-hidden rounded-[50%] mx-auto">
                  <img src={data.image} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-[600] text-[12px] sm:text-[16px] text-[#000] text-center leading-[150%] tracking-[0] mt-[14px]">
                  {data.name}
                </h3>
              </div>
              <div className=" hidden sm:block">
                <h4 className="font-[300] text-[12px] text-[#000] leading-[150%] tracking-[0] mb-[8px]">
                  LOCATION
                </h4>
                <p className="font-[600] text-[14px] sm:text-[16px] text-[#000] leading-[150%] tracking-[0]">
                  {data.state}
                </p>
              </div>
              <div className="sm:hidden">
                <div className="mb-[8px] ">
                  <h4 className="font-[300] text-[12px] text-[#000] leading-[120%] tracking-[0] mb-[4px]">
                    LOCATION
                  </h4>
                  <p className="font-[600] text-[14px] sm:text-[16px] text-[#000] leading-[120%] tracking-[0]">
                    {data.state}
                  </p>
                </div>
                <div className="">
                  <h4 className="font-[300] text-[12px] text-[#000] leading-[120%] tracking-[0] mb-[4px]">
                    INSPECTION FEE
                  </h4>
                  <p className="font-[600] text-[14px] sm:text-[16px] text-[#000] leading-[120%] tracking-[0]">
                  ₦{data.inspectionFee}
                  </p>
                </div>
              </div>
              <div className="hidden sm:block">
                <h4 className="font-[300] text-[12px] text-[#000] leading-[150%] tracking-[0] mb-[8px]">
                  INSPECTION FEE
                </h4>
                <p className="font-[600] text-[14px] sm:text-[16px] text-[#000] leading-[150%] tracking-[0]">
                ₦{data.inspectionFee}
                </p>
              </div>
              <div className="hidden lg:block">
                <h4 className="font-[300] text-[12px] text-[#000] leading-[150%] tracking-[0] mb-[8px]">
                  DEALS CLOSED
                </h4>
                <p className="font-[600] text-[16px] text-[#000] leading-[150%] tracking-[0]">
                  OVER {data.totalDeals}
                </p>
              </div>
              <button
                onClick={() => handleSeeMore(data?.id)}
                className="w-[80px] sm:w-[139px] h-[40px] bg-[#337E66] text-[#fff] font-[600] text-[14px] sm:text-[16px] leading-[150%] tracking-[0] rounded-[15px] cursor-pointer"
              >
                See More
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CityPage;
