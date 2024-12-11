import React from "react";

interface Props {
  fullName: string;
  appointmentTime: string;
  profilePicture: string;
  appointmentDate: string;
  age: number;
  onStartSession: () => void;
  onReschedule: () => void;
  onCancel: () => void;
}

const AppointmentCard: React.FC<Props> = ({
  fullName,
  appointmentTime,
  profilePicture,
  appointmentDate,
  age,
  onReschedule,
  onCancel,
  onStartSession,
}) => {
  return (
    <div className="w-full rounded-lg text-black dark:text-gray-200 bg-white dark:bg-gray-800 py-3 px-6 flex flex-wrap md:flex-nowrap justify-between items-center font-poppins border border-gray-300 dark:border-gray-700 space-y-4 md:space-y-0">
      {/* Profile Image */}
      <div className="flex-shrink-0">
        <img
          src={profilePicture}
          alt={`${fullName}'s Profile Picture`}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
        />
      </div>

      {/* Name */}
      <p className="font-normal lg:font-medium text-base lg:text-lg text-center md:text-left flex-1 max-w-[8rem] truncate">
        {fullName}
      </p>

      {/* Age */}
      <p className="text-md text-center flex-1 max-w-[4rem] truncate">
        {age} years
      </p>

      {/* Selected Date */}
      <p className="bg-indigo-500 dark:bg-indigo-700 rounded-md py-1 px-3 text-sm text-white flex-shrink-0">
        {appointmentDate}
      </p>

      {/* Time Slots */}
      <p className="text-md text-center flex-1 max-w-[12rem] truncate">
        {appointmentTime}
      </p>

      {/* Action Buttons */}
      <div className="flex space-x-4">
      <button
          className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 rounded-md py-2 px-4 text-sm text-white transition-colors"
          aria-label="Start Online Session"
          onClick={onStartSession}
        >
          Start Online Session
        </button>
        <button
          className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 rounded-md py-2 px-4 text-sm text-white transition-colors"
          aria-label="Reschedule Appointment"
          onClick={onReschedule}
        >
          Reschedule
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 rounded-md py-2 px-4 text-sm text-white transition-colors"
          aria-label="Cancel Appointment"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;