import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { addFriendMessage } from "@/redux/features/messageSlice";
import { useSocket } from "@/sockets/context";
import { PrivateMessage } from "@/types/types";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useChatSocketEvents = () => {
  const { socket } = useSocket();
  const dispatch = useDispatch();

  const handleNewPrivateMessage = useCallback(
    (data: PrivateMessage) => {
      console.log("New private message received:", data);
      dispatch(addFriendMessage(data));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!socket) return;
    
    socket.on(SOCKET_EVENTS.NEW_PRIVATE_MESSAGE, handleNewPrivateMessage);

    // This is the cleanup function. It runs when the component unmounts
    // or when the dependencies (`socket`, `handleNewPrivateMessage`) change.
    return () => {
      socket.off(SOCKET_EVENTS.NEW_PRIVATE_MESSAGE, handleNewPrivateMessage);
    };
  }, [socket, handleNewPrivateMessage]);
};