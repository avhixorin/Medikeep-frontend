import React, { useState } from 'react';
import AppointmentCard from './AppointmentCard';

// Sample names for patients and doctors
const patientNames = [
  "Rita", "John", "Alice", "Bob", "Eve", "Charlie", "Grace", "David", "Sophia", "James"
];

const timeSlots = [
  "12:30 PM - 12:45 PM",
  "12:45 PM - 1:00 PM",
  "1:00 PM - 1:15 PM",
  "12:30 PM - 1:00 PM",
  "1:00 PM - 1:30 PM",
  "1:30 PM - 2:00 PM",
  "1:15 PM - 1:30 PM",
  "1:10 PM - 1:30 PM",
  "1:30 PM - 1:50 PM",
  "1:50 PM - 2:10 PM"
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
  const [selectedDate, setSelectedDate] = useState('September 27, 2024');

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value);
  };

  const dates = [
    'September 25, 2024',
    'September 26, 2024',
    'September 27, 2024',
    'September 28, 2024',
    'September 29, 2024',
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#fffcf8] p-10">
      <div className='h-[20%] w-full flex flex-col justify-start gap-6'>
        <h1 className='text-2xl font-semibold'>Appointments</h1>
        
        {/* Dropdown for date selection */}
        <select
          value={selectedDate}
          onChange={handleDateChange}
          className="p-2 w-[20%] bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out cursor-pointer focus:ring-0"
        >
          {dates.map((date) => (
            <option key={date} value={date} className='py-2 cursor-pointer'>
              {date}
            </option>
          ))}
        </select>
      </div>

      <div className='h-full w-full bg-white rounded-md flex flex-col justify-evenly p-6 gap-3 overflow-y-auto shadow-xl'>
        {Array.from({ length: 8 }).map((_, index) => (
          <AppointmentCard 
            key={index} 
            Name={getRandomElement(patientNames)} 
            timeSlots={getRandomElement(timeSlots)} 
            imgSrc={getRandomElement(imgSrcs)} 
            selectedDate={selectedDate}
          />
        ))}
      </div>
    </div>
  );
}

export default Appointments;
