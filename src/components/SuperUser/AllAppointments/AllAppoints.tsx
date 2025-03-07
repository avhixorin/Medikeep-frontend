import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useSockets from "@/hooks/useSockets";
import { User } from "@/types/types";
import { useCallback, useEffect, useState } from "react";

const AllAppoints = () => {
  const [appointments, setAppointments] = useState<Partial<User>[] | null>(
    null
  );
  const { socket } = useSockets();
  console.log("appointments", appointments);
  const fetchAllAppointments = useCallback(() => {
    if (socket) {
      socket.emit(SOCKET_EVENTS.ADMIN_REQUEST, { type: "appointments" });
    }
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    fetchAllAppointments();
    socket.on(SOCKET_EVENTS.ADMIN_APPOINTMENTS, (data) =>
      setAppointments(data)
    );

    return () => {
      socket.off(SOCKET_EVENTS.ADMIN_APPOINTMENTS);
    };
  }, [fetchAllAppointments, socket]);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <h1>All Appointments</h1>
    </div>
  );
};

export default AllAppoints;
