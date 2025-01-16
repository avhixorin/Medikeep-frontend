import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbar/Navbar';
import Hero from './Hero-section/Hero';
import Features from './Features/Features';
import Benefits from './Benefits/Benefits';
import Pricing from './Pricing/Pricing';
import ContactUs from './ContactUs/ContactUs';
import Footer from './Footer/Footer';
import useSession from '@/hooks/useSession';

const LandingPage: React.FC = () => {
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const { validateSession } = useSession();

  useEffect(() => {
    const checkSession = async () => {
      const valid = await validateSession();
      setIsValid(valid);
      if (isValid) {
        navigate('/dashboard');
      }
    };

    checkSession();
  }, [navigate, isValid, validateSession]);

  return (
    <div className='bg-white'>
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
