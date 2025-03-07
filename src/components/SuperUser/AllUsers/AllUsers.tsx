import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useSockets from "@/hooks/useSockets";
import { User } from "@/types/types";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState<Partial<User>[] | null>(null);
  const { socket } = useSockets();

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
    <div className="w-full h-full p-6 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>

      {/* Show loading skeletons while fetching users */}
      {!allUsers ? (
        <Skeleton className="w-full h-96 rounded-lg" />
      ) : allUsers.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="w-full max-w-4xl overflow-x-auto">
          <Table className="w-full border rounded-lg shadow-lg bg-white dark:bg-slate-800">
            <TableHeader>
              <TableRow className="bg-gray-200 dark:bg-slate-700">
                <TableHead className="p-3">Avatar</TableHead>
                <TableHead className="p-3">Name</TableHead>
                <TableHead className="p-3">Email</TableHead>
                <TableHead className="p-3">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.map((user) => (
                <TableRow key={user._id} className="border-b hover:bg-gray-100">
                  <TableCell className="p-3">
                    <img src={user.profilePicture || "/default-avatar.png"} alt="User Avatar" className="w-10 h-10 rounded-full" />
                  </TableCell>
                  <TableCell className="p-3">{user.username || "N/A"}</TableCell>
                  <TableCell className="p-3">{user.email || "N/A"}</TableCell>
                  <TableCell className="p-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${user.role === "admin" ? "bg-red-500 text-white" : "bg-blue-500 text-white"}`}>
                      {user.role}
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

export default AllUsers;
