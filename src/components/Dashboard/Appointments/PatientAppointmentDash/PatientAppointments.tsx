import { RootState } from "@/redux/store/store";
import { Bell, BellDotIcon, Users } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import SearchDoctorsForAppointments from "./SearchDoctorsForAppointments/SearchDoctorsForAppointments";
import { Appointment } from "@/types/types";
import { RescheduleForm } from "../RescheduleForm/RescheduleForm";
import { Button } from "@/components/ui/button";
import NotificationDrawer from "../../Notifications/NotificationDrawer";
import useSockets from "@/hooks/useSockets";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useRTC from "@/hooks/useRTC";
import ManageAppointmentRequests from "../ManageAppointmentRequests/ManageAppointmenmentRequests";
import HandleCallScreen from "../HandleCallScreen/HandleCallScreen";

const PatientAppointments: React.FC = () => {
  const [isSchedulingAppointment, setIsSchedulingAppointment] = useState(false);
  const [appointInQuestion, setAppointInQuestion] = useState<Appointment>();
  const [isSomeOneCalling, setIsSomeOneCalling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isManagingAppointmentRequests, setIsManagingAppointmentRequests] =
    useState(false);
  const [reScheduleAppointment, setReScheduleAppointment] =
    useState<Appointment>();
  const { peerConnectionRef, createAnswer, addAnswer, closePeerConnection } = useRTC();
  const { socket } = useSockets();
  const [isRescheduling, setIsRescheduling] = React.useState(false);
  const appointments = useSelector(
    (state: RootState) => state.auth.user?.appointments
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const listenerAdded = useRef(false);

  useEffect(() => {
    if (listenerAdded.current) return;

    listenerAdded.current = true;

    const handleRTCEvent = async (data: {
      type: string;
      offer?: RTCSessionDescriptionInit;
      answer?: RTCSessionDescriptionInit;
      candidate?: RTCIceCandidate;
      appointment: Appointment;
    }) => {
      switch (data.type) {
        case "offer":
          console.log("Offer received:", data.offer);
          await createAnswer(data.offer!, data.appointment);
          break;

        case "answer":
          console.log("Answer received:", data.answer);
          await addAnswer(data.answer!);
          break;

        case "candidate":
          console.log("ICE candidate received");
          if (peerConnectionRef.current) {
            try {
              await peerConnectionRef.current.addIceCandidate(data.candidate);
            } catch (error) {
              console.error("Error adding ICE candidate:", error);
            }
          }
          break;

        default:
          console.log(`Unhandled RTC event type: ${data.type}`);
      }
    };

    socket?.on(SOCKET_EVENTS.RTC_EVENT, handleRTCEvent);

    return () => {
      console.log("Cleaning up RTC_EVENT listener.");
      socket?.off(SOCKET_EVENTS.RTC_EVENT, handleRTCEvent);
      closePeerConnection();
      listenerAdded.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div className="w-full h-full flex flex-col bg-[#fffcf8] p-6 gap-4 dark:bg-[#121212]">
      {isOpen && <NotificationDrawer setIsOpen={setIsOpen} />}
      {isManagingAppointmentRequests && (
        <ManageAppointmentRequests
          setIsManagingAppointmentRequests={setIsManagingAppointmentRequests}
        />
      )}
      {
        (isSomeOneCalling && appointInQuestion) && (
          <HandleCallScreen
            setIsAppointmentOnline={setIsSomeOneCalling}
            appointment={appointInQuestion}
          />
        )
      }
      {isSchedulingAppointment && (
        <SearchDoctorsForAppointments
          setIsSchedulingAppointment={setIsSchedulingAppointment}
        />
      )}
      {isRescheduling && reScheduleAppointment ? (
        <RescheduleForm
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
        <div className="flex items-center gap-4">
          <Button
            className="bg-green-500 dark:bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 dark:hover:bg-green-800"
            onClick={() => setIsManagingAppointmentRequests(true)}
          >
            Manage Appointment Requests
          </Button>
          <Button
            className="bg-green-500 dark:bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 dark:hover:bg-green-800"
            onClick={() => setIsSchedulingAppointment(true)}
          >
            Schedule an Appointment
          </Button>
          {(user?.notifications?.length ?? 0) > 0 ? (
            <Bell
              size={22}
              className="stroke-[#3f3f46] hover:stroke-black dark:stroke-gray-200 dark:hover:stroke-white cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          ) : (
            <BellDotIcon
              size={22}
              className="stroke-[#3f3f46] hover:stroke-black dark:stroke-gray-200 dark:hover:stroke-white cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
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
                    className="text-sm text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-zinc-800 px-3 py-1 border rounded-md"
                    onClick={() => {
                      setReScheduleAppointment(appointment);
                      setIsRescheduling(true);
                    }}
                  >
                    Reschedule
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-sm text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-zinc-800 px-3 py-1 border rounded-md"
                    onClick={() => {
                      setAppointInQuestion(appointment);
                      setIsSomeOneCalling(true);
                    }}
                  >
                    Handle Call
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
