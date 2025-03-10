import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useSockets from "@/hooks/useSockets";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Appointment {
  _id: string;
  patient: { username: string; profilePicture?: string };
  doctor: { username: string; profilePicture?: string };
  date: string;
  status: "Pending" | "Completed" | "Canceled";
}

const AllAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const { socket } = useSockets();

  const fetchAllAppointments = useCallback(() => {
    if (socket) {
      socket.emit(SOCKET_EVENTS.ADMIN_REQUEST, { type: "appointments" });
    }
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    fetchAllAppointments();
    socket.on(SOCKET_EVENTS.ADMIN_APPOINTMENTS, (data) =>
      setAppointments([...data].reverse())
    );

    return () => {
      socket.off(SOCKET_EVENTS.ADMIN_APPOINTMENTS);
    };
  }, [fetchAllAppointments, socket]);

  return (
    <div className="w-full h-full p-6 flex flex-col">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        All Appointments
      </h1>

      {!appointments ? (
        <div className="w-full max-w-4xl space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-12 rounded-md" />
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No appointments found.
        </p>
      ) : (
        <div className="w-full  overflow-x-auto">
          <Table className="w-full border rounded-xl shadow-md bg-white dark:bg-slate-800 dark:text-gray-300">
            <TableHeader>
              <TableRow className="bg-gray-200 dark:bg-slate-700">
                <TableHead className="p-4 text-left">Patient</TableHead>
                <TableHead className="p-4 text-left">Doctor</TableHead>
                <TableHead className="p-4 text-left">Date</TableHead>
                <TableHead className="p-4 text-left">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow
                  key={appointment._id}
                  className="border-b transition-all hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  <TableCell className="p-4 flex items-center gap-3">
                    <img
                      src={
                        appointment.patient.profilePicture ||
                        "/default-avatar.png"
                      }
                      alt="Patient Avatar"
                      className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-500"
                    />
                    <span className="font-medium">
                      {appointment.patient.username}
                    </span>
                  </TableCell>

                  <TableCell className="p-4">
                    <img
                      src={
                        appointment.doctor.profilePicture ||
                        "/default-avatar.png"
                      }
                      alt="Patient Avatar"
                      className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-500"
                    />
                    <span className="font-medium">
                      {appointment.doctor.username}
                    </span>
                  </TableCell>

                  <TableCell className="p-4">
                    {new Date(appointment.date).toLocaleString()}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        appointment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400"
                          : appointment.status === "Completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AllAppointments;
