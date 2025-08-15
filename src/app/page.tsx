import React from "react";
import Navbar from "./HomePage/Navbar";
import HeroSection from "./HomePage/HeroSection";
import Features from "./HomePage/Features";
import HowItWorks from "./HomePage/HowItWorks";
import Testimonials from "./HomePage/Testimonials";

const page = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Features />
      <HowItWorks />
      <Testimonials />
      {/* Add other sections like Testimonials, Pricing, etc. here */}
    </>
  );
};

export default page;
