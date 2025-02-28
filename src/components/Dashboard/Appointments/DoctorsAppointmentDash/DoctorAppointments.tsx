import React, { useState, useEffect } from "react";
import { format, compareAsc, parseISO } from "date-fns";
import {
  Bell,
  BellDotIcon,
  CalendarIcon,
  MenuIcon,
  SearchIcon,
  X,
} from "lucide-react";
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
import {
  DocotorAppointmentCard,
  DocotorAppointmentCardMobile,
} from "./DoctorAppointmentCards";
import NotificationDrawer from "../../Notifications/NotificationDrawer";
import ManageAppointmentRequests from "../ManageAppointmentRequests/ManageAppointmenmentRequests";
import { RescheduleForm } from "../RescheduleForm/RescheduleForm";
import AppointmentCallScreen from "../AppointmentCallScreen/AppointmentCallScreen";
const DoctorAppointments: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
  const [isAppointmentOnline, setIsAppointmentOnline] = useState(false);
  const [isManagingAppointmentRequests, setIsManagingAppointmentRequests] =
    useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-transparent p-6 gap-2 dark:bg-[#141414] overflow-y-auto">
      {isAppointmentOnline && (
        <AppointmentCallScreen
          setIsAppointmentOnline={setIsAppointmentOnline}
          appointment={selectedAppointment}
        />
      )}
      {isOpen && <NotificationDrawer setIsOpen={setIsOpen} />}
      {isManagingAppointmentRequests && (
        <ManageAppointmentRequests
          setIsManagingAppointmentRequests={setIsManagingAppointmentRequests}
        />
      )}
      {isRescheduling && selectedAppointment ? (
        <RescheduleForm
          appointment={selectedAppointment}
          setIsRescheduling={setIsRescheduling}
        />
      ) : null}
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="max-md:w-full flex justify-between md:justify-normal items-start md:items-center gap-3 relative">
            <h1 className="text-lg md:text-2xl font-semibold text-zinc-700 dark:text-gray-200">
              Appointments
            </h1>
            <MenuIcon
              className="md:hidden cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            <div
              className={`absolute top-12 right-0 bg-white dark:bg-[#1A1A1D] shadow-xl rounded-md p-2 w-48 transition-transform text-sm flex flex-col justify-evenly items-center space-y-2 duration-300 ${
                isMenuOpen ? "scale-100" : "scale-0"
              }`}
            >
              <button
                className="w-full dark:text-white text-black"
                onClick={() => {
                  setIsManagingAppointmentRequests(true);
                  setIsMenuOpen(false);
                }}
              >
                Manage Requests
              </button>
              <button
                className="w-full dark:text-white text-black"
                onClick={() => {
                  setIsOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                Notifications
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Button
              className="w-full py-2 dark:bg-zinc-300 dark:hover:bg-white"
              onClick={() => setIsManagingAppointmentRequests(true)}
            >
              Manage Appointment Requests
            </Button>
            {(user?.notifications?.length ?? 0) > 0 ? (
              <BellDotIcon
                size={24}
                className="stroke-[#3f3f46] hover:stroke-black dark:stroke-gray-200 dark:hover:stroke-white cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            ) : (
              <Bell
                size={24}
                className="stroke-[#3f3f46] hover:stroke-black dark:stroke-gray-200 dark:hover:stroke-white cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row max-md:items-start items-center gap-3">
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

          <div className="relative max-md:w-full flex-grow bg-white border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 dark:bg-[#0A0A0A] dark:border-gray-700 dark:focus-within:ring-blue-400">
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

      <div className="mt-6 h-full bg-white dark:bg-[#0A0A0A] rounded-md p-2 overflow-y-auto shadow-xl scrollbar-webkit border border-gray-200 dark:border-gray-800">
        {filteredAppointments.length > 0 ? (
          <div className={isMobile ? "space-y-4" : "grid grid-cols-1 gap-2"}>
            {filteredAppointments.map((appointment) =>
              isMobile ? (
                <DocotorAppointmentCardMobile
                  key={appointment._id}
                  appointment={appointment}
                  onStartSession={() => {
                    setSelectedAppointment(appointment);
                    setIsAppointmentOnline(true);
                  }}
                />
              ) : (
                <DocotorAppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                  onStartSession={() => {
                    setSelectedAppointment(appointment);
                    setIsAppointmentOnline(true);
                  }}
                />
              )
            )}
          </div>
        ) : (
          <p className="w-full h-full grid place-content-center text-center text-gray-500 dark:text-gray-400">
            You have no appointments scheduled.
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
