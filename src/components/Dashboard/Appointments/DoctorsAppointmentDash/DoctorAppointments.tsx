import React, { useState, useEffect } from "react";
import { format, compareAsc, parseISO } from "date-fns";
import { CalendarIcon, SearchIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import HandleCallScreen from "../HandleCallScreen/HandleCallScreen";
import {
  DocotorAppointmentCard,
  DocotorAppointmentCardMobile,
} from "./DoctorAppointmentCards";
const DoctorAppointments: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
  const [isAppointmentOnline, setIsAppointmentOnline] = useState(false);
  const appointments = useSelector(
    (state: RootState) => state.auth.user?.appointments || []
  );
  const [selectedAppointment, setSelectedAppointment] = useState(
    appointments[0]
  );
  const filteredAppointments = appointments
    .filter(
      (appt) =>
        (!formattedDate || appt.date === formattedDate) &&
        (!searchQuery ||
          `${appt.patient.firstName} ${appt.patient.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      const dateA = a.date ? parseISO(a.date) : new Date(0);
      const dateB = b.date ? parseISO(b.date) : new Date(0);
      return compareAsc(dateA, dateB);
    });

  const clearFilters = () => {
    setDate(undefined);
    setSearchQuery("");
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

  // Handle dynamic resizing
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-[#fffcf8] p-6 gap-2 dark:bg-[#121212]">
      {isAppointmentOnline && (
        <HandleCallScreen
          setIsAppointmentOnline={setIsAppointmentOnline}
          appointment={selectedAppointment}
        />
      )}
      <div className="w-full flex flex-col gap-8">
        <h1 className="text-3xl font-semibold text-zinc-700 dark:text-gray-200">
          Appointments
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full md:w-[200px] justify-start text-left font-normal bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
                  "dark:bg-[#0A0A0A] dark:text-gray-400 dark:border-gray-700 dark:hover:bg-zinc-800",
                  !date && "text-muted-foreground dark:text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white border-gray-300 dark:bg-[#0A0A0A] dark:border-gray-700">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <div className="relative flex-grow bg-white border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 dark:bg-[#0A0A0A] dark:border-gray-700 dark:focus-within:ring-blue-400">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <Input
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 bg-transparent text-gray-700 placeholder-gray-500 border-none outline-none dark:text-gray-200 dark:placeholder-gray-500"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <Button
            variant="outline"
            onClick={clearFilters}
            className={cn(
              "whitespace-nowrap text-gray-700 border-gray-300 hover:bg-gray-100",
              "dark:text-gray-400 dark:border-gray-700 dark:hover:bg-zinc-800 dark:hover:text-gray-200",
              !date &&
                !searchQuery &&
                "text-muted-foreground dark:text-gray-500"
            )}
            disabled={!date && !searchQuery}
          >
            Clear filters
          </Button>
        </div>
      </div>
      <div className="mt-6 flex-grow bg-white dark:bg-[#0A0A0A] rounded-md p-6 overflow-y-auto shadow-xl scrollbar-webkit border border-gray-200 dark:border-gray-800">
        {filteredAppointments.length > 0 ? (
          <div className={isMobile ? "space-y-4" : "grid grid-cols-1 gap-2"}>
            {filteredAppointments.map((appointment) =>
              isMobile ? (
                <DocotorAppointmentCardMobile
                  key={appointment._id}
                  profilePicture={appointment.patient.profilePicture || ""}
                  fullName={`${appointment.patient.firstName} ${appointment.patient.lastName}`}
                  age={calcAge(appointment.patient.dateOfBirth)}
                  appointmentDate={format(new Date(appointment.date), "PPP")}
                  appointmentTime={appointment.time}
                  onStartSession={() => {
                    setSelectedAppointment(appointment);
                    setIsAppointmentOnline(true);
                  }}
                  onReschedule={() => console.log("Reschedule")}
                  onCancel={() => console.log("Cancel")}
                />
              ) : (
                <DocotorAppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                  profilePicture={appointment.patient?.profilePicture || ""}
                  fullName={
                    appointment.patient?.firstName +
                    " " +
                    appointment.patient?.lastName
                  }
                  age={calcAge(appointment.patient?.dateOfBirth)}
                  appointmentDate={format(new Date(appointment.date), "PPP")}
                  appointmentTime={appointment.time}
                  onStartSession={() => {
                    setSelectedAppointment(appointment);
                    setIsAppointmentOnline(true);
                  }}
                />
              )
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No appointments found.
          </p>
        )}
      </div>
      ;
    </div>
  );
};

export default DoctorAppointments;