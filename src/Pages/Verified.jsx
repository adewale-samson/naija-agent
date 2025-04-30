import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router';
import Verify from '../assets/verify.svg'
import Loader from '../assets/loader.gif'
import { verifyEmail } from '../api/auth';
import { ToastContainer } from 'react-toastify';

const Verified = () => {
    const [token, setToken] = useState(null);
  const [loader, setLoader] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate()

  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, []);

  
  const handleVerify = () => {
    setLoader(true);
    verifyEmail(token)
      .then((response) => {
          // console.log(response)
          // setIsVerified(true);
          setLoader(false);
          setTimeout(()=>{
            navigate("/login");
          }, 2500)
      })
      .catch((err) => {
        // console.log(err);
        setLoader(false);
        // router.push("/auth/login");
      })
      .finally(() => {
        setLoader(false);
      });
  };
  return (
    <div className="min-h-screen font-mont bg-[#fff] sm:bg-[#B3D3C9] ">
            <ToastContainer />
        <div className="bg-[#fff] border-b-[0px] sm:border-b-[1px] border-b-[#337E66]">
        <Link to="/">
          <h1 className="font-bold font-mont text-[#337E66] text-[32px] text-center cursor-pointer mx-auto py-[20px]">
            RentIt
          </h1>
        </Link>
      </div>
        <section className="my-[60px] sm:my-[140px] md:my-[80px]">
          <div className="flex flex-col justify-center h-auto sm:h-[50vh]">
            <div className="w-[95%] sm:w-[538px] bg-[#fff] p-[32px] sm:p-[16px] rounded-[8px]  text-center m-auto ">
                <img src={Verify} alt='verify icon' className='mx-auto my-[24px]'/>
              <h1 className="text-[32px] font-medium leading-[41.6px] text-[#2A2A2A] mb-2 xm:mt-8 text-center ">
                Email Verification
              </h1>
              <p className="font-regular text-[16px] leading-[20.8px] text-[#828282] mb-[32px] text-center ">
                Your email address has been verified successfully!
              </p>
              <button
                className="bg-[#337E66] py-[14px] w-full font-medium text-[#ffff] font-[500] leading-[24px] text-[16px] cursor-pointer"
                onClick={handleVerify}
              >
                {loader ? <img src={Loader} alt='loader' className='mx-auto w-4 h-4'/> : 'Continue'}
                {/* Continue */}
              </button>
            </div>
          </div>
        </section>
      </div>
  )
}

export default Verified