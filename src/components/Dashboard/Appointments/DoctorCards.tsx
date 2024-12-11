import { Button } from "@/components/ui/button";

export const DoctorCard = ({ profilePicture, name, specialization, onRequestAppointment }:{
    profilePicture: string;
    name: string;
    specialization: string;
    onRequestAppointment: () => void;
}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-[#0A0A0A] shadow-md rounded-md border border-gray-200 dark:border-gray-800">
      <img
        src={profilePicture}
        alt={`${name}'s profile`}
        className="h-16 w-16 rounded-full object-cover border border-gray-300 dark:border-gray-700"
      />
      <div className="flex-grow">
        <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">{name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{specialization}</p>
      </div>
      <Button
        variant="outline"
        onClick={onRequestAppointment}
        className="text-sm text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-zinc-800"
      >
        Book Appointment
      </Button>
    </div>
  );
};

export const DoctorCardMobile = ({ profilePicture, name, specialization, onRequestAppointment } : {
    profilePicture: string;
    name: string;
    specialization: string;
    onRequestAppointment: () => void;
}) => {
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-[#0A0A0A] shadow-md rounded-md border border-gray-200 dark:border-gray-800">
      <img
        src={profilePicture}
        alt={`${name}'s profile`}
        className="h-20 w-20 rounded-full object-cover border border-gray-300 dark:border-gray-700"
      />
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">{name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{specialization}</p>
      </div>
      <Button
        variant="outline"
        onClick={onRequestAppointment}
        className="text-sm text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-zinc-800"
      >
        Book Appointment
      </Button>
    </div>
  );
};
