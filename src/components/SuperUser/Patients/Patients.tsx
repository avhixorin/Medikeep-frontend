import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useSockets from "@/hooks/useSockets";
import { User } from "@/types/types";
import { useCallback, useEffect, useState } from "react";

const Patients = () => {
  const [patients, setPatients] = useState<Partial<User>[] | null>(null);
  const { socket } = useSockets();
  console.log("patients", patients);
  const fetchPatients = useCallback(() => {
    if (socket) {
      socket.emit(SOCKET_EVENTS.ADMIN_REQUEST, { type: "patients" });
    }
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    fetchPatients();
    socket.on(SOCKET_EVENTS.ADMIN_PATIENTS, (data) => setPatients(data));

    return () => {
      socket.off(SOCKET_EVENTS.ADMIN_PATIENTS);
    };
  }, [fetchPatients, socket]);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <h1>All Patients</h1>
    </div>
  );
};

export default Patients;
