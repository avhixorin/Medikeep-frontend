import { RootState } from "@/redux/store/store";
import { Users } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import SearchDoctorsForAppointments from "./SearchDoctorsForAppointments/SearchDoctorsForAppointments";

const PatientAppointments: React.FC = () => {
  const [isSchedulingAppointment, setIsSchedulingAppointment] = useState(false);
  const appointments = useSelector(
    (state: RootState) => state.auth.user?.appointments
  );

  const handleCancelRequest = (appointmentId: string) => {
    console.log(`Requesting cancellation for appointment ${appointmentId}`);
    // Add cancellation logic here
  };

  const handleRescheduleRequest = (appointmentId: string) => {
    console.log(`Requesting reschedule for appointment ${appointmentId}`);
    // Add reschedule logic here
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#fffcf8] p-6 gap-4 dark:bg-[#121212]">
      {isSchedulingAppointment && (
        <SearchDoctorsForAppointments
          setIsSchedulingAppointment={setIsSchedulingAppointment}
        />
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-zinc-700 dark:text-gray-200">
            Appointments
          </h1>
          <Users size={24} className="stroke-[#3f3f46] dark:stroke-gray-200" />
        </div>
        <button
          className="bg-green-500 dark:bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 dark:hover:bg-green-800"
          onClick={() => setIsSchedulingAppointment(true)}
        >
          Schedule an Appointment
        </button>
      </div>

      <div className="mt-6 flex-grow bg-white dark:bg-[#0A0A0A] rounded-md p-6 overflow-y-auto shadow-xl scrollbar-webkit border border-gray-200 dark:border-gray-800">
        {appointments?.length ? (
          <div className="grid grid-cols-1 gap-4">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white dark:bg-[#0A0A0A] shadow-md rounded-md border border-gray-200 dark:border-gray-800"
              >
                <img
                  src={appointment.doctor.profilePicture}
                  alt={`${appointment.doctor.username}'s profile`}
                  className="h-16 w-16 rounded-full object-cover border border-gray-300 dark:border-gray-700"
                />
                <div className="flex-grow">
                  <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                    Doctor: {appointment.doctor.username}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Specialty: {appointment.doctor.specialization || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Date: {format(appointment.date, "dd MMM yyyy")}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Time: {appointment.time}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Reason: {appointment.reason || "N/A"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-sm text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-zinc-800 px-3 py-1 border rounded-md"
                    onClick={() => handleCancelRequest(appointment._id)}
                  >
                    Request Cancellation
                  </button>
                  <button
                    className="text-sm text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-zinc-800 px-3 py-1 border rounded-md"
                    onClick={() => handleRescheduleRequest(appointment._id)}
                  >
                    Request Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No appointments found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PatientAppointments;