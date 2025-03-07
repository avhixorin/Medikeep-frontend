import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useSockets from "@/hooks/useSockets";
import { User } from "@/types/types";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Doctors = () => {
  const [doctors, setDoctors] = useState<Partial<User>[] | null>(null);
  const { socket } = useSockets();

  const fetchDoctors = useCallback(() => {
    if (socket) {
      socket.emit(SOCKET_EVENTS.ADMIN_REQUEST, { type: "doctors" });
    }
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    fetchDoctors();
    socket.on(SOCKET_EVENTS.ADMIN_DOCTORS, (data) => setDoctors(data));

    return () => {
      socket.off(SOCKET_EVENTS.ADMIN_DOCTORS);
    };
  }, [fetchDoctors, socket]);

  return (
    <div className="w-full h-full p-6 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">All Doctors</h1>

      {/* Show loading skeletons while fetching doctors */}
      {!doctors ? (
        <Skeleton className="w-full h-96 rounded-lg" />
      ) : doctors.length === 0 ? (
        <p className="text-gray-500">No doctors found.</p>
      ) : (
        <div className="w-full max-w-4xl overflow-x-auto">
          <Table className="w-full border rounded-lg shadow-lg bg-white dark:bg-slate-800">
            <TableHeader>
              <TableRow className="bg-gray-200 dark:bg-slate-700">
                <TableHead className="p-3">Avatar</TableHead>
                <TableHead className="p-3">Name</TableHead>
                <TableHead className="p-3">Email</TableHead>
                <TableHead className="p-3">Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor._id} className="border-b hover:bg-gray-100">
                  <TableCell className="p-3">
                    <img src={doctor.profilePicture || "/default-avatar.png"} alt="Doctor Avatar" className="w-10 h-10 rounded-full" />
                  </TableCell>
                  <TableCell className="p-3">{doctor.username || "N/A"}</TableCell>
                  <TableCell className="p-3">{doctor.email || "N/A"}</TableCell>
                  <TableCell className="p-3">{doctor.phone || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Doctors;
