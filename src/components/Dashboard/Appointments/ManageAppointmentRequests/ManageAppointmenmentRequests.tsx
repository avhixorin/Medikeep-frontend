import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useSockets from "@/hooks/useSockets";
import { RootState } from "@/redux/store/store";
import { Appointment } from "@/types/types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

type ManageAppointmentRequestsProps = {
  setIsManagingAppointmentRequests: (value: boolean) => void;
};

const ManageAppointmentRequests: React.FC<ManageAppointmentRequestsProps> = ({
  setIsManagingAppointmentRequests,
}) => {
  const [isAccepting, setIsAccepting] = useState<boolean>(false);
  const [isDeclining, setIsDeclining] = useState<boolean>(false);
  const { socket } = useSockets();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleAcceptAppointment = async (appointment: Appointment) => {
  
    await new Promise<void>((resolve, reject) => {
      socket?.emit(
        SOCKET_EVENTS.ACCEPT_APPOINTMENT,
        { appointmentId: appointment._id },
        (response: { success: boolean; error?: string }) => {
          if (response.success) {
            resolve();
          } else {
            reject(new Error(response.error || "Failed to accept appointment"));
          }
        }
      );
    });
    setIsAccepting(false);
  };
  

  const handleDeclineAppointment = async (appointmentId: string) => {
    setIsDeclining(true);
  
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, decline it!",
    });
  
    if (!result.isConfirmed) {
      setIsDeclining(false);
      return;
    }
  
    try {
      await new Promise<void>((resolve, reject) => {
        socket?.emit(
          SOCKET_EVENTS.DECLINE_APPOINTMENT_REQUEST,
          { appointmentId },
          (response: { success: boolean; error?: string }) => {
            if (response.success) {
              resolve();
            } else {
              reject(new Error(response.error || "Failed to decline appointment"));
            }
          }
        );
      });
    } catch (error) {
      console.error(error);
      await Swal.fire("Error", (error as Error).message, "error");
    } finally {
      setIsDeclining(false);
    }
  };  

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="relative rounded-lg bg-white dark:bg-[#0d121a] shadow-md p-6 max-w-lg w-[90%]">
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
                        ? `${request?.patient?.firstName} ${request?.patient?.lastName}`
                        : `${request?.doctor?.firstName} ${request?.doctor?.lastName}`}
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
                      disabled={isAccepting || isDeclining}
                      className="px-4 py-2 disabled:opacity-50 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                      onClick={() => {
                        setIsAccepting(true);
                        handleAcceptAppointment(request)
                      }}
                    >
                      {isAccepting ? "Accepting..." : "Accept"}
                    </button>
                  )}
                  <button
                    className="px-4 py-2 disabled:opacity-50 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors
                    cursor-pointer"
                    onClick={() => handleDeclineAppointment(request._id!)}
                    disabled={user.role === "patient" || isDeclining || isAccepting}
                  >
                    {user.role === "doctor" ? (isDeclining ? "Declining..." : "Decline Request") : "Requested"}
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
