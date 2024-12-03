import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface Props {
  Name: string;
  timeSlots: string;
  imgSrc: string;
  selectedDate: Date | undefined;
}

const AppointmentCard: React.FC<Props> = ({
  Name,
  timeSlots,
  imgSrc,
  selectedDate,
}) => {
  return (
    <div className="w-full rounded-lg text-black dark:text-gray-200 bg-white dark:bg-gray-800 py-3 px-6 flex flex-wrap md:flex-nowrap justify-between items-center font-poppins border border-gray-300 dark:border-gray-700 space-y-4 md:space-y-0">
      {/* Profile Image */}
      <div className="flex-shrink-0">
        <img
          src={imgSrc}
          alt={`${Name}'s Profile Picture`}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
        />
      </div>

      {/* Name */}
      <p className="font-medium text-lg text-center md:text-left flex-1 max-w-[8rem] truncate">
        {Name}
      </p>

      {/* Selected Date */}
      <p className="bg-indigo-500 dark:bg-indigo-700 rounded-md py-1 px-3 text-sm text-white flex-shrink-0">
        {selectedDate?.toDateString() || "No Date Selected"}
      </p>

      {/* Time Slots */}
      <p className="text-md text-center flex-1 max-w-[12rem] truncate">
        {timeSlots}
      </p>

      {/* Action Buttons */}
      <div className="hidden md:flex space-x-4">
        <button
          className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 rounded-md py-2 px-4 text-sm text-white transition-colors"
          aria-label="Reschedule Appointment"
        >
          Reschedule
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 rounded-md py-2 px-4 text-sm text-white transition-colors"
          aria-label="Cancel Appointment"
        >
          Cancel
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div className="w-full md:hidden">
        <Select>
          <SelectTrigger className="w-full text-sm">
            <SelectValue placeholder="Actions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Reschedule">Reschedule</SelectItem>
            <SelectItem value="Cancel">Cancel</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AppointmentCard;
