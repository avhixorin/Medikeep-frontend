import React, { useState, useEffect } from "react";
import { Sidebar } from "./components/sidebar";
import { ChatPanel } from "./components/chatPanel";
import { useSocket } from "@/sockets/context";
import { AI_SOCKET_EVENTS } from "@/constants/socketEvents";
import { useFetchAiChatThreads } from "@/components/Dashboard/Records/hooks/useAskAi";
import { AiChatThread } from "@/redux/features/aiChatSlice";
import { AIChatMessage } from "@/components/Dashboard/Records/types";
import { v4 as uuid } from "uuid";

const makeId = () => uuid();
const createDefaultThread = (): AiChatThread => ({
  title: "New Chat",
  chatThread: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const saveThreadAPI = async (thread: AiChatThread) => {
  console.log("SAVING THREAD TO BACKEND:", thread.title, thread._id);
  // In a real app: await fetch(`/api/threads`, { method: 'POST', ... });
  return Promise.resolve();
};

export const CreativeChatInterface = ({ entityId }: { entityId: string }) => {
  const [allThreads, setAllThreads] = useState<AiChatThread[]>([]);
  const [activeThread, setActiveThread] = useState<AiChatThread>(createDefaultThread());
  const [isSending, setIsSending] = useState(false);
  const { socket } = useSocket();

  const { data, isLoading: isListLoading, isError, refetch } = useFetchAiChatThreads();

  useEffect(() => {
    refetch(); 
  }, [refetch]);

  useEffect(() => {
    if (data) {
      const sorted = [...(data as AiChatThread[])].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      setAllThreads(sorted);
      if (sorted.length > 0 && activeThread.title === "New Chat" && activeThread.chatThread.length === 0) {
        setActiveThread(sorted[0]);
      }
    }
  }, [data, activeThread]);

  const handleSelectThread = (threadId: string) => {
    const threadToSelect = allThreads.find((t) => t._id === threadId);
    if (threadToSelect) {
      setActiveThread(threadToSelect);
    }
  };

  const handleNewChat = async () => {
    if (activeThread.chatThread.length === 0) {
      console.log("Current chat is empty, doing nothing.");
      return;
    }
    await saveThreadAPI(activeThread);
    await refetch();
    setActiveThread(createDefaultThread());
  };

  const handleSendMessage = (message: string) => {
    if (!message || isSending || !activeThread) return;
    const userMsg: AIChatMessage = { _id: makeId(), role: "user", content: message };
    
    setActiveThread(current => ({ ...current!, chatThread: [...current!.chatThread, userMsg] }));
    setIsSending(true);

    socket?.emit(AI_SOCKET_EVENTS.NEW_AI_MESSAGE, { message, to: entityId });
    simulateAIResponse(message);
  };

  const simulateAIResponse = (userMessage: string) => {
    setTimeout(() => {
      const aiResponse: AIChatMessage = {
        _id: makeId(),
        role: "assistant",
        content: `Simulated response to: "${userMessage}".`,
      };
      setActiveThread(current => ({ ...current!, chatThread: [...current!.chatThread, aiResponse] }));
      setIsSending(false);
    }, 1500);
  };
  return (
    <div className="flex h-full w-full text-foreground">
      <Sidebar
        threads={allThreads}
        activeThread={activeThread}
        onSelectThread={handleSelectThread}
        onNewChat={handleNewChat}
        isLoading={isListLoading}
        isError={isError}
      />
      <ChatPanel
        thread={activeThread}
        isLoading={isSending}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default CreativeChatInterface;