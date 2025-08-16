import React from "react";
import AutoResizeTextarea from "react-textarea-autosize";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  handleSendMessage: () => void;
}

export const ChatInput = ({
  input,
  setInput,
  isLoading,
  handleSendMessage,
}: ChatInputProps) => {
  const canSend = !!input.trim() && !isLoading;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && canSend) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="relative flex items-end">
      <AutoResizeTextarea
        aria-label="Type your message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        disabled={isLoading}
        className="w-full resize-none rounded-xl border border-input bg-background/70 px-4 py-3 text-base 
                   focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background 
                   pr-14 transition-shadow"
        minRows={1}
        maxRows={6}
      />
      <button
        type="submit"
        aria-label="Send message"
        className={`absolute right-3 bottom-[11px] h-8 w-8 rounded-full flex items-center justify-center 
                   transition-all duration-300 transform
                   ${
                     canSend
                       ? "bg-primary text-primary-foreground scale-100 hover:scale-105 hover:bg-primary/90"
                       : "bg-muted text-muted-foreground scale-95 cursor-not-allowed"
                   }`}
        disabled={!canSend}
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </form>
  );
};
