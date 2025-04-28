import React from "react";
import { Link } from "react-router";

const Verify = () => {
  return (
    <div className="min-h-screen font-mont bg-[#B3D3C9] xm:bg-[#fff] ">
      <div className="bg-[#fff] border-b-[1px] xm:border-b-[0px] border-b-[#337E66]">
        <Link to="/">
          <h1 className="font-bold font-mont text-[#337E66] text-[32px] text-center cursor-pointer mx-auto py-[20px]">
            RentIt
          </h1>
        </Link>
      </div>
      {/* <div className=' flex xm:block justify-center items-center h-full'> */}
      <div className="my-[140px] 1xl:my-[100px] xl:my-[80px] lgx:my-[50px] xm:my-[0]">
        <div className="p-[32px] xm:px-[16px] max-w-[514px] min-h-[297px] border-[1px] border-[#fff] bg-[#fff] mx-auto ">
          <h1 className="font-medium text-[32px] leading-[41.6px] text-[#2A2A2A] text-center xm:text-start pb-[8px] xm:pb-[16px]">
            Verify your email
          </h1>
          <p className="font-regular text-[16px] text-[#828282] leading-[25.44px] text-center xm:text-start pb-[48px] xm:pb-[479px]">
            Hi {'firstName'}! verification link has been sent to{" "}
            <span className="text-[#337E66]">{'email'}</span>
          </p>
          {/* <button className='w-[100%] rounded-[4%] bg-[#1453FF] border-[0.3px] border-[#654DE4] text-[#fff] py-[12px]'>Verify email</button> */}
          <p className="font-regular leading-[20.8px] text-4 text-[#828282] text-center mt-4 ">
            Already have an account ?{" "}
            <Link href="/auth/login">
              <span className="text-[#337E66] cursor-pointer">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
