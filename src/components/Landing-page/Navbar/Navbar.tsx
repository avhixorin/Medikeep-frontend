import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-switcher";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const NavBar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
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
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <nav
      className={`${
        scrolled ? "bg-white shadow-md backdrop:blur-sm" : "bg-transparent"
      } fixed w-full z-50 transition-all duration-300 p-4 flex justify-between items-center font-lato`}
      id="navbar"
    >
      <div
        className="text-2xl font-bold text-gray-800"
        onClick={() => scrollToSection("navbar")}
      >
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
            <motion.div className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </motion.li>

          <motion.li whileHover={{ scale: 1.05 }} className="relative group">
            <a
              onClick={() => scrollToSection("pricing")}
              href="#pricing"
              className="hover:text-blue-600 cursor-pointer transition-colors duration-300"
            >
              Pricing
            </a>
            <motion.div className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </motion.li>

          <motion.li whileHover={{ scale: 1.05 }} className="relative group">
            <Link
              to="/about"
              className="hover:text-blue-600 transition-colors duration-300"
            >
              About Us
            </Link>
            <motion.div className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </motion.li>

          <motion.li whileHover={{ scale: 1.05 }} className="relative group">
            <a
              onClick={() => scrollToSection("contact")}
              href="#contact"
              className="hover:text-blue-600 cursor-pointer transition-colors duration-300"
            >
              Contact
            </a>
            <motion.div className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </motion.li>
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <Button
            variant="ghost"
            className="dark:hover:bg-transparent"
            onClick={() => navigate("/dashboard")}
          >
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src={user?.profilePicture} alt={user?.username} />
              <AvatarFallback className="text-foreground rounded-full">
                {user?.firstName?.[0]?.toUpperCase()}
                {user?.lastName?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        ) : (
          <div className="space-x-4">
            <button
              className="text-background hover:text-primary transition-colors duration-300"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <Button
              className="bg-primary text-primary-foreground py-1 px-2 md:py-2 md:px-4 rounded hover:bg-primary/90 transition-colors duration-300"
              onClick={() => navigate("/register")}
            >
              Try for free
            </Button>
          </div>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
