import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import { useEffect } from "react";
import "./Hero.css";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Splitting();
  }, []);

  return (
    <section className="pt-20 pb-8 md:pb-0 text-center md:flex bg-blue-50 min-h-screen">
      <div className="flex flex-col justify-center w-full px-4 md:w-1/2">
        <h1 className="flex flex-col gap-4">
          <span className="font-bold">
          Your Health,
          </span>
          
          <span className="splitting" data-splitting="chars">
            Simplified
          </span>
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          "Access and manage your health data anytime, anywhere with MediKeep."
        </p>
        <div className="mt-8 space-x-4">
          <button
            className="px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
          <button
            className="px-6 py-3 text-blue-600 border border-blue-600 rounded hover:bg-blue-100"
            onClick={() => navigate("/about")}
          >
            Learn More
          </button>
        </div>
      </div>
      <div className="relative hidden w-1/2 px-4 md:block">
        <div className="relative w-full h-full overflow-hidden flex items-end">
          <motion.img
            src="https://res.cloudinary.com/avhixorin/image/upload/f_auto/v1724770945/doctor_hy22hh.png"
            alt="doctor"
            className="h-[36rem] relative z-10 mx-auto"
            animate={{ scale: 1, opacity: 1 }}
            initial={{  opacity: 0}}  
            transition={{ delay: 0, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
          </motion.img>
          <div className="absolute inset-y-0 left-0 z-0 w-1/2 bg-gradient-to-r from-blue-50 to-blue-200"></div>

          <div className="absolute inset-y-0 right-0 z-0 w-1/2 bg-gradient-to-l from-blue-50 to-blue-200"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
