import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useSockets from "@/hooks/useSockets";
import { User } from "@/types/types";
import { useCallback, useEffect, useState } from "react";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState<Partial<User>[] | null>(null);
  const { socket } = useSockets();
  console.log("allUsers", allUsers);
  const fetchAllUsers = useCallback(() => {
      if (socket) {
        socket.emit(SOCKET_EVENTS.ADMIN_REQUEST, { type: "allUsers" });
      }
    }, [socket]);
  
    useEffect(() => {
      if (!socket) return;
      fetchAllUsers();
      socket.on(SOCKET_EVENTS.ADMIN_ALL_USERS, (data) => setAllUsers(data));
  
      return () => {
        socket.off(SOCKET_EVENTS.ADMIN_ALL_USERS);
      };
    }, [fetchAllUsers, socket]);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <h1>All Users</h1>
    </div>
  )
}

export default AllUsers
