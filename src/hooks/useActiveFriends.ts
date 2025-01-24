import { User } from "@/types/types";
import { useEffect, useState, useMemo, useCallback } from "react";
import useSockets from "./useSockets";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { format } from "date-fns";

const useActiveFriends = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeFriends, setActiveFriends] = useState<User[]>([]);
  const { socket } = useSockets();

  useEffect(() => {
    if (!socket || !user?._id) return;

    // Emit event to fetch online friends
    socket.emit(SOCKET_EVENTS.GET_ONLINE_FRIENDS, user._id);

    // Listener for online friends
    const handleOnlineFriends = (data: { statusCode: number; message: string; data: User[] }) => {
      setActiveFriends(data.data || []);
    };

    socket.on(SOCKET_EVENTS.GET_ONLINE_FRIENDS, handleOnlineFriends);

    return () => {
      socket.off(SOCKET_EVENTS.GET_ONLINE_FRIENDS, handleOnlineFriends);
    };
  }, [socket, user?._id]);

  const getUserStatus = useCallback(
    (userId: string) => {
      const friend = activeFriends.find((friend) => friend._id === userId);
      return friend
        ? "Active now"
        : `Last seen: ${format(user?.lastSeen ?? new Date(), "p")}`;
    },
    [activeFriends, user?.lastSeen]
  );

  const memoizedActiveFriends = useMemo(() => activeFriends, [activeFriends]);

  return { activeFriends: memoizedActiveFriends, setActiveFriends, getUserStatus };
};

export default useActiveFriends;
