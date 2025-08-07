import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Sparkles, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}

export const AiChatModal = ({ entityId }: { entityId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post("/api/chat", {
        query: currentInput,
        entityId: entityId,
      });

      const { answer, sources } = res.data;
      const assistantMessage: Message = {
        role: "assistant",
        content: answer,
        sources,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error fetching chat response:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I couldn't get a response. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="fixed bottom-8 right-8 z-50">
        <button
          className="group flex items-center justify-center gap-3 h-12 w-12 rounded-full bg-[#1C1A1C] cursor-pointer 
                     transition-all duration-500 ease-in-out 
                     hover:w-48 hover:-translate-y-1 
                     hover:bg-gradient-to-b from-[#A47CF3] to-[#683FEA]
                     hover:shadow-[0_0_0_4px_rgba(255,255,255,0.2),0_0_180px_0_#9917FF]"
        >
          <svg
            height={24}
            width={24}
            viewBox="0 0 24 24"
            className="fill-[#AAAAAA] transition-all duration-700 ease-in-out 
                       group-hover:fill-white group-hover:scale-125"
          >
            <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z" />
          </svg>
          <span
            className="text-base font-semibold text-[#AAAAAA] 
                       w-0 opacity-0 transition-all duration-300 ease-in-out 
                       group-hover:w-auto group-hover:opacity-100 group-hover:text-white"
          >
            Ask AI
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="fixed bottom-28 right-8 w-full h-full max-h-[60vh] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Chat with AI Assistant</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col gap-2 ${
                msg.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-sm whitespace-pre-wrap break-words ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p>{msg.content}</p>
              </div>
              {msg.role === "assistant" &&
                msg.sources &&
                msg.sources.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-muted-foreground">
                      Sources:
                    </span>
                    {msg.sources.map((source, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full bg-muted-foreground/20"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center gap-2 p-4 border-t">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !isLoading && handleSendMessage()
            }
            placeholder="Ask about patient records..."
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            className="px-4"
            disabled={isLoading || !input.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
