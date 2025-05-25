import { useFormik } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import UserIcon from "../../assets/user-icon.svg";
import EditIcon from "../../assets/edit-icon2.svg";
import { editProfile, getComments, } from "../../api/data";
import Cookies from "js-cookie";
import { nigerianStates } from "../../constants/states";

const EditProfile = ({ agentData, setAgentData }) => {
  const [photo, setPhoto] = useState();
  const [photoError, setPhotoError] = useState("");
  const [aboutError, setAboutError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState("");
  const [userToken, setUserToken] = useState(null);

  let id;
  const validationSchema = Yup.object({
    bio: Yup.string()
      .required("About section is required")
      .min(50, "About section must be at least 50 characters"),
    rentPrice: Yup.number().min(1, "Rents must be greater than 0").nullable(),
    sales: Yup.number().min(1, "Sales must be greater than 0").nullable(),
    airbnb: Yup.number()
      .min(1, "AirBnB listings must be greater than 0")
      .nullable(),
    location: Yup.string().nullable(),
    inspectionFee: Yup.number()
      .min(1, "Inspection fee must be greater than 0")
      .nullable(),
    totalDeals: Yup.number()
      .min(1, "Total deals must be greater than 0")
      .nullable(),
    agreement: Yup.number()
      .min(1, "Agreement fee must be greater than 0")
      .nullable(),
    commission: Yup.number()
      .min(1, "Commission must be greater than 0")
      .nullable(),
  });

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
  useEffect(() => {
    if (!id) {
      return;
    }
    getComments(id)
      .then((res) => {
        // console.log(res.data.data.comments)
        setComments(res.data.data.comments);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: agentData.name || "",
      phone: agentData.phone || "",
      email: agentData.email || "",
      address: agentData.address || "",
      bio: agentData.bio || "",
      rentPrice: agentData.rentPrice || 0,
      sales: agentData.sales || 0,
      airbnb: agentData.airbnb || 0,
      location: agentData.state ? agentData.state.toLowerCase() : "",
      inspectionFee: agentData.inspectionFee || 0,
      totalDeals: agentData.totalDeals || 0,
      agreement: agentData.agreement || 0,
      commission: agentData.commission || 0,
    },
    validationSchema,
    onSubmit: async (values) => {
        setIsSubmitting(true);
        const formData = new FormData();
        // Only append photo if a new one is selected
        if (photo) {
          formData.append("image", photo);
        }
        formData.append("bio", values.bio);
        formData.append("rentPrice", values.rentPrice.toString());
        formData.append("phone", values.phone.toString());
        formData.append("address", values.address.toString());
        formData.append("sales", values.sales.toString());
        formData.append("airbnb", values.airbnb.toString());
        formData.append("stateCity", values.location);
        formData.append("inspectionFee", values.inspectionFee.toString());
        formData.append("totalDeals", values.totalDeals.toString());
        formData.append("agreement", values.agreement.toString());
        formData.append("commission", values.commission.toString());

        editProfile(formData, userToken)
        .then(response => {
          // console.log(response);
          if (response.status === 201) {
            toast.success(response.data.message);
            setAgentData(response.data.data)
            // setTimeout(() => {
            //   navigate("/");
            // }, 2000);
          }
          formik.resetForm();
          setPhoto(null);
          setIsSubmitting(false);

        })
        .catch(error => {
          // console.log(error)
          setIsSubmitting(false);
          toast.error(
            error.response?.data?.message ||
              "Error saving profile. Please try again."
          );
        })
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

    // Validate form using formik
    const formikErrors = await formik.validateForm();
    if (Object.keys(formikErrors).length > 0) {
      formik.setTouched(formikErrors);
      return;
    }

    // Submit the form if all validations pass
    formik.handleSubmit(e);
  };
  // console.log(formik.errors);
  return (
    <section className="font-mont py-0">
        <ToastContainer />
      <div className="w-full bg-[#fff] sm:rounded-[8px] mx-auto">
        {/* <div className="px-[16px] sm:px-[24px] lg:px-[80px] py-[24px] flex gap-[16px] items-center border-t-[0px] sm:border-[1px] border-[#EAEAEA]">
          
          <h1 className="font-medium text-[18px] leading-[27px] sm:leading-[24px] tracking-[3%] text-[#121927]">
            Agent Form
          </h1>
        </div> */}
        <div className="border-[1px] border-[#EAEAEA] px-[16px] sm:px-[24px] lg:px-[80px] py-[24px] rounded-[8px]">
          <h2 className="font-medium text-[18px] text-[#101828] leading-[25.62px] mb-[10px]">
            Add Display Image
          </h2>
          <p className="font-regular text-[16px] text-[#535353] leading-[145%] tracking-[0%] mb-[40px]">
            Upload a professional image that will serve as your display picture
          </p>
          <div className="relative w-full max-w-[283px] aspect-[283/257] bg-[#D9D9D9] border border-[#D9D9D9] rounded-[8px] flex items-center justify-center">
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="Profile photo"
                className="absolute w-full h-full object-cover rounded-[8px]"
              />
            ) : (
              <img
                src={agentData.image}
                width={54}
                height={54}
                alt="user icon"
                className="object-cover w-full h-full"
              />
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
        <div className="border-[1px] border-[#EAEAEA] px-[16px] sm:px-[24px] lg:px-[80px] py-[24px]">
          <h2 className="font-medium text-[18px] text-[#101828] leading-[25.62px] mb-[10px]">
            Details
          </h2>
          <div className="mb-6 sm:mb-4">
            <label
              htmlFor="name"
              className={
                formik.errors.name && formik.touched.name
                  ? "text-[#fc8181] block mb-2"
                  : "block mb-2"
              }
            >
              {formik.errors.name && formik.touched.name
                ? `${formik.errors.name}`
                : "Full name"}
            </label>
            <input
              type="text"
              id="name"
              {...formik.getFieldProps("name")}
              readOnly
              placeholder="Enter full name"
              className="font-mont block text-[#828282] border-[1px] border-[#EAEAEA] h-[48px] w-[100%] rounded-[8px] p-[15px] outline-none "
            />
          </div>
          <div className="mb-6 sm:mb-4">
            <label
              htmlFor="address"
              className={
                formik.errors.address && formik.touched.address
                  ? "text-[#fc8181] block mb-2"
                  : "block mb-2"
              }
            >
              {formik.errors.address && formik.touched.address
                ? `${formik.errors.address}`
                : "Address"}
            </label>
            <input
              type="text"
              id="address"
              {...formik.getFieldProps("address")}
              placeholder="Enter Address"
              className="font-mont block text-[#828282] border-[1px] border-[#EAEAEA] h-[48px] w-[100%] rounded-[8px] p-[15px] outline-none "
            />
          </div>
          <div className="flex flex-col lg:flex-row  gap-[8px]">
            <div className="w-full mb-6 sm:mb-4">
              <label
                htmlFor="email"
                className={
                  formik.errors.email && formik.touched.email
                    ? "text-[#fc8181] block mb-2"
                    : "block mb-2 "
                }
              >
                {formik.errors.email && formik.touched.email
                  ? `${formik.errors.email}`
                  : "Email Address"}
              </label>
              <input
                type="text"
                id="email"
                {...formik.getFieldProps("email")}
                placeholder="Enter email address"
                // value={values.email}
                // onChange={handleChange}
                // onBlur={handleBlur}
                className="font-mont block text-[#828282] border-[1px] border-[#EAEAEA] h-[48px] w-[100%] rounded-[8px] p-[15px] outline-none"
              />
            </div>
            <div className="w-full mb-6 sm:mb-4">
              <label
                htmlFor="phone"
                className={
                  formik.errors.phone && formik.touched.phone
                    ? "text-[#fc8181] block mb-2"
                    : "block mb-2 "
                }
              >
                {formik.errors.phone && formik.touched.phone
                  ? `${formik.errors.phone}`
                  : "Phone Number"}
              </label>
              <input
                type="text"
                id="phone"
                {...formik.getFieldProps("phone")}
                placeholder="Enter phone number"
                // value={values.phone}
                // onChange={handleChange}
                // onBlur={handleBlur}
                className="font-mont block text-[#828282] border-[1px] border-[#EAEAEA] h-[48px] w-[100%] rounded-[8px] p-[15px] outline-none"
              />
            </div>
          </div>
          {/* <p className="font-regular text-[16px] text-[#535353] leading-[145%] tracking-[0%] mb-[40px]">
            Enter a detailed description about you, this is what whoever sees
            your bio will read about you.
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
              <div className="text-red-500 text-sm mb-[32px]">{aboutError}</div>
            )}
          </div> */}
        </div>
        <div className="border-[1px] border-[#EAEAEA] px-[16px] sm:px-[24px] lg:px-[80px] py-[24px]">
          <h2 className="font-medium text-[18px] text-[#101828] leading-[25.62px] mb-[10px]">
            Add About
          </h2>
          <p className="font-regular text-[16px] text-[#535353] leading-[145%] tracking-[0%] mb-[40px]">
            Enter a detailed description about you, this is what whoever sees
            your bio will read about you.
          </p>
          <div className="">
            <textarea
              {...formik.getFieldProps("bio")}
              placeholder="Type here"
              className={`w-[806px] max-w-full h-[102px] border-[1px] 
                      ${
                        formik.touched.bio && formik.errors.bio
                          ? "border-red-500"
                          : "border-[#EAEAEA]"
                      }
                      rounded-[8px] font-inter font-regular text-[16px] leading-[150%] p-4 mb-2 outline-none`}
            ></textarea>
            {formik.touched.bio && formik.errors.bio && (
              <div className="text-red-500 text-sm mb-[32px]">
                {formik.errors.bio}
              </div>
            )}
          </div>
        </div>
        <div className="border-[1px] border-[#EAEAEA] px-[16px] sm:px-[24px] lg:px-[80px] py-[24px]">
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
              <select
                className="w-full border-[1px] border-[#EAEAEA] rounded-[8px] p-4 outline-none"
                {...formik.getFieldProps("location")}
              >
                <option value="">Select a state</option>
                {nigerianStates.map((state, index) => (
                  <option key={index} value={state.value}>
                    {state.option}
                  </option>
                ))}
              </select>
              {/* <input
                        type="text"
                        {...formik.getFieldProps("location")}
                        className="w-full border-[1px] border-[#EAEAEA] rounded-[8px] p-4 outline-none"
                      /> */}
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
              {formik.touched.inspectionFee && formik.errors.inspectionFee && (
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
            <div>
              <label className="block font-regular text-[16px] text-[#535353] mb-2">
                Agreement
              </label>
              <input
                type="number"
                {...formik.getFieldProps("agreement")}
                className="w-full border-[1px] border-[#EAEAEA] rounded-[8px] p-4 outline-none"
              />
              {formik.touched.agreement && formik.errors.agreement && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.agreement}
                </div>
              )}
            </div>
            <div>
              <label className="block font-regular text-[16px] text-[#535353] mb-2">
                Commission
              </label>
              <input
                type="number"
                {...formik.getFieldProps("commission")}
                className="w-full border-[1px] border-[#EAEAEA] rounded-[8px] p-4 outline-none"
              />
              {formik.touched.commission && formik.errors.commission && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.commission}
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
  );
};

export default EditProfile;
