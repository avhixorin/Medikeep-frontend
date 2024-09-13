import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const navigate = useNavigate();
  return (
    <nav
      className={`${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      } fixed w-full z-50 transition-all duration-300 p-4 flex justify-between items-center font-lato`}
    id="#"
    >
      <div className="text-2xl font-bold text-gray-800">
        <img src="https://res.cloudinary.com/avhixorin/image/upload/v1724770946/Logo_kletrg.png" alt="logo" className=" h-5 md:h-10 m-1 hover:cursor-pointer" 
        onClick={handleLogoClick}
        />
      </div>
      <div className="hidden md:block">
        <ul className="flex flex-row space-x-6 text-gray-600">
        <li>
          <a href="#features" className="hover:text-blue-600">
            Features
          </a>
        </li>
        <li>
          <a href="#pricing" className="hover:text-blue-600">
            Pricing
          </a>
        </li>
        <li>
          <Link to={'/about'} className="hover:text-blue-600">
            About Us
          </Link>
        </li>
        {/* <li>
          <a href="#blog" className="hover:text-blue-600">
            Blog
          </a>
        </li> */}
        <li>
          <a href="#contact" className="hover:text-blue-600">
            Contact
          </a>
        </li>
        </ul>
      </div>
      
      <div className="space-x-4">
        <button className="text-gray-800 hover:text-blue-600"
        onClick={() => navigate('/sign-in')} 
        >Login</button>
        <button className="bg-blue-600 text-white py-1 px-2 md:py-2 md:px-4 rounded hover:bg-blue-700"
        onClick={() => navigate('/sign-up')}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
