import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const navigate = useNavigate();

  return (
    <nav
      className={`${
        scrolled ? "bg-white shadow-md backdrop:blur-sm" : "bg-transparent"
      } fixed w-full z-50 transition-all duration-300 p-4 flex justify-between items-center font-lato`}
      id="navbar"
    >
      <div className="text-2xl font-bold text-gray-800" onClick={() => scrollToSection("navbar")}>
        <img
          src="https://res.cloudinary.com/avhixorin/image/upload/f_auto/v1724770946/Logo_kletrg.png"
          alt="logo"
          className="h-5 md:h-10 m-1 hover:cursor-pointer"
          
        />
      </div>
      <div className="hidden md:block">
        <ul className="flex flex-row space-x-7 text-slate-500">
          <motion.li whileHover={{ scale: 1.05 }} className="relative group">
            <a
              onClick={() => scrollToSection("features")}
              href="#features"
              className="hover:text-blue-600 cursor-pointer transition-colors duration-300"
            >
              Features
            </a>
            <motion.div
              className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
            />
          </motion.li>

          <motion.li whileHover={{ scale: 1.05 }} className="relative group">
            <a
              onClick={() => scrollToSection("pricing")}
              href="#pricing"
              className="hover:text-blue-600 cursor-pointer transition-colors duration-300"
            >
              Pricing
            </a>
            <motion.div
              className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
            />
          </motion.li>

          <motion.li whileHover={{ scale: 1.05 }} className="relative group">
            <Link to="/about" className="hover:text-blue-600 transition-colors duration-300">
              About Us
            </Link>
            <motion.div
              className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
            />
          </motion.li>

          <motion.li whileHover={{ scale: 1.05 }} className="relative group">
            <a
              onClick={() => scrollToSection("contact")}
              href="#contact"
              className="hover:text-blue-600 cursor-pointer transition-colors duration-300"
            >
              Contact
            </a>
            <motion.div
              className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
            />
          </motion.li>
        </ul>
      </div>

      <div className="space-x-4">
        <button
          className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <Button
          className="bg-blue-600 text-white py-1 px-2 md:py-2 md:px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          onClick={() => navigate("/register")}
        >
          Try for free
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
