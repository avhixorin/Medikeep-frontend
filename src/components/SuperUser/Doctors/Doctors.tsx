import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useSockets from "@/hooks/useSockets";
import { User } from "@/types/types";
import { useCallback, useEffect, useState } from "react";

const Doctors = () => {
  const [doctors, setDoctors] = useState<Partial<User>[] | null>(null);
  const { socket } = useSockets();
  console.log("doctors", doctors);
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
    <div className="w-full h-full flex items-center justify-center">
      <h1>All Doctors</h1>
    </div>
  );
};

export default Doctors;
