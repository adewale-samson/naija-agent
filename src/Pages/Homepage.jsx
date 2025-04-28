import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import RentInfo from "../Components/RentInfo";
import ReviewSection from "../Components/ReviewSection";


const Homepage = () => {
  return (
    <div className="font-mont">
      <Hero />
      <RentInfo />
      <ReviewSection />
    </div>
  );
};

export default Homepage;
