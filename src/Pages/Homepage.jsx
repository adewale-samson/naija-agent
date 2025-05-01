import { motion } from "framer-motion";
import React from "react";
import Hero from "../Components/Hero";
import RentInfo from "../Components/RentInfo";
import ReviewSection from "../Components/ReviewSection";


const Homepage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="font-mont"
    >
      <Hero />
      <RentInfo />
      <ReviewSection />
    </motion.div>
  );
};

export default Homepage;
