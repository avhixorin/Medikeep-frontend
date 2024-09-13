import React from 'react';
import NavBar from './Navbar/Navbar';
import Hero from './Hero-section/Hero';
import Features from './Features/Features';
import Benefits from './Benefits/Benefits';
import Pricing from './Pricing/Pricing';
import ContactUs from './ContactUs/ContactUs';
import Footer from './Footer/Footer';


const LandingPage: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <Features />
      <Benefits />
      <Pricing />
      <ContactUs />
      <Footer />    
      
    </div>
  );
};

export default LandingPage;
