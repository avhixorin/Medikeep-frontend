import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useSockets from "@/hooks/useSockets";
import { cn } from "@/lib/utils";
import { reScheduleAppointment } from "@/redux/features/authSlice";
import { Appointment } from "@/types/types";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useDispatch } from "react-redux";

type RescheduleFormProps = {
    date: string | undefined;
    time: string;
    reason: string;
    setDate: (date: string) => void;
    setTime: (time: string) => void;
    setReason: (reason: string) => void;
    appointment: Appointment;
    setIsRescheduling: (value: boolean) => void;
  };
  
export const RescheduleForm: React.FC<RescheduleFormProps> = ({
    date,
    time,
    reason,
    setDate,
    setTime,
    setReason,
    appointment,
    setIsRescheduling,
  }) => {
    const { socket } = useSockets();
    const dispatch = useDispatch();
  
    const handleRequest = () => {
      socket?.emit(SOCKET_EVENTS.RESCHEDULED_APPOINTMENT, {
        appointmentId: appointment._id,
        date: date || "",
        time,
        reason,
      });
      dispatch(
        reScheduleAppointment({
          appointmentId: appointment._id,
          date: date || "",
          time,
          reason,
        })
      );
      setIsRescheduling(false);
    };
  
    const handleCancel = () => {
      setIsRescheduling(false);
    };
  
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-[#0A0A0A] rounded-lg shadow-lg w-full max-w-lg p-6">
          {/* Header */}
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Reschedule Appointment
          </h2>
  
          {/* Form Fields */}
          <div className="space-y-6">
            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date Picker */}
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
                      aria-label="Pick a date"
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
                      onSelect={(selected) =>
                        setDate(selected ? selected.toISOString() : "")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
  
              {/* Time Input */}
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
  
            {/* Reason Textarea */}
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
                className="w-full mt-1 resize-none"
              />
            </div>
          </div>
  
          {/* Action Buttons */}
          <div className="flex justify-end mt-6 space-x-4">
            <Button
              variant="secondary"
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRequest}
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Request
            </Button>
          </div>
        </div>
      </div>
    );
  };