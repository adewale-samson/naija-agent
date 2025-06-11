import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import { forgotPassword } from "../api/auth";
import Spinner from "../assets/loader.gif";
import Cookies from "js-cookie";
import Logo from "../assets/logo.jpg";

const initialValues = {
  email: "",
};
const ForgotPassword = () => {
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const schema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });

  const onSubmit = async (values, actions) => {
    try {
      // console.log(values)
      setLoader(true);
      await forgotPassword(values)
        .then((res) => {
          //   console.log(res)
          Cookies.set("name", getFirstName(res.data.user.name), { expires: 1 });
          Cookies.set("email", res.data.user.email, { expires: 1 });
          navigate("/reset-success");
        })
        .catch((err) => {
          //   console.log(err)
          toast.error(err?.response?.data?.message || "Something went wrong!");
        });
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
      // console.error("Signup error:", error);
    } finally {
      setLoader(false);
      actions.setSubmitting(false);
    }
  };

  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit,
  });
  function getFirstName(fullName) {
    if (!fullName) return "";

    const parts = fullName.trim().split(" ");
    return parts[0];
  }
  return (
    <div className="min-h-screen bg-[#fff] sm:bg-[#B3D3C9]">
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
      <section className="font-mont py-[0px] sm:py-[30px]">
        <div className="w-[100%] sm:w-[616px] bg-[#fff] p-[16px] sm:p-[32px] rounded-[8px] mx-auto py-5">
          <h1 className="text-[32px] font-medium leading-[41.6px] text-[#2A2A2A] mb-2 mt-8 text-center ">
            Forgot Password
          </h1>
          <p className="font-regular text-[16px] leading-[20.8px] text-[#828282] mb-[32px] text-center">
            Provide your email address.
          </p>
          <form className="text-[#333] font-regular" onSubmit={handleSubmit}>
            <div className="mb-6 sm:mb-4">
              <label
                htmlFor="email"
                className={
                  errors.email && touched.email
                    ? "text-[#fc8181] block mb-2"
                    : "block mb-2 "
                }
              >
                {errors.email && touched.email
                  ? `${errors.email}`
                  : "Email Address"}
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter email address"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="font-mont block text-[#828282] border-[1px] border-[#EAEAEA] h-[48px] w-[100%] rounded-[8px] p-[15px] outline-none"
              />
            </div>
            <button
              type="submit"
              className=" font-medium bg-[#337E66] rounded-[4px] py-3 w-[100%] border-[0] text-[#fff] text-[16px] tracking-[3%] leading-[24px] cursor-pointer"
            >
              {loader ? (
                <img
                  width={16}
                  height={16}
                  src={Spinner}
                  alt="loader"
                  className="mx-auto"
                />
              ) : (
                "Reset password"
              )}
            </button>
            <p className="font-regular leading-[20.8px] text-4 text-[#828282] text-center mt-4 ">
              <Link to="/login">
                <span className="text-[#337E66] cursor-pointer">
                  Back to log in
                </span>
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
