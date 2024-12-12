import { RootState } from "@/redux/store/store";
import { Users } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import SearchDoctorsForAppointments from "./SearchDoctorsForAppointments/SearchDoctorsForAppointments";
import { Appointment } from "@/types/types";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useSockets from "@/hooks/useSockets";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { removeAppointment } from "@/redux/features/authSlice";
import { RescheduleForm } from "../RescheduleForm/RescheduleForm";

const PatientAppointments: React.FC = () => {
  const [isSchedulingAppointment, setIsSchedulingAppointment] = useState(false);
  const [reScheduleAppointment, setReScheduleAppointment] =
    useState<Appointment>();
  const [isRescheduling, setIsRescheduling] = React.useState(false);
  const appointments = useSelector(
    (state: RootState) => state.auth.user?.appointments
  );
  const { socket } = useSockets();
  const dispatch = useDispatch();
  const handleCancelRequest = async (appointmentId: string) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        socket?.emit(SOCKET_EVENTS.CANCELLED_APPOINTMENT, {
          appointmentId,
        });
        toast.success("Appointment cancellation requested successfully");
        dispatch(removeAppointment(appointmentId));
      }
    });
  };
  const [date, setDate] = useState<string | undefined>(undefined);
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  return (
    <div className="w-full h-full flex flex-col bg-[#fffcf8] p-6 gap-4 dark:bg-[#121212]">
      {isSchedulingAppointment && (
        <SearchDoctorsForAppointments
          setIsSchedulingAppointment={setIsSchedulingAppointment}
        />
      )}
      {isRescheduling && reScheduleAppointment ? (
        <RescheduleForm
          date={date}
          time={time}
          reason={reason}
          setDate={setDate}
          setTime={setTime}
          setReason={setReason}
          appointment={reScheduleAppointment}
          setIsRescheduling={setIsRescheduling}
        />
      ) : null}

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
                    onClick={() => {
                      setReScheduleAppointment(appointment);
                      setIsRescheduling(true);
                    }}
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
