import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import RentInfo from "../Components/RentInfo";
import ReviewSection from "../Components/ReviewSection";
import Footer from "../Components/Footer";


const Homepage = () => {
  return (
    <div className="font-mont">
      <Navbar />
      <Hero />
      <RentInfo />
      <ReviewSection />
      <Footer />
    </div>
  );
};

export default Homepage;
