import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useSockets from "@/hooks/useSockets";
import { RootState } from "@/redux/store/store";
import { Appointment } from "@/types/types";
import React from "react";
import { useSelector } from "react-redux";

type ManageAppointmentRequestsProps = {
  setIsManagingAppointmentRequests: (value: boolean) => void;
};

const ManageAppointmentRequests: React.FC<ManageAppointmentRequestsProps> = ({
  setIsManagingAppointmentRequests,
}) => {
  const { socket } = useSockets();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleAcceptAppointment = (appointment: Appointment) => {
    socket?.emit(SOCKET_EVENTS.ACCEPT_APPOINTMENT, {
      appointmentId: appointment._id,
    });
  };

  const handleDeclineAppointment = (appointmentId: string) => {
    socket?.emit(SOCKET_EVENTS.DECLINE_APPOINTMENT_REQUEST, {
      appointmentId,
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="relative rounded-lg bg-white dark:bg-[#1e293b] shadow-md p-6 max-w-lg w-[90%]">
        <button
          onClick={() => setIsManagingAppointmentRequests(false)}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Manage Appointment Requests
        </h2>

        {user?.appointmentRequests && user?.appointmentRequests.length > 0 ? (
          <ul className="space-y-4 max-h-[400px] overflow-y-auto">
            {user?.appointmentRequests.map((request) => (
              <li
                key={request._id}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm flex flex-col space-y-2"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {user?.role === "doctor" ? "Patient: " : "Doctor: "}
                      {user?.role === "doctor"
                        ? `${request.patient.firstName} ${request.patient.lastName}`
                        : `${request.doctor.firstName} ${request.doctor.lastName}`}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Reason: {request.reason}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <p>Date: {new Date(request.date).toLocaleDateString()}</p>
                    <p>Time: {new Date(request.date).toLocaleTimeString()}</p>
                  </div>
                </div>

                <div className="flex space-x-3 justify-end">
                  {user.role === "doctor" && (
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                      onClick={() => handleAcceptAppointment(request)}
                    >
                      Accept
                    </button>
                  )}
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors
                    cursor-pointer"
                    onClick={() => handleDeclineAppointment(request._id!)}
                    disabled={user.role === "patient"}
                  >
                    {user.role === "doctor" ? "Decline Request" : "Requested"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No appointment requests at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageAppointmentRequests;
