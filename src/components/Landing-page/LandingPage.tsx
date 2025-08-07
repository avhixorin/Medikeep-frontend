import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbar/Navbar';
import Hero from './Hero-section/Hero';
import Features from './Features/Features';
import Benefits from './Benefits/Benefits';
import Pricing from './Pricing/Pricing';
import ContactUs from './ContactUs/ContactUs';
import Footer from './Footer/Footer';
import About from './About/About';
import useAuth from '@/hooks/useAuth';

const LandingPage: React.FC = () => {
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const { validateSession } = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      const valid = await validateSession();
      setIsValid(valid);
    };

    checkSession();
  }, [navigate, isValid, validateSession]);

  return (
    <div className='bg-foreground'>
      <NavBar isLoggedIn={isValid} />
      <Hero />
      <About />
      <Features />
      <Benefits />
      <Pricing />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default LandingPage;
