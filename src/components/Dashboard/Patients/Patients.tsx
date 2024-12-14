import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { User } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, BellDotIcon, SearchIcon, Users, X } from "lucide-react";
import NotificationDrawer from "../Notifications/NotificationDrawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PatientDetailsCard from "./PatientDetailsCard/PatientDetailsCard";

const Patients: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isViewingDetails, setIsViewingDetails] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = React.useState<User | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [patients, setPatients] = React.useState<User[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);

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

  React.useEffect(() => {
    if (user?.appointments) {
      const patientList = user.appointments.map(
        (appointment) => appointment.patient
      );
      setPatients(patientList);
    }
  }, [user]);

  return (
    <div className="w-full min-h-screen bg-[#F9F8F4] flex flex-col items-center px-6 py-4 dark:bg-[#141414]">
      {isOpen && <NotificationDrawer setIsOpen={setIsOpen} />}
      {isViewingDetails && selectedPatient && <PatientDetailsCard patient={selectedPatient} setIsViewingDetails={setIsViewingDetails} calcAge={calcAge}/>}
      {/* Header Section */}
      <div className="w-full flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
            Patients
          </h1>
          <Users size={28} className="text-gray-500 dark:text-gray-300" />
        </div>
        <div className="flex items-center gap-4">
          {(user?.notifications?.length ?? 0) > 0 ? (
            <Bell
              size={24}
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          ) : (
            <BellDotIcon
              size={24}
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </div>
      {/* Search Bar */}
      <div className="relative w-full mb-8">
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <Input
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-12 py-3 text-lg bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 transform 
            -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {patients.length > 0 ? (
          patients.map((patient, index) => (
            <Card
              key={index}
              className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow dark:bg-[#0a0a0a] dark:border dark:border-gray-800"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border-2 border-blue-500">
                    <AvatarImage
                      src={patient.profilePicture}
                      alt={`${patient.firstName} ${patient.lastName}`}
                    />
                    <AvatarFallback>
                      {patient.firstName[0]}
                      {patient.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {patient.firstName} {patient.lastName}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                      Age: {calcAge(patient.dateOfBirth)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Email: {patient.email}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Phone: {patient.phone}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full py-2 dark:bg-zinc-300 dark:hover:bg-white"
                  onClick={() =>
                    patient && (setSelectedPatient(patient), setIsViewingDetails(true))
                  }
                >
                  View Full Details
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center col-span-1 md:col-span-2 lg:col-span-3">
            No patients found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Patients;
