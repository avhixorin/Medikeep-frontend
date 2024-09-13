import React from 'react';
const features = [
  { icon: <img src="https://res.cloudinary.com/avhixorin/image/upload/v1724770946/Stethoscope_ipdsmu.png" alt="Stethoscope" className="h-[5.5rem] w-[5.5rem] mx-auto" />, title: 'Consult with Experts', description: 'Book appointments and chat with certified medical professionals.' },
  { icon: <img src="https://res.cloudinary.com/avhixorin/image/upload/v1724770946/MedicalFile_jv3hks.png" alt="Medical File" className="h-[5.5rem] w-[5.5rem] mx-auto" />, title: 'Manage Your Records', description: 'Keep track of your health records securely and easily.' },
  { icon: <img src="https://res.cloudinary.com/avhixorin/image/upload/v1724770945/Alarm_qvcr82.png" alt="Alarm" className="h-[5.5rem] w-[5.5rem] mx-auto" />, title: 'Track Appointments', description: 'Never miss an appointment with our easy-to-use scheduling system.' },
  { icon: <img src="https://res.cloudinary.com/avhixorin/image/upload/v1724770946/Lock_kbjno6.png" alt="Lock" className="h-[5.5rem] w-[5.5rem] mx-auto" />, title: 'Secure Data', description: 'Your data is encrypted and securely stored.' }
];

const Features: React.FC = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-l from-white to-slate-200 z-20" id="features">
      <div className="relative z-30 max-w-5xl mx-auto">
        <h2 className="text-5xl font-helmet font-bold text-center text-gray-800 mb-10">Features That Make a Difference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-8 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <div className="mb-4">
                <span className="text-4xl inline-block">{feature.icon}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
