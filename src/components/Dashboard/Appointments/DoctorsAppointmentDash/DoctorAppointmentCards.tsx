import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useSockets from "@/hooks/useSockets";
import { removeAppointment } from "@/redux/features/authSlice";
import { Appointment } from "@/types/types";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { RescheduleForm } from "../RescheduleForm/RescheduleForm";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Swal from "sweetalert2";

interface DocotorAppointmentCardProps {
  appointment: Appointment;
  onStartSession: () => void;
}

export const DocotorAppointmentCard: React.FC<DocotorAppointmentCardProps> = ({
  appointment,
  onStartSession,
}) => {
  const [isRescheduling, setIsRescheduling] = React.useState(false);
  const { socket } = useSockets();
  const dispatch = useDispatch();
  const handleReschedule = () => {
    setIsRescheduling(true);
  };
  const calcAge = (birthDate: string) => {
    const today = new Date();
    const dateOfBirth = new Date(birthDate);
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const m = today.getMonth() - dateOfBirth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    return age;
  };
  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to cancel the appointment with ${appointment.patient.firstName} ${appointment.patient.lastName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "No, keep",
      reverseButtons: true,
    });
    if (!result.isConfirmed) return;
    socket?.emit(SOCKET_EVENTS.CANCELLED_APPOINTMENT, {
      appointmentId: appointment._id,
    });
    dispatch(removeAppointment(appointment._id));
    toast.success(
      `You have successfully cancelled the appointment with ${appointment.patient.firstName} ${appointment.patient.lastName}`
    );
  };
  return (
    <div className="w-full rounded-lg text-black dark:text-gray-200 bg-white dark:bg-[#141414] py-3 px-6 flex flex-wrap md:flex-nowrap justify-between items-center font-poppins border border-gray-300 dark:border-gray-700 space-y-4 md:space-y-0">
      {isRescheduling ? (
        <RescheduleForm
          appointment={appointment}
          setIsRescheduling={setIsRescheduling}
        />
      ) : null}
      <div className="flex-shrink-0">
        <img
          src={appointment.patient?.profilePicture}
          alt={`${appointment?.patient.firstName}'s Profile Picture`}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
        />
      </div>

      <p className="font-normal lg:font-medium text-base lg:text-lg text-center md:text-left flex-1 max-w-[8rem] truncate">
        {appointment.patient?.firstName} {appointment.patient?.lastName}
      </p>

      <p className="text-md text-center flex-1 max-w-[4rem] truncate">
        {calcAge(appointment?.patient.dateOfBirth)} years
      </p>

      <p className="bg-indigo-500 dark:bg-indigo-700 rounded-md py-1 px-3 text-sm text-white flex-shrink-0">
        {format(appointment?.date, "dd MMM yyyy")}
      </p>

      <p className="text-md text-center flex-1 max-w-[12rem] truncate">
        {appointment?.time}
      </p>

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
          onClick={handleReschedule}
        >
          Reschedule
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 rounded-md py-2 px-4 text-sm text-white transition-colors"
          aria-label="Cancel Appointment"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

interface DocotorAppointmentCardMobileProps {
  appointment: Appointment;
  onStartSession: () => void;
}

export function DocotorAppointmentCardMobile({
  appointment,
  onStartSession,
}: DocotorAppointmentCardMobileProps) {
  const [isRescheduling, setIsRescheduling] = React.useState(false);
  const { socket } = useSockets();
  const dispatch = useDispatch();
  const handleReschedule = () => {
    setIsRescheduling(true);
  };
  const calcAge = (birthDate: string) => {
    const today = new Date();
    const dateOfBirth = new Date(birthDate);
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const m = today.getMonth() - dateOfBirth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    return age;
  };
  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to cancel the appointment with ${appointment.patient.firstName} ${appointment.patient.lastName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "No, keep",
      reverseButtons: true,
    });
    if (!result.isConfirmed) return;
    socket?.emit(SOCKET_EVENTS.CANCELLED_APPOINTMENT, {
      appointmentId: appointment._id,
    });
    dispatch(removeAppointment(appointment._id));
    toast.success(
      `You have successfully cancelled the appointment with ${appointment.patient.firstName} ${appointment.patient.lastName}`
    );
  };
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-[#141414]">
      {isRescheduling ? (
        <RescheduleForm
          appointment={appointment}
          setIsRescheduling={setIsRescheduling}
        />
      ) : null}
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 border-2 border-primary">
            <AvatarImage
              src={appointment?.patient.profilePicture}
              alt={appointment?.patient.firstName}
            />
            <AvatarFallback>
              {appointment?.patient.firstName[0]}
              {appointment?.patient.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {appointment?.patient.firstName} {appointment?.patient.lastName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Age: {calcAge(appointment?.patient.dateOfBirth)} years
            </p>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
            <span className="font-semibold">Date:</span>
            <span className="ml-2">
              {format(appointment?.date, "dd MMM yyyy")}
            </span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <ClockIcon className="w-5 h-5 mr-2 text-primary" />
            <span className="font-semibold">Time:</span>
            <span className="ml-2">{appointment?.time}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
        <Button
          onClick={handleReschedule}
          className=" bg-primary hover:bg-primary/90 text-white transition-colors duration-300"
        >
          Reschedule
        </Button>
        <Button
          onClick={onStartSession}
          className=" bg-primary hover:bg-primary/90 text-white transition-colors duration-300"
        >
          Start online session
        </Button>
        <Button
          onClick={handleCancel}
          variant="destructive"
          className="hover:bg-destructive/90 transition-colors duration-300"
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
