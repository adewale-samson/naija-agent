import { useFormik } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import UserIcon from "../assets/user-icon.svg";
import EditIcon from "../assets/edit-icon2.svg";
import { handleAgentForm } from "../api/data";
import Cookies from 'js-cookie'

const validationSchema = Yup.object({
  bio: Yup.string()
    .required("About section is required")
    .min(50, "About section must be at least 50 characters"),
  rentPrice: Yup.number()
    .min(0, "Rents must be a positive number")
    .required("Number of rents is required"),
  sales: Yup.number()
    .min(0, "Sales must be a positive number")
    .required("Number of sales is required"),
  airbnb: Yup.number()
    .min(0, "AirBnB listings must be a positive number")
    .required("Number of AirBnB listings is required"),
  location: Yup.string().required("State/City is required"),
  inspectionFee: Yup.number()
    .min(0, "Inspection fee must be a positive number")
    .required("Inspection fee is required"),
  totalDeals: Yup.number()
    .min(0, "Total deals must be a positive number")
    .required("Total deals closed is required"),
});

const AgentForm = () => {
  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState("");
  const [aboutError, setAboutError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState("");
  const [userToken, setUserToken] = useState(null);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    try {
      const token = Cookies.get("token");
      if (token) {
        setUserToken(token);
      } else {
      }
    } catch (error) {
    //   console.error("Error retrieving token:", error);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      bio: "",
      rentPrice: 0,
      sales: 0,
      airbnb: 0,
      location: "",
      inspectionFee: 0,
      totalDeals: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);

        const formData = new FormData();
        if (!photo) {
          toast.error("Please select a profile photo");
          setIsSubmitting(false);
          return;
        }

        formData.append("image", photo);
        formData.append("about", values.bio);
        formData.append("rents", values.rentPrice.toString());
        formData.append("sales", values.sales.toString());
        formData.append("airbnb", values.airbnb.toString());
        formData.append("stateCity", values.location);
        formData.append("inspectionFee", values.inspectionFee.toString());
        formData.append("totalDeals", values.totalDeals.toString());

        const response = await handleAgentForm(formData, userToken);
        if (response.status === 201) {
            toast.success(response.data.message)
            setTimeout(() => {     
                navigate('/')            
            }, 2000);
        }
        formik.resetForm();
        setPhoto(null);
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
        toast.error(error.response?.data?.message || "Error saving profile. Please try again.");
      }
    },
  });

  const handlePhotoSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAlert("");
      setPhotoError("");
      const isImage = file.type.startsWith("image/");
      const isUnder5MB = file.size <= 5 * 1024 * 1024;
      if (!isImage) {
        toast.error("Please select a valid image file.");
        return;
      }
      if (!isUnder5MB) {
        toast.error("File size should be less than 5MB.");
        return;
      }
      setPhoto(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error states
    setPhotoError("");
    setAboutError("");

    // Validate photo
    if (!photo) {
      setPhotoError("Profile photo is required");
      return;
    }

    // Validate form using formik
    const formikErrors = await formik.validateForm();
    if (Object.keys(formikErrors).length > 0) {
      formik.setTouched(formikErrors);
      return;
    }

    // Submit the form if all validations pass
    formik.handleSubmit(e);
  };

  return (
    <div className="min-h-screen bg-[#B3D3C9]">
      <ToastContainer />
      <>
        <div className="bg-[#fff] border-b-[0px] sm:border-b-[1px] border-b-[#337E66]">
          <Link to="/">
            <h1 className="font-bold font-mont text-[#337E66] text-[32px] text-center cursor-pointer mx-auto py-[20px]">
              RentIt
            </h1>
          </Link>
        </div>
        <section className="font-mont py-[0] sm:py-[65px]">
          <div className="w-full md:w-[90%] max-w-[966px] bg-[#fff] sm:rounded-[8px] mx-auto">
            <div className="p-[24px] sm:px-[16px] flex gap-[16px] items-center border-t-[0px] sm:border-[1px] border-[#EAEAEA]">
              <div
                className="border-[1px] border-[#EAEAEA] rounded-[8px] p-[10px] cursor-pointer"
              >
                <IoIosArrowRoundBack className="text-[16px] text-[#292D32]" />
              </div>
              <h1 className="font-medium text-[18px] leading-[27px] sm:leading-[24px] tracking-[3%] text-[#121927]">
                Step 1: Agent Form
              </h1>
            </div>
            <div className="border-[1px] border-[#EAEAEA] px-[16px] sm:px-[80px] py-[24px]">
              <h2 className="font-medium text-[18px] text-[#101828] leading-[25.62px] mb-[10px]">
                Add Display Image
              </h2>
              <p className="font-regular text-[16px] text-[#535353] leading-[145%] tracking-[0%] mb-[40px]">
                Upload a professional image  that will serve as your display
                picture
              </p>
              <div className="relative w-full max-w-[283px] aspect-[283/257] bg-[#D9D9D9] border border-[#D9D9D9] rounded-[8px] flex items-center justify-center">
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Profile photo"
                    className="absolute w-full h-full object-cover rounded-[8px]"
                  />
                ) : (
                  <img src={UserIcon} width={54} height={54} alt="user icon" />
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoSelect}
                  accept="image/*"
                  className="hidden"
                />
                <img
                  src={EditIcon}
                  width={28}
                  height={28}
                  alt="edit icon"
                  className="absolute right-[-10px] bottom-[15px] cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                />
              </div>
              {photoError && (
                <span className="font-regular text-[14px] text-[red] leading-[100%] block mt-2">
                  {photoError}
                </span>
              )}
            </div>
            <div className="border-[1px] border-[#EAEAEA] px-[16px] sm:px-[80px] py-[24px]">
              <h2 className="font-medium text-[18px] text-[#101828] leading-[25.62px] mb-[10px]">
                Add About
              </h2>
              <p className="font-regular text-[16px] text-[#535353] leading-[145%] tracking-[0%] mb-[40px]">
                Enter a detailed description about you, this is what whoever
                sees your bio will read about you.
              </p>
              <div className="">
                <textarea
                  {...formik.getFieldProps("bio")}
                  placeholder="Type here"
                  className={`w-[806px] max-w-full h-[102px] border-[1px] 
                  ${aboutError ? "border-red-500" : "border-[#EAEAEA]"}
                  rounded-[8px] font-inter font-regular text-[16px] leading-[150%] p-4 mb-2 outline-none`}
                ></textarea>
                {aboutError && (
                  <div className="text-red-500 text-sm mb-[32px]">
                    {aboutError}
                  </div>
                )}
              </div>
            </div>
            <div className="border-[1px] border-[#EAEAEA] px-[16px] sm:px-[80px] py-[24px]">
              <h2 className="font-medium text-[18px] text-[#101828] leading-[25.62px] mb-[10px]">
                Property Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-[32px]">
                <div>
                  <label className="block font-regular text-[16px] text-[#535353] mb-2">
                    Number of Rents
                  </label>
                  <input
                    type="number"
                    {...formik.getFieldProps("rentPrice")}
                    className="w-full border-[1px] border-[#EAEAEA] rounded-[8px] p-4 outline-none"
                  />
                  {formik.touched.rentPrice && formik.errors.rentPrice && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.rentPrice}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-regular text-[16px] text-[#535353] mb-2">
                    Number of Sales
                  </label>
                  <input
                    type="number"
                    {...formik.getFieldProps("sales")}
                    className="w-full border-[1px] border-[#EAEAEA] rounded-[8px] p-4 outline-none"
                  />
                  {formik.touched.sales && formik.errors.sales && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.sales}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-regular text-[16px] text-[#535353] mb-2">
                    AirBnB Listings
                  </label>
                  <input
                    type="number"
                    {...formik.getFieldProps("airbnb")}
                    className="w-full border-[1px] border-[#EAEAEA] rounded-[8px] p-4 outline-none"
                  />
                  {formik.touched.airbnb && formik.errors.airbnb && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.airbnb}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-regular text-[16px] text-[#535353] mb-2">
                    State/City
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps("location")}
                    className="w-full border-[1px] border-[#EAEAEA] rounded-[8px] p-4 outline-none"
                  />
                  {formik.touched.location && formik.errors.location && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.location}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-regular text-[16px] text-[#535353] mb-2">
                    Inspection Fee (₦)
                  </label>
                  <input
                    type="number"
                    {...formik.getFieldProps("inspectionFee")}
                    className="w-full border-[1px] border-[#EAEAEA] rounded-[8px] p-4 outline-none"
                  />
                  {formik.touched.inspectionFee &&
                    formik.errors.inspectionFee && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.inspectionFee}
                      </div>
                    )}
                </div>

                <div>
                  <label className="block font-regular text-[16px] text-[#535353] mb-2">
                    Total Deals Closed
                  </label>
                  <input
                    type="number"
                    {...formik.getFieldProps("totalDeals")}
                    className="w-full border-[1px] border-[#EAEAEA] rounded-[8px] p-4 outline-none"
                  />
                  {formik.touched.totalDeals && formik.errors.totalDeals && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.totalDeals}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                onClick={handleFormSubmit}
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-[#337E66] text-white rounded-[8px] font-medium 
                hover:bg-[#286652] transition-colors disabled:bg-[#66a088] disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Uploading..." : "Upload Data"}
              </button>
            </div>
          </div>
        </section>
      </>
    </div>
  );
};

export default AgentForm;
