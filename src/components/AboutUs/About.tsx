import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  
  return (
    <section className="bg-gradient-to-r from-blue-200 via-blue-100 to-white dark:from-blue-900 dark:via-blue-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-700 dark:text-blue-400">About Us</h1>

        <div className="text-center mb-12">
          <p className="text-xl mb-6 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Welcome to MediKeep, where we revolutionize healthcare management through technology, connecting patients with healthcare professionals for better health outcomes.
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/sign-in">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400">
                Login
              </button>
            </Link>
            <Link to="/sign-up">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-400">
                Sign Up
              </button>
            </Link>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-2 mb-12">
          {/* For Patients */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-blue-700 dark:text-blue-400">For Patients</h3>
            <p className="text-lg mb-4">
              <strong>Empowering Your Health Journey</strong>
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Track Your Health: Monitor your medical appointments, prescription history, and health records all in one place.</li>
              <li>Connect with Top Doctors: Access a network of qualified healthcare professionals who can provide consultations and advice tailored to your needs.</li>
              <li>Personalized Care: Receive customized diet and wellness recommendations based on your health data and goals.</li>
              <li>Easy Appointments: Schedule and manage appointments with your doctors effortlessly through our intuitive interface.</li>
              <li>Secure Communication: Communicate securely with your healthcare providers, ensuring that your health information remains confidential and protected.</li>
            </ul>
            <p className="text-lg">
              Our goal is to make healthcare more accessible and personalized, helping you lead a healthier, more informed life.
            </p>
          </div>

          {/* For Doctors */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-blue-700 dark:text-blue-400">For Doctors</h3>
            <p className="text-lg mb-4">
              <strong>Enhancing Your Practice</strong>
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Patient Management: Keep track of your patients’ appointments, medical histories, and communication in one centralized system.</li>
              <li>Consultation Scheduling: Manage your consultation hours and availability with ease, allowing patients to book appointments at their convenience.</li>
              <li>Data-Driven Insights: Access comprehensive data on your patients' health trends and progress, helping you make informed decisions and provide personalized care.</li>
              <li>Secure Platform: Benefit from a secure, compliant platform that protects your patients' information and ensures privacy.</li>
              <li>Streamlined Communication: Use our integrated chat feature to communicate with your patients securely, addressing their queries and concerns efficiently.</li>
            </ul>
            <p className="text-lg">
              We are committed to supporting doctors with the tools they need to enhance their practice and deliver the best possible care to their patients.
            </p>
          </div>
        </div>

        {/* Vision and Values */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">Our Vision</h2>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            Our vision is to create a healthcare ecosystem where patients and doctors can interact seamlessly, leading to improved health outcomes and greater satisfaction for all involved. We strive to be at the forefront of digital health innovation, continuously evolving our platform to meet the changing needs of the healthcare landscape.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">Our Values</h2>
          <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 dark:text-gray-300">
            <li><strong>Patient-Centricity:</strong> We prioritize the needs and well-being of our patients, ensuring our solutions enhance their healthcare experience.</li>
            <li><strong>Innovation:</strong> We embrace new technologies and approaches to advance the field of digital health.</li>
            <li><strong>Integrity:</strong> We maintain the highest standards of privacy and security, ensuring trust and transparency in all our interactions.</li>
            <li><strong>Collaboration:</strong> We foster collaboration between patients and healthcare professionals to achieve the best outcomes.</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">Get in Touch</h2>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            We welcome your feedback and are here to assist you with any questions or concerns. Feel free to reach out to us through our&nbsp;  
            <Link to={"/"} className="text-blue-600 hover:underline"
            >contact page</Link>, or connect with us on our social media channels.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Thank you for choosing MediKeep. Together, we are shaping the future of healthcare.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
