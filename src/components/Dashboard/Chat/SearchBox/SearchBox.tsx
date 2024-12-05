import { connectionResponse, User } from "@/types/types";
import SearchTile from "./SearchTile";
import { Input } from "@/components/ui/input";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/store/store";
import useSockets from "@/hooks/useSockets";

type SearchBoxProps = {
  setIsSearching: (isSearching: boolean) => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({ setIsSearching }) => {
  const allUsers = useSelector((state: RootState) => state.allUsers);
  const { socket, isConnected } = useSockets();
  const { user } = useSelector((state: RootState) => state.auth);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [connectionStates, setConnectionStates] = useState<{
    [key: string]: "idle" | "connecting" | "sent";
  }>({});

  useEffect(() => {
    if (!socket && !isConnected) {
      toast.error("Socket is not initialized. Please refresh the page.");
      return;
    }

    const handleConnectionResponse = (data: connectionResponse) => {
      console.log("The response data is: ", data);

      const { statusCode, data: responseData } = data;
      const { to } = responseData;

      if (statusCode === 200) {
        toast.success("Connection request sent!");
        setConnectionStates((prev) => ({ ...prev, [to]: "sent" }));
      } else {
        toast.error("Connection request failed.");
        setConnectionStates((prev) => ({ ...prev, [to]: "idle" }));
      }
    };

    socket?.on(SOCKET_EVENTS.CONNECT_USER_RESPONSE, handleConnectionResponse);

    return () => {
      socket?.off(SOCKET_EVENTS.CONNECT_USER_RESPONSE, handleConnectionResponse);
    };
  }, [socket, isConnected]);

  const handleConnect = (userId: string) => {
    if (!socket) {
      toast.error("Socket is not initialized. Please refresh the page.");
      return;
    }

    setConnectionStates((prev) => ({ ...prev, [userId]: "connecting" }));
    socket.emit(SOCKET_EVENTS.CONNECT_USER, { from: user, to: userId });
  };

  const filteredUsers = allUsers.users.filter((user: User) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white/10 backdrop-blur z-50 flex items-center justify-center">
      <div className="relative rounded-lg shadow-md p-6 max-w-lg w-[90%] dark:backdrop-blur-xl">
        <button
          onClick={() => setIsSearching(false)}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors text-2xl"
        >
          &times;
        </button>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Search</h2>
          <Input
            type="text"
            placeholder="Search username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all mb-4"
          />

          {filteredUsers.length > 0 ? (
            <div className="max-h-[60vh] overflow-y-auto scrollbar-webkit overflow-x-hidden rounded-md">
              {filteredUsers.map((user: User) => {
                const connectionState = user._id ? connectionStates[user._id] || "idle" : "idle";
                const isDisabled = connectionState === "connecting" || connectionState === "sent";

                return (
                  <SearchTile
                    key={user._id}
                    profileImage={user.profilePicture || "https://randomuser.me/api/portraits"}
                    username={user.username}
                    role={user.role}
                    onConnect={() => user._id && handleConnect(user._id)}
                    isDisabled={isDisabled}
                    connectState={connectionState}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">No Users Found</h2>
              <p className="text-gray-600 dark:text-gray-300">Try searching again later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
