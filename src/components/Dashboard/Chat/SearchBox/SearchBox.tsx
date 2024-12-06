import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import SearchTile from "./SearchTile";

import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useSockets from "@/hooks/useSockets";

import { addNotification } from "@/redux/features/notificationsSlice";
import { addConnectionRequest } from "@/redux/features/authSlice";

import { RootState } from "@/redux/store/store";
import { connectionResponse, notification, User } from "@/types/types";

type SearchBoxProps = {
  setIsSearching: (isSearching: boolean) => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({ setIsSearching }) => {
  const dispatch = useDispatch();
  const { socket } = useSockets();

  const allUsers = useSelector((state: RootState) => state.allUsers.users);
  const { user } = useSelector((state: RootState) => state.auth);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [connectionStates, setConnectionStates] = useState<{
    [key: string]: "idle" | "connecting" | "sent";
  }>({});

  // Handle socket events
  useEffect(() => {
    if ( !socket ) {
      toast.error("Socket is not initialized. Please refresh the page.");
      return;
    }

    const handleConnectionResponse = (data: connectionResponse) => {
      const { statusCode, message, data: responseData } = data;
      const { to } = responseData;

      if (statusCode === 200) {
        toast.success(message);
        setConnectionStates((prev) => ({ ...prev, [to]: "sent" }));
      } else {
        toast.error(message);
        setConnectionStates((prev) => ({ ...prev, [to]: "idle" }));
      }
    };

    const handleNewConnectionNotification = (data: notification) => {
      toast.success(data.message);
      dispatch(addNotification(data));
      dispatch(addConnectionRequest(data.from!));
    };

    socket.on(SOCKET_EVENTS.CONNECT_USER_RESPONSE, handleConnectionResponse);
    

    return () => {
      socket.off(SOCKET_EVENTS.CONNECT_USER_RESPONSE, handleConnectionResponse);
      socket.off(
        SOCKET_EVENTS.NEW_CONNECTION_NOTIFICATION,
        handleNewConnectionNotification
      );
    };
  }, [socket, dispatch]);

  // Handle connection requests
  const handleConnect = (userId: string) => {
    if (!socket) {
      toast.error("Socket is not initialized. Please refresh the page.");
      return;
    }

    setConnectionStates((prev) => ({ ...prev, [userId]: "connecting" }));
    socket.emit(SOCKET_EVENTS.CONNECT_USER, { from: user, to: userId });
  };

  // Filter users based on the search query
  const filteredUsers = allUsers.filter((u: User) =>
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="relative rounded-lg bg-white dark:bg-[#1e293b] shadow-md p-6 max-w-lg w-[90%]">
        {/* Close Button */}
        <button
          onClick={() => setIsSearching(false)}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors text-2xl"
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Search
        </h2>

        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all mb-4"
        />

        {/* Search Results */}
        {filteredUsers.length > 0 ? (
          <div className="max-h-[60vh] overflow-y-auto scrollbar-webkit overflow-x-hidden rounded-md">
            {filteredUsers.map((u: User) => {
              const connectionState = u._id ? connectionStates[u._id] || "idle" : "idle";
              const isDisabled = connectionState !== "idle";

              return (
                <SearchTile
                  key={u._id}
                  profileImage={u.profilePicture || "https://randomuser.me/api/portraits"}
                  username={u.username}
                  role={u.role}
                  onConnect={() => u._id && handleConnect(u._id)}
                  isDisabled={isDisabled}
                  connectState={connectionState}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              No Users Found
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Try searching again later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
