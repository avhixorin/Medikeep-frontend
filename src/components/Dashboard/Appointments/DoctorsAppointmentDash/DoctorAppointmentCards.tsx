import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useSockets from "@/hooks/useSockets";
import { removeAppointment } from "@/redux/features/authSlice";
import { Appointment } from "@/types/types";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { RescheduleForm } from "../RescheduleForm/RescheduleForm";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocotorAppointmentCardProps {
  appointment: Appointment;
  fullName: string;
  appointmentTime: string;
  profilePicture: string;
  appointmentDate: string;
  age: number;
  onStartSession: () => void;
}

export const DocotorAppointmentCard: React.FC<DocotorAppointmentCardProps> = ({
  appointment,
  fullName,
  appointmentTime,
  profilePicture,
  appointmentDate,
  age,
  onStartSession,
}) => {
  const [isRescheduling, setIsRescheduling] = React.useState(false);
  const [date, setDate] = useState<string | undefined>(undefined);
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const { socket } = useSockets();
  const dispatch = useDispatch();
  const handleReschedule = () => {
    setIsRescheduling(true);
  };
  const handleCancel = () => {
    socket?.emit(SOCKET_EVENTS.CANCELLED_APPOINTMENT, {
      appointmentId: appointment._id,
    });
    dispatch(removeAppointment(appointment._id));
    toast.success(
      `You have successfully cancelled the appointment with ${fullName}`
    );
  };
  return (
    <div className="w-full rounded-lg text-black dark:text-gray-200 bg-white dark:bg-gray-800 py-3 px-6 flex flex-wrap md:flex-nowrap justify-between items-center font-poppins border border-gray-300 dark:border-gray-700 space-y-4 md:space-y-0">
      {isRescheduling ? (
        <RescheduleForm
          date={date}
          time={time}
          reason={reason}
          setDate={setDate}
          setTime={setTime}
          setReason={setReason}
          appointment={appointment}
          setIsRescheduling={setIsRescheduling}
        />
      ) : null}
      <div className="flex-shrink-0">
        <img
          src={profilePicture}
          alt={`${fullName}'s Profile Picture`}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
        />
      </div>

      <p className="font-normal lg:font-medium text-base lg:text-lg text-center md:text-left flex-1 max-w-[8rem] truncate">
        {fullName}
      </p>

      <p className="text-md text-center flex-1 max-w-[4rem] truncate">
        {age} years
      </p>

      <p className="bg-indigo-500 dark:bg-indigo-700 rounded-md py-1 px-3 text-sm text-white flex-shrink-0">
        {appointmentDate}
      </p>

      <p className="text-md text-center flex-1 max-w-[12rem] truncate">
        {appointmentTime}
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
  profilePicture: string;
  fullName: string;
  age: number;
  appointmentDate: string;
  appointmentTime: string;
  onReschedule: () => void;
  onCancel: () => void;
  onStartSession: () => void;
}

export function DocotorAppointmentCardMobile({
  profilePicture,
  fullName,
  age,
  appointmentDate,
  appointmentTime,
  onReschedule,
  onCancel,
  onStartSession,
}: DocotorAppointmentCardMobileProps) {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-gray-800">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 border-2 border-primary">
            <AvatarImage src={profilePicture} alt={fullName} />
            <AvatarFallback>
              {fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {fullName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Age: {age}
            </p>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
            <span className="font-semibold">Date:</span>
            <span className="ml-2">{appointmentDate}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <ClockIcon className="w-5 h-5 mr-2 text-primary" />
            <span className="font-semibold">Time:</span>
            <span className="ml-2">{appointmentTime}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
        <Button
          onClick={onReschedule}
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
          onClick={onCancel}
          variant="destructive"
          className="hover:bg-destructive/90 transition-colors duration-300"
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
