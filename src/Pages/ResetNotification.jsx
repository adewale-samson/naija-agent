import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Cookies from 'js-cookie'

const ResetNotification = () => {
    const [firstName, setFirstName] = useState('');
        const [email, setEmail] = useState('');
    
      useEffect(() => {
            try {
              const name = Cookies.get("name");
              const email = Cookies.get("email");
              if (name) {
                setFirstName(name);
              } else {
                return
              }
              if(email){
                setEmail(email)
              } return
            } catch (error) {
            //   console.error("Error retrieving token:", error);
            }
          }, []);
  return (
    <div className="min-h-screen font-mont bg-[#fff] sm:bg-[#B3D3C9] ">
      <div className="bg-[#fff] border-b-[0px] sm:border-b-[1px] border-b-[#337E66]">
        <Link to="/">
          <h1 className="font-bold font-mont text-[#337E66] text-[32px] text-center cursor-pointer mx-auto py-[20px]">
            RentIt
          </h1>
        </Link>
      </div>
      <div className="my-[60px] sm:my-[140px] md:my-[80px]">
        <div className="px-[16px] sm:p-[32px] max-w-[514px] min-h-[297px] border-[1px] border-[#fff] bg-[#fff] mx-auto ">
          <h1 className="font-medium text-[32px] leading-[41.6px] text-[#2A2A2A] text-start sm:text-center pb-[16px] sm:pb-[8px]">
            Password Reset Email
          </h1>
          <p className="font-regular text-[16px] text-[#828282] leading-[25.44px] text-start sm:text-center pb-[179px] sm:pb-[48px]">
          Hi {firstName}! A reset password link has been sent to {email}. Kindly click on the button in the email sent to your email address to reset your password.
            {/* <span className="text-[#337E66]">{email}</span> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetNotification;
