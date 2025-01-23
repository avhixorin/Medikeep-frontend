"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Sun,
  Moon,
  Heart,
  Shield,
  Zap,
  Users,
  Facebook,
  Twitter,
  LinkedinIcon as LinkedIn,
  Instagram,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AboutUs() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDarkMode)
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())
    document.documentElement.classList.toggle("dark", newDarkMode)
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-b from-gray-50 via-blue-50 to-teal-50 dark:from-gray-900 dark:via-blue-900 dark:to-teal-900 min-h-screen text-gray-800 dark:text-gray-100 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-16">
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About MediKeep
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Revolutionizing healthcare management for a connected future
            </motion.p>
          </header>

          <main>
            <section className="mb-12">
              <motion.p
                className="text-lg mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                MediKeep is at the forefront of healthcare innovation, leveraging cutting-edge technology to streamline
                patient care and empower healthcare professionals.
              </motion.p>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900 dark:to-blue-900 shadow-lg rounded-lg border border-teal-100 dark:border-teal-800">
                    <h2 className="text-2xl font-semibold mb-4 text-teal-700 dark:text-teal-300">For Patients</h2>
                    <ul className="space-y-3">
                      {[
                        "Easy appointment scheduling",
                        "Secure access to medical records",
                        "Telemedicine consultations",
                        "Medication reminders and tracking",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900 dark:to-teal-900 shadow-lg rounded-lg border border-blue-100 dark:border-blue-800">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-300">For Doctors</h2>
                    <ul className="space-y-3">
                      {[
                        "Efficient patient management system",
                        "AI-assisted diagnosis tools",
                        "Seamless collaboration with specialists",
                        "Advanced analytics for patient care",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              </div>
            </section>

            <section className="mb-12 text-center">
              <motion.h2
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Our Vision
              </motion.h2>
              <motion.p
                className="text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                To create a seamlessly connected healthcare ecosystem that enhances patient outcomes and simplifies the
                work of healthcare professionals.
              </motion.p>
            </section>

            <section className="mb-12">
              <motion.h2
                className="text-3xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Core Values
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Heart, title: "Compassion", description: "Putting patient care first in everything we do" },
                  {
                    icon: Shield,
                    title: "Security",
                    description: "Ensuring the highest level of data protection and privacy",
                  },
                  {
                    icon: Zap,
                    title: "Innovation",
                    description: "Continuously pushing the boundaries of healthcare technology",
                  },
                  {
                    icon: Users,
                    title: "Collaboration",
                    description: "Fostering partnerships across the healthcare community",
                  },
                ].map((value, index) => (
                  <motion.div
                    key={value.title}
                    className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                  >
                    <value.icon className="w-12 h-12 mb-4 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="text-center">
              <motion.h2
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Get in Touch
              </motion.h2>
              <motion.p
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                We'd love to hear from you! Reach out to learn more about how MediKeep can transform your healthcare
                experience.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button className="mb-6">Contact Us</Button>
                <div className="flex justify-center space-x-4">
                  {[
                    { icon: Facebook, href: "#" },
                    { icon: Twitter, href: "#" },
                    { icon: LinkedIn, href: "#" },
                    { icon: Instagram, href: "#" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-300"
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </section>
          </main>

          <footer className="mt-12 text-center">
            <Button variant="outline" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </footer>
        </div>
      </div>
    </div>
  )
}

