import React, { useState } from "react";
import AppointmentCard from "./AppointmentCard";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

// Sample names for patients and doctors
const patientNames = [
  "Rita",
  "John",
  "Alice",
  "Bob",
  "Eve",
  "Charlie",
  "Grace",
  "David",
  "Sophia",
  "James",
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
  "1:50 PM - 2:10 PM",
];

const imgSrcs = [
  "https://randomuser.me/api/portraits/women/41.jpg",
  "https://randomuser.me/api/portraits/women/42.jpg",
  "https://randomuser.me/api/portraits/women/43.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/women/45.jpg",
  "https://randomuser.me/api/portraits/women/46.jpg",
  "https://randomuser.me/api/portraits/women/47.jpg",
  "https://randomuser.me/api/portraits/women/48.jpg",
];

// Function to get random elements from an array
const getRandomElement = (arr: string[]): string => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

const Appointments: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState("September 27, 2024");

  const dates = [
    "September 25, 2024",
    "September 26, 2024",
    "September 27, 2024",
    "September 28, 2024",
    "September 29, 2024",
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#fffcf8] p-10">
      <div className="h-[25%] w-full flex flex-col justify-start gap-6">
        <h1 className="text-2xl font-semibold text-zinc-700">Appointments</h1>

        {/* Dropdown for date selection */}
        <div className="relative w-[18%] bg-blue-300 flex flex-col items-center rounded-lg">
          <button
            className="w-full bg-blue-500 py-2 px-4 text-white rounded-lg border-4 border-transparent active:border-white duration-300 active:text-white-100 flex justify-between items-center"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {selectedDate}
            {isOpen ? (
              <AiOutlineCaretUp size={14} />
            ) : (
              <AiOutlineCaretDown size={14} />
            )}
          </button>
          {isOpen && (
            <div className="absolute left-0 top-14 w-full rounded-lg flex flex-col justify-center items-center bg-blue-500">
              {dates.map((date, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedDate(date);
                    setIsOpen(false);
                  }}
                  className="w-full text-slate-300 py-2 px-4 hover:bg-blue-600 rounded-r-lg hover:border-l-4 hover:border-white hover:text-white"
                >
                  {date}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-full w-full bg-white rounded-md flex flex-col justify-evenly p-6 gap-3 overflow-y-auto shadow-xl scrollbar-webkit">
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
};

export default Appointments;
