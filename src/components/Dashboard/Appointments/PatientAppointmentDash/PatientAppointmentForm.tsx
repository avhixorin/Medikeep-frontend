import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { AppointmentStatus } from "@/types/types";
import useSockets from "@/hooks/useSockets";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const PatientAppointmentForm: React.FC<{
  doctorName: string;
  doctorId: string;
  onCancel: () => void;
  setAppointmentStatuses: (
    value: (prevStatuses: { [doctorId: string]: AppointmentStatus }) => {
      [doctorId: string]: AppointmentStatus;
    }
  ) => void;
}> = ({ doctorName, doctorId, onCancel, setAppointmentStatuses }) => {
  const [date, setDate] = useState<string | undefined>(undefined);
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);
  const { socket } = useSockets();

  const handleRequest = () => {
    if (!date || !time || !reason) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    setAppointmentStatuses(
      (prevStatuses: { [doctorId: string]: AppointmentStatus }) => ({
        ...prevStatuses,
        [doctorId]: AppointmentStatus.REQUESTED,
      })
    );

    socket?.emit(SOCKET_EVENTS.REQUEST_APPOINTMENT, {
      patientId: user?._id,
      doctorId: doctorId,
      status: AppointmentStatus.REQUESTED,
      date,
      time,
      reason,
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-md z-50 flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-lg p-6 bg-white dark:bg-gray-800 rounded-md shadow-md space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Doctor
            </Label>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {doctorName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ID: {doctorId}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Patient
            </Label>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ID: {user?._id}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="date"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Appointment Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
                      "dark:bg-[#0A0A0A] dark:text-gray-400 dark:border-gray-700 dark:hover:bg-zinc-800",
                      !date && "text-muted-foreground dark:text-gray-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    {date ? (
                      format(new Date(date), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border-gray-300 dark:bg-[#0A0A0A] dark:border-gray-700">
                  <Calendar
                    mode="single"
                    selected={date ? new Date(date) : undefined}
                    onSelect={(selected) => setDate(selected?.toISOString())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label
                htmlFor="time"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Appointment Time
              </Label>
              <Input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full mt-1"
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="reason"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Reason for Appointment
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason..."
              className="w-full mt-1"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleRequest}>Request</Button>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointmentForm;
