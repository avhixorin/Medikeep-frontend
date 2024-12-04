import React, { useEffect } from 'react';
import NavBar from './Navbar/Navbar';
import Hero from './Hero-section/Hero';
import Features from './Features/Features';
import Benefits from './Benefits/Benefits';
import Pricing from './Pricing/Pricing';
import ContactUs from './ContactUs/ContactUs';
import Footer from './Footer/Footer';
import { useDispatch } from 'react-redux';
import { resetAllUsers } from '@/redux/features/allUsersSlice';
import { clearAuthUser } from '@/redux/features/authSlice';

const LandingPage: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetAllUsers());
    dispatch(clearAuthUser());
  });
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
