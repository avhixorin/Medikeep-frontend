import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useSockets from "@/hooks/useSockets";
import { User } from "@/types/types";
import { useCallback, useEffect, useState } from "react";
import UserCard from "../UserCards/UserCard";
import UserDetails from "../UserCards/UserDetailsCard";

const Patients = () => {
  const [patients, setPatients] = useState<Partial<User>[] | null>(null);
  const { socket } = useSockets();
  const [isViewing, setIsViewing] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);
  const fetchPatients = useCallback(() => {
    if (socket) {
      socket.emit(SOCKET_EVENTS.ADMIN_REQUEST, { type: "patients" });
    }
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    fetchPatients();
    socket.on(SOCKET_EVENTS.ADMIN_PATIENTS, (data) =>
      setPatients([...data].reverse())
    );

    return () => {
      socket.off(SOCKET_EVENTS.ADMIN_PATIENTS);
    };
  }, [fetchPatients, socket]);

  return (
    <div className="w-full h-full p-6 flex flex-col">
      {isViewing && <UserDetails user={selectedUser!} onClose={setIsViewing} />}
      <div className="w-full flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          All Users
        </h1>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          {patients?.length} Users Found
        </h1>
      </div>

      {patients?.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No users found.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {patients?.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              setIsViewing={setIsViewing}
              setSelectedUser={setSelectedUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Patients;
