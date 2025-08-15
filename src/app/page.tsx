import React from "react";
import Navbar from "./HomePage/Navbar";
import HeroSection from "./HomePage/HeroSection";
import Features from "./HomePage/Features";
import HowItWorks from "./HomePage/HowItWorks";
import Testimonials from "./HomePage/Testimonials";
import Pricing from "./HomePage/Pricing";
import FAQ from "./HomePage/FAQ";
import CTA from "./HomePage/CTA";
import Footer from "./HomePage/Footer";

const page = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
};

export default page;
