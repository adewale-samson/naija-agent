import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Verify from "../assets/verify.svg";
import Loader from "../assets/loader.gif";
import Spinner from "../assets/spinner.gif";
import { verifyEmail } from "../api/auth";
import { ToastContainer } from "react-toastify";
import Logo from "../assets/logo.jpg";
import Cookies from "js-cookie";

const Verified = () => {
  const [token, setToken] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, []);

  useEffect(() => {
    if (token) {
      verifyEmail(token)
        .then((response) => {
          setIsVerified(true);
        })
        .catch((err) => {
          setIsVerified(true);
        })
    }
  }, [token]);

  const handleContinue = () => {
    Cookies.remove("name");
    Cookies.remove("email");
    navigate("/login");
  };

  // if (isVerified) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-[#fff] sm:bg-[#B3D3C9]">
  //       <img src={Loader} alt="Loading..." className="w-12 h-12" />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen font-mont bg-[#fff] sm:bg-[#B3D3C9] ">
      <ToastContainer />
      <div className="bg-[#fff] border-b-[0px] sm:border-b-[1px] border-b-[#337E66]">
        <Link to="/">
          {/* <h1 className="font-bold font-mont text-[#337E66] text-[32px] text-center cursor-pointer mx-auto py-[20px]">
            RentIt
          </h1> */}
          <div className="max-w-[60px] lg:max-w-[90px] cursor-pointer mx-auto py-[20px]">
            <img src={Logo} alt="9ja agent logo" className="" />
          </div>
        </Link>
      </div>
      <section className="my-[60px] sm:my-[140px] md:my-[80px]">
        <div className="flex flex-col justify-center h-auto sm:h-[50vh]">
          <div className="w-[95%] sm:w-[538px] bg-[#fff] p-[24px] sm:p-[16px] rounded-[8px]  text-center m-auto ">
            {isVerified ?
            <>
              <img src={Verify} alt="verify icon" className="mx-auto my-[16px]" />
              <h1 className="text-[32px] font-medium leading-[41.6px] text-[#2A2A2A] mb-2 xm:mt-8 text-center ">
                Email Verification
              </h1>
              <p className="font-normal text-[16px] leading-[20.8px] text-[#828282] mb-[8px] text-center ">
                Your email address has been verified successfully!
              </p>
              <p className="font-normal text-[16px] leading-[20.8px] text-[#828282] mb-[24px] text-center">
                Welcome to 9ja Agents! Click continue to update your profile with
                your details, inspection fees, listings, and photos. Start
                connecting with your target audience today!
              </p>
              <button
                className="bg-[#337E66] py-[14px] w-full font-medium text-[#ffff] font-[500] leading-[24px] text-[16px] cursor-pointer"
                onClick={handleContinue}
              >
                Continue
              </button>
            </> : <img src={Spinner} alt="Loading..." className="w-12 h-12 block mx-auto" />

            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default Verified;
