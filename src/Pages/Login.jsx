import { useFormik } from "formik";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import Spinner from "../assets/loader.gif";
import { LoginAuth } from "../api/auth";
import Cookies from "js-cookie";
import Logo from "../assets/logo.jpg";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const schema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const onSubmit = async (values, actions) => {
    try {
      // console.log(values)
      setLoader(true);
      await LoginAuth(values)
        .then((res) => {
          console.log(res);
          Cookies.set("token", res.data.token, { expires: 1 });
          Cookies.set("id", res.data.data.user._id, { expires: 1 });
          toast.success("Login successful!");
          actions.resetForm();
          setTimeout(() => {
            if (
              res.data.data.user.image &&
              res.data.data.user.isVerified &&
              res.data.data.user.inspectionFee
            ) {
              navigate("/dashboard");
            } else {
              navigate("/agentform");
            }
          }, 2500);
        })
        .catch((err) => {
          // console.log(err)
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
  return (
    <div className="min-h-screen bg-[#fff] sm:bg-[#B3D3C9]">
      <ToastContainer />
      <div className="bg-[#fff] border-b-[0px] sm:border-b-[1px] border-b-[#337E66]">
        <Link to="/">
          {/* <h1 className="font-bold font-mont text-[#337E66] text-[32px] text-center cursor-pointer mx-auto py-[20px]">
            RentIt
          </h1> */}
          <div
            className="max-w-[60px] lg:max-w-[90px] cursor-pointer mx-auto py-[20px]"
          >
            <img src={Logo} alt="9ja agent logo" className="" />
          </div>
        </Link>
      </div>
      <section className="font-mont py-[0px] sm:py-[30px]">
        <div className="w-[100%] sm:w-[616px] bg-[#fff] p-[16px] sm:p-[32px] rounded-[8px] mx-auto py-5">
          <h1 className="text-[32px] font-medium leading-[41.6px] text-[#2A2A2A] mb-2 mt-8 text-center ">
            Login
          </h1>
          <p className="font-regular text-[16px] leading-[20.8px] text-[#828282] mb-[32px] text-center">
            Provide your login details.
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
            <div className="relative my-4 sm:my-6">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className={
                    errors.password && touched.password
                      ? "text-[#fc8181] block mb-2"
                      : "block mb-2 "
                  }
                >
                  {errors.password && touched.password
                    ? `${errors.password}`
                    : "Password"}
                </label>
                <Link to="/forgot">
                  <p className="font-medium text-[14px] leading-[16.94px] text-[#FF5959] block">
                    Forgot Password
                  </p>
                </Link>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="font-mont block text-[#828282] border-[1px] border-[#EAEAEA] h-[48px] w-[100%] rounded-[8px] p-[15px] outline-none"
              />
              <div
                className="absolute right-[10px] top-[60%] cursor-pointer"
                onClick={toggleVisibility}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
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
                "Login"
              )}
            </button>
            <p className="font-regular leading-[20.8px] text-4 text-[#828282] text-center mt-4 ">
              Don't have an account ?{" "}
              <Link to="/signup">
                <span className="text-[#337E66] cursor-pointer">Sign up</span>
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
