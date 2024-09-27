import React from 'react';
import AppointmentCard from './AppointmentCard';

// Sample names for patients and doctors
const patientNames = [
  "Rita", "John", "Alice", "Bob", "Eve", "Charlie", "Grace", "David", "Sophia", "James"
];

const doctorNames = [
  "Dr. James", "Dr. Smith", "Dr. Johnson", "Dr. Brown", "Dr. Taylor", "Dr. Lee", "Dr. Wilson", "Dr. Garcia", "Dr. Martinez", "Dr. Anderson"
];

const imgSrcs = [
  'https://randomuser.me/api/portraits/women/41.jpg',
  'https://randomuser.me/api/portraits/women/42.jpg',
  'https://randomuser.me/api/portraits/women/43.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/women/45.jpg',
  'https://randomuser.me/api/portraits/women/46.jpg',
  'https://randomuser.me/api/portraits/women/47.jpg',
  'https://randomuser.me/api/portraits/women/48.jpg'
];

// Function to get random elements from an array
const getRandomElement = (arr: string[]): string => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

const Appointments: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#fffcf8] p-10">
      <div className='h-[20%] w-full flex flex-col justify-start gap-6'>
        <h1 className='text-2xl font-semibold'>Appointments</h1>
        <p>September 27, 2024</p>
      </div>

      <div className='h-full w-full bg-white rounded-md flex flex-col justify-evenly p-6 gap-3 overflow-y-auto shadow-xl'>
        {Array.from({ length: 8 }).map((_, index) => (
          <AppointmentCard 
            key={index} 
            Name={getRandomElement(patientNames)} 
            doctor={getRandomElement(doctorNames)} 
            imgSrc={getRandomElement(imgSrcs)} 
          />
        ))}
      </div>
    </div>
  );
}

export default Appointments;
