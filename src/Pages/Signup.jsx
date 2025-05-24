import { useFormik } from "formik";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useSignup } from "../hooks/useSignup";
import * as yup from "yup";
import Spinner from "../assets/loader.gif";
import { SignupAuth } from "../api/auth";
import Cookies from "js-cookie";
import nigerianStates from "../constants/states";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  instagram: "",
  state: "",
  password: "",
  // checkbox: false,
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  const { mutate, isPending, isError } = useSignup();

  const navigate = useNavigate();
  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const schema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    name: yup.string().required("Full name is required"),
    address: yup.string().required("Address is required"),
    state: yup.string().required("State is required"),
    instagram: yup
      .string()
      .required("Instagram url is required")
      .matches(
        /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+(\/)?$/,
        "Please enter a valid Instagram URL (e.g., https://instagram.com/username)"
      ),
    phone: yup
      .string()
      .matches(/^\+?[0-9]+$/, "Enter valid phone number")
      .min(11, "Number must be at least 11 digits")
      .max(15, "Number must not exceed 15 digits")
      .required("Phone number is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8)
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Password must contain at least one uppercase letter, one number and one special character"
      ),
    // checkbox: yup.boolean().oneOf([true], "Please accept the terms"),
  });

  const onSubmit = async (values, actions) => {
    try {
      // console.log(values);
      setLoader(true);
      await SignupAuth(values)
        .then((res) => {
          // console.log(res)
          Cookies.set("name", getFirstName(res.data.response.name), {
            expires: 1,
          });
          Cookies.set("email", res.data.response.email, { expires: 1 });
          toast.success("Account created successfully!");
          actions.resetForm();
          setTimeout(() => {
            navigate("/verify");
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

  function getFirstName(fullName) {
    if (!fullName) return "";

    const parts = fullName.trim().split(" ");
    return parts[0];
  }

  return (
    <div className="min-h-screen  bg-[#fff] sm:bg-[#B3D3C9]">
      <ToastContainer />
      <div className="bg-[#fff] border-b-[0px] sm:border-b-[1px] border-b-[#337E66]">
        <Link to="/">
          <h1 className="font-bold font-mont text-[#337E66] text-[32px] text-center cursor-pointer mx-auto py-[20px]">
            RentIt
          </h1>
        </Link>
      </div>
      <section className="font-mont py-[0px] sm:py-[30px]">
        <div className="w-[100%] sm:w-[616px] bg-[#fff] p-[16px] sm:p-[32px] rounded-[8px] mx-auto py-5">
          <h1 className="text-[32px] font-medium leading-[41.6px] text-[#2A2A2A] mb-2 mt-8 text-center ">
            Create an Account
          </h1>
          <p className="font-regular text-[16px] leading-[20.8px] text-[#828282] mb-[32px] text-center">
            Fill the form to create your account.
          </p>
          <form className="text-[#333] font-regular" onSubmit={handleSubmit}>
            <div className="mb-6 sm:mb-4">
              <label
                htmlFor="name"
                className={
                  errors.name && touched.name
                    ? "text-[#fc8181] block mb-2"
                    : "block mb-2"
                }
              >
                {errors.name && touched.name ? `${errors.name}` : "Full name"}
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter full name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="font-mont block text-[#828282] border-[1px] border-[#EAEAEA] h-[48px] w-[100%] rounded-[8px] p-[15px] outline-none "
              />
            </div>
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
            <div className="mb-6 sm:mb-4">
              <label
                htmlFor="phone"
                className={
                  errors.phone && touched.phone
                    ? "text-[#fc8181] block mb-2"
                    : "block mb-2 "
                }
              >
                {errors.phone && touched.phone
                  ? `${errors.phone}`
                  : "Phone Number"}
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Enter phone number"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className="font-mont block text-[#828282] border-[1px] border-[#EAEAEA] h-[48px] w-[100%] rounded-[8px] p-[15px] outline-none"
              />
            </div>
            <div className="mb-6 sm:mb-4">
              <label
                htmlFor="address"
                className={
                  errors.address && touched.address
                    ? "text-[#fc8181] block mb-2"
                    : "block mb-2"
                }
              >
                {errors.address && touched.address
                  ? `${errors.address}`
                  : "Address"}
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter Address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className="font-mont block text-[#828282] border-[1px] border-[#EAEAEA] h-[48px] w-[100%] rounded-[8px] p-[15px] outline-none "
              />
            </div>
            <div className="mb-6 sm:mb-4">
              <label
                htmlFor="state"
                className={
                  errors.state && touched.state
                    ? "text-[#fc8181] block mb-2"
                    : "block mb-2"
                }
              >
                {errors.state && touched.state ? `${errors.state}` : "State"}
              </label>
              {/* <input
                type="text"
                id="state"
                placeholder="Enter State"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                className="font-mont block text-[#828282] border-[1px] border-[#EAEAEA] h-[48px] w-[100%] rounded-[8px] p-[15px] outline-none "
              /> */}{" "}
              <select
                id="state"
                name="state"
                className="font-mont block text-[#828282] border-[1px] border-[#EAEAEA] h-[48px] w-[100%] rounded-[8px] p-[8px] outline-none"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select a state</option>
                {nigerianStates.map((state, index) => (
                  <option key={index} value={state.value}>
                    {state.option}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6 sm:mb-4">
              <label
                htmlFor="instagram"
                className={
                  errors.instagram && touched.instagram
                    ? "text-[#fc8181] block mb-2"
                    : "block mb-2"
                }
              >
                {errors.instagram && touched.instagram
                  ? `${errors.instagram}`
                  : "Instagram Url"}
              </label>
              <input
                type="text"
                id="instagram"
                placeholder="Enter your instagram url"
                value={values.instagram}
                onChange={handleChange}
                onBlur={handleBlur}
                className="font-mont block text-[#828282] border-[1px] border-[#EAEAEA] h-[48px] w-[100%] rounded-[8px] p-[15px] outline-none "
              />
            </div>
            <div className="relative mt-4 sm:mt-6 mb-[32px]">
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
                "Create account"
              )}
            </button>
            <p className="font-regular leading-[20.8px] text-4 text-[#828282] text-center mt-4 ">
              Already have an account ?{" "}
              <Link to="/login">
                <span className="text-[#337E66] cursor-pointer">Login</span>
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Signup;
