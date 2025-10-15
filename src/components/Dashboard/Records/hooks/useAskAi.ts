import { AI_SOCKET_EVENTS } from "@/constants/socketEvents";
import { useSocket } from "@/sockets/context";
import { useCallback, useEffect } from "react";

export const useAiChatSocketEvents = () => {
  const { socket } = useSocket();

  const handleNewAiMessage = useCallback((data) => {
    console.log("New AI message received:", data);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on(AI_SOCKET_EVENTS.NEW_AI_MESSAGE, handleNewAiMessage);

    // This is the cleanup function. It runs when the component unmounts
    // or when the dependencies (`socket`, `handleNewAiMessage`) change.
    return () => {
      socket.off(AI_SOCKET_EVENTS.NEW_AI_MESSAGE, handleNewAiMessage);
    };
  }, [socket, handleNewAiMessage]);
};
