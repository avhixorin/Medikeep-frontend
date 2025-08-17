import React, { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmed = input.trim();
    if (trimmed) {
      onSendMessage(trimmed);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Ask anything..."
        className="w-full border border-border rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <button
        onClick={handleSend}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-accent"
        aria-label="Send message"
      >
        <Send className="h-5 w-5" />
      </button>
    </div>
  );
};