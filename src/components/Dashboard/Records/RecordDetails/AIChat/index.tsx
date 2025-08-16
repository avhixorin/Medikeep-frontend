"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sidebar } from "./components/sidebar";
import { ChatPanel } from "./components/chatPanel";
// import { useSocket } from "@/sockets/context"; // Uncomment when integrating
// import { AI_SOCKET_EVENTS } from "@/constants/socketEvents"; // Uncomment when integrating

// --- Mock Data & Types (Replace with your actual data) ---
export type Role = "user" | "assistant";

export interface Message {
  id: string;
  role: Role;
  content: string;
  sources?: string[];
}

const mockRecentChats = [
  { id: "1", title: "The History of Roman Architecture" },
  { id: "2", title: "Quantum Computing Explained Simply" },
  { id: "3", title: "Creative Recipes for Vegan Pasta" },
  { id: "4", title: "Debugging a Null Pointer Exception" },
];

// --- Main Component ---
export const CreativeChatInterface = ({ entityId }: { entityId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeChatId, setActiveChatId] = useState("1"); // Example active chat

  // const { socket } = useSocket(); // Uncomment when integrating

  const makeId = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  // Simulate receiving a message for demonstration
  const simulateAIResponse = (userMessage: string) => {
    setTimeout(() => {
      const aiResponse: Message = {
        id: makeId(),
        role: "assistant",
        content: `This is a simulated response to: "${userMessage}". In a real app, this would come from a language model.`,
        sources: ["Source A", "Source B"],
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = { id: makeId(), role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // --- Real Socket.IO integration ---
    // console.log("Emitting message: ", trimmed);
    // socket?.emit(AI_SOCKET_EVENTS.NEW_AI_MESSAGE, {
    //   message: trimmed,
    //   to: entityId,
    // });

    // --- For Demonstration ---
    simulateAIResponse(trimmed);
  };

  return (
    <div className="flex h-full w-full text-foreground">
      <Sidebar
        // recentChats={mockRecentChats}
        // activeChatId={activeChatId}
        // onChatSelect={setActiveChatId}
      />
      <ChatPanel
        messages={messages}
        isLoading={isLoading}
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default CreativeChatInterface;
