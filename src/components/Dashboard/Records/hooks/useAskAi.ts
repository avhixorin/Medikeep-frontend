import { AI_SOCKET_EVENTS } from "@/constants/socketEvents";
import { useSocket } from "@/sockets/context";
import { useCallback, useEffect } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AiChatThread } from "@/redux/features/aiChatSlice";

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

export const useFetchAiChatThreads = (): UseQueryResult<AiChatThread[]> => {
  return useQuery({
    queryKey: ["aiChatThreads"],
    queryFn: async () => {
      const res = await fetch(`/api/ai-chat/threads`);
      if (!res.ok) {
        throw new Error("Failed to fetch AI chat threads");
      }
      return res.json();
    },
    enabled: false,
  });
};

export const useFetchAiChatThread = (threadId: string): UseQueryResult<AiChatThread> => {
  return useQuery({
    queryKey: ["aiChatThread", threadId],
    queryFn: async () => {
      const res = await fetch(`/api/ai-chat/threads/${threadId}`);
      if (!res.ok) {
        throw new Error(
          "Failed to fetch AI chat thread for the id: " + threadId
        );
      }
      return res.json();
    },
    enabled: !!threadId,
  });
};
