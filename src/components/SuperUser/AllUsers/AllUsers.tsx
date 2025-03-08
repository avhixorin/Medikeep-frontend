import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useSockets from "@/hooks/useSockets";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/types/types";
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_AVATAR } from "@/constants/constVars";
import UserDetails from "../UserDetails";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState<Partial<User>[] | null>(null);
  const { socket } = useSockets();
  const [isViewing, setIsViewing] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);
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
    <div className="w-full h-full p-6 flex flex-col relative">
      {
        isViewing && (
          <UserDetails user={selectedUser!} onClose={setIsViewing} />
        )
      }
      <div className="w-full flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          All Users
        </h1>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          {allUsers?.length} Users Found
        </h1>
      </div>

      {allUsers?.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No users found.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {allUsers?.map((user) => (
            <UserCard key={user._id} user={user} setIsViewing={setIsViewing} setSelectedUser={setSelectedUser} />
          ))}
        </div>
      )}
    </div>
  );
};

const UserCard = ({ user, setIsViewing, setSelectedUser }: { user: Partial<User>, setIsViewing: (arg0: boolean) => void, setSelectedUser: (user: Partial<User>) => void }) => {
  return (
    <Card className="w-full max-w-96 bg-white dark:bg-black rounded-2xl shadow-xl py-2 border border-gray-200 dark:border-gray-700 flex justify-center items-center">
      <CardContent>
        <div className="flex items-center gap-4">
          <img
            src={user.profilePicture || DEFAULT_AVATAR}
            alt="User Avatar"
            className="w-18 h-16 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.username?.[0] === "@" ? "" : "@"}
              {user.username}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300 overflow-hidden">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
          </div>
          <div className="w-full flex flex-col justify-evenly items-end">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Gender:</span> {user.gender}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Role:</span> {user.role}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
          onClick={() => {
            setIsViewing(true);
            setSelectedUser(user);
          }}
          >
            View Full Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AllUsers;
