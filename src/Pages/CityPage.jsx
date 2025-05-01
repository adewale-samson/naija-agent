import { useNavigate, useParams } from "react-router";
import Girl from "../assets/city-img.png";
import { useEffect, useState } from "react";
import { getLocationData } from "../api/data";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

const CityPage = () => {
  const navigate = useNavigate();
  const { cityName } = useParams();

  const [userToken, setUserToken] = useState(null);
  const [locationData, setLocationData] = useState([]);
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
    // console.log(userToken)
    // console.log(cityName)
    getLocationData(cityName, userToken)
      .then((res) => {
        // console.log(res)
        setLocationData(res.data.data);
      })
      .catch((err) => {
        // console.log(err)
      });
  }, [userToken, cityName]);
  // console.log(userToken)
  // const locationData = [
  //   {
  //     id: 1,
  //     image: Girl,
  //     name: "Bamidele Ayeni",
  //     location: cityName.toUpperCase(),
  //     fee: "10000",
  //     closedDeal: 100,
  //   },
  //   {
  //     image: Girl,
  //     name: "Tolani Alex",
  //     location: cityName.toUpperCase(),
  //     fee: "5000",
  //     closedDeal: 100,
  //   },
  //   {
  //     image: Girl,
  //     name: "Cassie",
  //     location: cityName.toUpperCase(),
  //     fee: "10000",
  //     closedDeal: 100,
  //   },
  //   {
  //     image: Girl,
  //     name: "Marie John",
  //     location: cityName.toUpperCase(),
  //     fee: "10000",
  //     closedDeal: 100,
  //   },
  //   {
  //     image: Girl,
  //     name: "Sands&Crystals",
  //     location: cityName.toUpperCase(),
  //     fee: "10000",
  //     closedDeal: 100,
  //   },
  // ];

  const handleSeeMore = (agentId) => {
    navigate(`/agent/${agentId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="font-mont px-4 sm:px-6 py-[24px]"
    >
      <div className="min-h-[1000px]">
        {locationData.map((data, index, arr) => (
          <div
            key={data._id}
            className={`flex items-center justify-between px-[8px] sm:px-[25px] py-[20px] border border-[#00000038] rounded-[20px] ${
              arr.length - 1 === index ? "mb-[0px]" : "mb-[16px]"
            }`}
          >
            <div className="w-fit">
              <div className="w-[88px] h-[88px] overflow-hidden rounded-[50%]">
                <img src={data.image} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-[600] text-[16px] text-[#000] text-center leading-[150%] tracking-[0] mt-[14px]">
                {data.name}
              </h3>
            </div>
            {/* <p className="hidden lg:block font-[600] text-[16px] text-[#000] leading-[150%] tracking-[0]">
              CALL
            </p> */}
            <div className=" ">
              <h4 className="font-[300] text-[12px] text-[#000] leading-[150%] tracking-[0] mb-[8px]">
                LOCATION
              </h4>
              <p className="font-[600] text-[16px] text-[#000] leading-[150%] tracking-[0]">
                {data.state}
              </p>
            </div>
            <div className="hidden sm:block">
              <h4 className="font-[300] text-[12px] text-[#000] leading-[150%] tracking-[0] mb-[8px]">
                INSPECTION FEE
              </h4>
              <p className="font-[600] text-[16px] text-[#000] leading-[150%] tracking-[0]">
                N{data.inspectionFee}
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
              onClick={() => handleSeeMore(data?._id)}
              className="w-[100px] sm:w-[139px] h-[40px] bg-[#337E66] text-[#fff] font-[600] text-[16px] leading-[150%] tracking-[0] rounded-[15px]"
            >
              See More
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CityPage;
