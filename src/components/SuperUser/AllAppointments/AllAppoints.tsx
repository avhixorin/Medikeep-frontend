import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useSockets from "@/hooks/useSockets";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Appointment {
  _id: string;
  patient: { username: string; profilePicture?: string };
  doctor: { username: string };
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
    socket.on(SOCKET_EVENTS.ADMIN_APPOINTMENTS, (data) => setAppointments(data));

    return () => {
      socket.off(SOCKET_EVENTS.ADMIN_APPOINTMENTS);
    };
  }, [fetchAllAppointments, socket]);

  return (
    <div className="w-full h-full p-6 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">All Appointments</h1>

      {/* Show loading skeletons while fetching data */}
      {!appointments ? (
        <Skeleton className="w-full h-96 rounded-lg" />
      ) : appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <div className="w-full max-w-4xl overflow-x-auto">
          <Table className="w-full border rounded-lg shadow-lg bg-white dark:bg-slate-800">
            <TableHeader>
              <TableRow className="bg-gray-200 dark:bg-slate-700">
                <TableHead className="p-3">Patient</TableHead>
                <TableHead className="p-3">Doctor</TableHead>
                <TableHead className="p-3">Date</TableHead>
                <TableHead className="p-3">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment._id} className="border-b hover:bg-gray-100">
                  <TableCell className="p-3 flex items-center gap-2">
                    <img
                      src={appointment.patient.profilePicture || "/default-avatar.png"}
                      alt="Patient Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    {appointment.patient.username}
                  </TableCell>
                  <TableCell className="p-3">{appointment.doctor.username}</TableCell>
                  <TableCell className="p-3">{new Date(appointment.date).toLocaleString()}</TableCell>
                  <TableCell className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-sm ${
                        appointment.status === "Pending"
                          ? "bg-yellow-500"
                          : appointment.status === "Completed"
                          ? "bg-green-500"
                          : "bg-red-500"
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
