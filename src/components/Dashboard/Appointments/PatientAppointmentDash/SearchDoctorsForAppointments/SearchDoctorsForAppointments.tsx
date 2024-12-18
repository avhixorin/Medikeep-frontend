import { RootState } from "@/redux/store/store";
import { AppointmentStatus, User } from "@/types/types";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import AppointmentForm from "../PatientAppointmentForm";

const SearchDoctorsForAppointments = ({
  setIsSchedulingAppointment,
}: {
  setIsSchedulingAppointment: (value: boolean) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [appointmentStatuses, setAppointmentStatuses] = useState<{
    [doctorId: string]: AppointmentStatus;
  }>({});
  const [requestedDoctors, setRequestedDoctors] = useState<User>();
  const [isRequesting, setIsRequesting] = useState(false);
  const allUsers = useSelector((state: RootState) => state.allUsers.users);
  const doctors = allUsers.filter(
    (user: User) =>
      user.role === "doctor" &&
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );
  const handleRequest = (doctor: User) => {
    setIsRequesting(true);
    setRequestedDoctors(doctor);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-md z-50 flex items-center justify-center">
      {isRequesting && (
        <AppointmentForm
          doctorName={`${requestedDoctors?.firstName} ${requestedDoctors?.lastName}`}
          doctorId={requestedDoctors?._id || ""}
          setIsRequesting={setIsRequesting}
          setIsSchedulingAppointment={setIsSchedulingAppointment}
          setAppointmentStatuses={setAppointmentStatuses}
        />
      )}
      <div className="relative rounded-lg bg-white dark:bg-[#0d121a] shadow-md p-6 max-w-2xl w-[90%]">
        <button
          onClick={() => setIsSchedulingAppointment(false)}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Search
        </h2>

        <Input
          type="text"
          placeholder="Search username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all mb-4"
        />

        {doctors.length > 0 ? (
          <div className="max-h-[60vh] overflow-y-auto scrollbar-webkit overflow-x-hidden rounded-md">
            {doctors.map((doctor: User) => (
              <div
                key={doctor._id}
                className="w-full flex items-center gap-4 py-3 px-4 bg-white/20 backdrop-blur-md dark:bg-transparent transform transition-transform duration-200 hover:scale-[1.02] border-b border-black/30 dark:border-white/30 text-zinc-700 cursor-pointer hover:bg-white/50 dark:hover:bg-black/10 hover:border-l-2 hover:border-black/20 hover:dark:border-white/20"
              >
                <img
                  src={doctor.profilePicture}
                  alt={`${doctor.username}'s profile`}
                  className="w-14 h-14 rounded-full border border-gray-300 dark:border-gray-700"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {`${doctor.firstName} ${doctor.lastName}`}
                  </h3>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                    {doctor.specialization || "N/A"}
                  </h3>
                </div>
                <button
                  onClick={() => handleRequest(doctor)}
                  className={`px-4 py-2 rounded-lg shadow transition-all ${
                    appointmentStatuses[doctor._id!] ===
                    AppointmentStatus.REQUESTED
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {appointmentStatuses[doctor._id!] || AppointmentStatus.IDLE}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              No Users Found
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Try searching again later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDoctorsForAppointments;
