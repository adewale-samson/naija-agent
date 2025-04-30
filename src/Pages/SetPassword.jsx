import { useFormik } from "formik";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import Spinner from "../assets/loader.gif";
import { resetPassword } from "../api/auth";
import Cookies from "js-cookie";

const initialValues = {
  newPassword: "",
  confirmPassword: "",
};

const SetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const schema = yup.object({
    newPassword: yup.string().required("Password is required").min(8).matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Password must contain at least one uppercase letter, one number and one special character"
      ),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .min(8)
      .oneOf([yup.ref('newPassword')], 'Passwords must match')
      
  });

  const onSubmit = async (values, actions) => {
    try {
      console.log(values);
      setLoader(true);
      await resetPassword(values)
        .then((res) => {
          // console.log(res)
          toast.success("Reset successful!");
          actions.resetForm();
          setTimeout(() => {
            navigate("/login");
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
          <h1 className="font-bold font-mont text-[#337E66] text-[32px] text-center cursor-pointer mx-auto py-[20px]">
            RentIt
          </h1>
        </Link>
      </div>
      <section className="font-mont py-[0px] sm:py-[30px]">
        <div className="w-[100%] sm:w-[616px] bg-[#fff] p-[16px] sm:p-[32px] rounded-[8px] mx-auto py-5">
          <h1 className="text-[32px] font-medium leading-[41.6px] text-[#2A2A2A] mb-2 mt-8 text-center ">
            Set new password
          </h1>
          <p className="font-regular text-[16px] leading-[20.8px] text-[#828282] mb-[32px] text-center">
            Provide your details.
          </p>
          <form className="text-[#333] font-regular" onSubmit={handleSubmit}>
            <div className="relative my-4 sm:my-6">
              <div className="flex justify-between">
                <label
                  htmlFor="newPassword"
                  className={
                    errors.newPassword && touched.newPassword
                      ? "text-[#fc8181] block mb-2"
                      : "block mb-2 "
                  }
                >
                  {errors.newPassword && touched.newPassword
                    ? `${errors.newPassword}`
                    : "New password"}
                </label>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                placeholder="Enter new Password"
                value={values.newPassword}
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
            <div className="relative my-4 sm:my-6">
              <div className="flex justify-between">
                <label
                  htmlFor="confirmPassword"
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? "text-[#fc8181] block mb-2"
                      : "block mb-2 "
                  }
                >
                  {errors.confirmPassword && touched.confirmPassword
                    ? `${errors.confirmPassword}`
                    : "Password"}
                </label>
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Enter Password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className="font-mont block text-[#828282] border-[1px] border-[#EAEAEA] h-[48px] w-[100%] rounded-[8px] p-[15px] outline-none"
              />
              <div
                className="absolute right-[10px] top-[60%] cursor-pointer"
                onClick={toggleConfirmVisibility}
              >
                {showConfirmPassword ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
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
                "Reset password"
              )}
            </button>
            <p className="font-regular leading-[20.8px] text-4 text-[#828282] text-center mt-4 ">
              Back to
              <Link to="/login">
                <span className="text-[#337E66] cursor-pointer">log in</span>
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SetPassword;
