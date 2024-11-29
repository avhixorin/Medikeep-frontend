import React from 'react';
import BackButton from '../Back-Button/BackButton';
import { Link } from 'react-router-dom';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 dark:from-green-800 dark:via-blue-800 dark:to-purple-800 text-gray-900 dark:text-gray-100 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 flex justify-center text-blue-700 dark:text-blue-400">Terms and Conditions 📜</h1>

      <p className="mb-4">
        Welcome to MediKeep. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before using the service.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-blue-600 dark:text-blue-300">1. Acceptance of Terms ✔️</h2>
      <p className="mb-4">
        By registering for an account or using MediKeep, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions, as well as our Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-green-600 dark:text-green-300">2. User Accounts 🔑</h2>
      <p className="mb-4">
        You must provide accurate and complete information during the registration process and keep your account information up-to-date. You are responsible for maintaining the confidentiality of your login credentials and are liable for all activities conducted under your account.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-yellow-600 dark:text-yellow-300">3. Medical Information 🏥</h2>
      <p className="mb-4">
        MediKeep allows you to store, manage, and share your medical history and records. It is your responsibility to ensure that all information provided is accurate and up-to-date. MediKeep does not provide medical advice or diagnosis. The information on this platform should not replace professional medical consultation, diagnosis, or treatment.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-red-600 dark:text-red-300">4. User Responsibilities 🤝</h2>
      <p className="mb-4">
        You agree to use MediKeep solely for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the platform. You are prohibited from transmitting any unlawful, threatening, defamatory, obscene, or otherwise offensive content.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-purple-600 dark:text-purple-300">5. Privacy and Data Security 🔒</h2>
      <p className="mb-4">
        We are committed to protecting your privacy and personal data. Please review our Privacy Policy to understand how we collect, use, and safeguard the information you provide. By using MediKeep, you consent to the collection and use of your information as described in our Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-teal-600 dark:text-teal-300">6. Limitation of Liability ⚠️</h2>
      <p className="mb-4">
        MediKeep is provided on an "as is" and "as available" basis. We do not warrant that the service will be uninterrupted, secure, or error-free. We are not liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use the platform.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-indigo-600 dark:text-indigo-300">7. Termination ⛔</h2>
      <p className="mb-4">
        We reserve the right to suspend or terminate your account and access to MediKeep at our discretion, without notice, if we believe you have violated these terms or engaged in any unlawful behavior.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-orange-600 dark:text-orange-300">8. Changes to Terms 🔄</h2>
      <p className="mb-4">
        We may update these terms and conditions from time to time. Any changes will be posted on this page, and your continued use of the platform after such changes constitutes your acceptance of the new terms.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-cyan-600 dark:text-cyan-300">9. Contact Information 📧</h2>
      <p className="mb-4">
        If you have any questions or concerns regarding these terms and conditions, please contact us at [your email or contact information].
      </p>

      <p className="mt-6 text-center font-semibold text-gray-800 dark:text-gray-300">
        By using MediKeep, you agree to these terms and conditions. If you do not agree, please do not use the platform.
      </p>
      
      <div className='w-full flex justify-center mt-4'>
        <BackButton text={"Back"} thickness={16} />
      </div>
    </div>
  );
};

export const TnC: React.FC = () => {
  return (
    <div className="tnc-container flex justify-start items-center">
      <p className="text-zinc-500 dark:text-zinc-400">
        By logging in, you accept our
        <Link className="text-blue-500 hover:text-blue-800 ml-2" to={"/tnc"}>
          terms and conditions
        </Link>
      </p>
    </div>
  );
};

export default TermsAndConditions;
