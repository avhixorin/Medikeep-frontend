import React from 'react';

import BackButton from '../Back-Button/BackButton';
const TermsAndConditions: React.FC = () => {
  
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-6 flex justify-center">Terms and Conditions</h1>

      <p className="mb-4">
        Welcome to MediKeep. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before using the service.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By registering for an account or using MediKeep, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions, as well as our Privacy Policy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">2. User Accounts</h2>
      <p className="mb-4">
        You must provide accurate and complete information during the registration process and keep your account information up-to-date. You are responsible for maintaining the confidentiality of your login credentials and are liable for all activities conducted under your account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">3. Medical Information</h2>
      <p className="mb-4">
        MediKeep allows you to store, manage, and share your medical history and records. It is your responsibility to ensure that all information provided is accurate and up-to-date. MediKeep does not provide medical advice or diagnosis. The information on this platform should not replace professional medical consultation, diagnosis, or treatment.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">4. User Responsibilities</h2>
      <p className="mb-4">
        You agree to use MediKeep solely for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the platform. You are prohibited from transmitting any unlawful, threatening, defamatory, obscene, or otherwise offensive content.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">5. Privacy and Data Security</h2>
      <p className="mb-4">
        We are committed to protecting your privacy and personal data. Please review our Privacy Policy to understand how we collect, use, and safeguard the information you provide. By using MediKeep, you consent to the collection and use of your information as described in our Privacy Policy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">6. Limitation of Liability</h2>
      <p className="mb-4">
        MediKeep is provided on an "as is" and "as available" basis. We do not warrant that the service will be uninterrupted, secure, or error-free. We are not liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use the platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">7. Termination</h2>
      <p className="mb-4">
        We reserve the right to suspend or terminate your account and access to MediKeep at our discretion, without notice, if we believe you have violated these terms or engaged in any unlawful behavior.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">8. Changes to Terms</h2>
      <p className="mb-4">
        We may update these terms and conditions from time to time. Any changes will be posted on this page, and your continued use of the platform after such changes constitutes your acceptance of the new terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">9. Contact Information</h2>
      <p className="mb-4">
        If you have any questions or concerns regarding these terms and conditions, please contact us at [your email or contact information].
      </p>

      <p className="mt-6">
        By using MediKeep, you agree to these terms and conditions. If you do not agree, please do not use the platform.
      </p>
      <div className='w-full flex justify-center mt-4'>
        <BackButton text={"Back"} thickness={16} />
      </div>
      
    </div>
  );
};

export default TermsAndConditions;
