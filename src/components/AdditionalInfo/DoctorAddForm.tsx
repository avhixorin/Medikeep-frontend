import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-international-phone/style.css'; 
import './DoctorAddForm.css';
import Swal from 'sweetalert2';
import { User } from '@/types/types';
import submitForm from '@/utils/submitForm';

const DoctorAddForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // const [consultationTimes, setConsultationTimes] = useState<{ start: Date | null, end: Date | null }[]>([
  //   { start: null, end: null },
  // ]);

  const [formData, setFormData] = useState<User>({
    ...location.state, 
    medicalLicenseNumber: '',
    specialization: '',
    yearsOfExperience: '',
    clinicAffiliation: [],
    consultationHours: '',
  });

  // const handleConsultationTimeChange = (index: number, type: 'start' | 'end', date: Date | null) => {
  //   const updatedTimes = consultationTimes.map((time, i) =>
  //     i === index ? { ...time, [type]: date } : time
  //   );
  //   setConsultationTimes(updatedTimes);
  // };

  // const addConsultationInterval = async() => {
  //   if (consultationTimes.length < 3) {
  //     setConsultationTimes([...consultationTimes, { start: null, end: null }]);
  //   } else {
  //     await Swal.fire({
  //       text: 'You can only add up to 3 consultation intervals',
  //       icon: "error"
  //     });
  //   }
  // };

  // const removeLastConsultationInterval = () => {
  //   if (consultationTimes.length > 1) {
  //     const updatedTimes = consultationTimes.slice(0, -1);
  //     setConsultationTimes(updatedTimes);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const completeFormData: User = {
      ...formData,
      // consultations: consultationTimes, 
    };

    try {
      const data = await submitForm(completeFormData);
      console.log("Data", data);
      if (data?.statusCode === 201) { 
        await Swal.fire({
          text: data.message,
          icon: "success"
        });
        navigate('/sign-in');
      }
    } catch (error) {
      await Swal.fire({
        title: 'Form Submission Failed',
        text: (error as Error).message || "An unknown error occurred.",
        icon: "error"
      });
      console.error("Form submission failed:", error);
    }
  };

  return (
    <div className='w-full min-h-screen bg-tertiary flex justify-center items-center p-4'>
      <div className='w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold text-gray-900 mb-6'>Doctor Information</h2>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
            <div className='mb-4'>
              <label htmlFor="medicalLicenseNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Medical License Number
              </label>
              <input
                type="text"
                id="medicalLicenseNumber"
                className="w-[95%] border border-gray-300 rounded-lg py-2 px-3 text-gray-900"
                placeholder="Enter medical license number"
                value={formData.medicalLicenseNumber}
                onChange={(e) => setFormData({ ...formData, medicalLicenseNumber: e.target.value })}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
                Specialization
              </label>
              <input
                type="text"
                id="specialization"
                className="w-[95%] border border-gray-300 rounded-lg py-2 px-3 text-gray-900"
                placeholder="Enter specialization"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                id="yearsOfExperience"
                className="w-[95%] border border-gray-300 rounded-lg py-2 px-3 text-gray-900"
                placeholder="Enter years of experience"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value,10) })}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="clinicAffiliation" className="block text-sm font-medium text-gray-700 mb-2">
                Clinic/Hospital Affiliation
              </label>
              <input
                type="text"
                id="clinicAffiliation"
                className="w-[95%] border border-gray-300 rounded-lg py-2 px-3 text-gray-900"
                placeholder="Enter clinic/hospital affiliation"
                value={formData.clinicAffiliation}
                onChange={(e) => setFormData({ ...formData, clinicAffiliation: [e.target.value] })}
              />
            </div>
            {/* <div className='md:col-span-2 mb-4'>
              <label htmlFor="consultationHours" className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Hours
              </label>
              {consultationTimes.map((time, index) => (
                <div key={index} className="flex space-x-4 mb-2">
                  <DatePicker
                    format="hh:mm"
                    placeholder="Start Time"
                    placement='topEnd'
                    onChange={(date) => handleConsultationTimeChange(index, 'start', date)}
                    value={time.start}
                    className="w-1/2 rounded-lg py-2 px-3 text-gray-900"
                  />
                  <DatePicker
                    format="hh:mm"
                    placeholder="End Time"
                    placement='topEnd'
                    onChange={(date) => handleConsultationTimeChange(index, 'end', date)}
                    value={time.end}
                    className="w-1/2 rounded-lg py-2 px-3 text-gray-900"
                  />
                </div>
              ))}
              <div className='w-full flex justify-between space-x-4'>
                <button
                  type="button"
                  onClick={addConsultationInterval}
                  className='bg-blue-500 w-1/2 text-white py-2 px-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-sm'
                  // Uncomment the following line if you want to disable the button when the max number of intervals is reached
                  // disabled={consultationTimes.length >= 3}
                >
                  + Add Interval
                </button>
                {consultationTimes.length > 1 && (
                  <button
                    type="button"
                    onClick={removeLastConsultationInterval}
                    className='bg-red-500 w-1/2 text-white py-2 px-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs md:text-sm'
                  >
                    - Remove Interval
                  </button>
                )}
              </div>
            </div> */}
          </div>
          <button
            type="submit"
            className='w-full bg-blue-500 text-white space-x-4 py-2 px-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-sm'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorAddForm;
