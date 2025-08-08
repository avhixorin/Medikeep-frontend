import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Changed from Input to Textarea
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Sparkles, Send, User } from "lucide-react";

// For a truly auto-growing textarea like in ChatGPT,
// consider using a library like `react-textarea-autosize`.
// `npm install react-textarea-autosize`

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
  const [isOpen, setIsOpen] = useState(false); // Control drawer state

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset chat when the drawer is closed
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setInput("");
      setIsLoading(false);
    }
  }, [isOpen]);

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      {/* --- Trigger Button --- */}
      {/* Simplified to a cleaner, circular button */}
      <DrawerTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-8 right-8 z-50 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        >
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </Button>
      </DrawerTrigger>

      {/* --- Drawer Content --- */}
      {/* Styled to be larger and more modal-like */}
      <DrawerContent className="h-[85vh] fixed bottom-0 left-0 right-0">
        <div className="mx-auto w-full max-w-2xl h-full flex flex-col">
          <DrawerHeader>
            <DrawerTitle>AI Assistant</DrawerTitle>
          </DrawerHeader>

          {/* --- Chat Message Area --- */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <span className="flex-shrink-0 rounded-full bg-muted h-8 w-8 items-center justify-center flex">
                  {msg.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Sparkles className="h-4 w-4 text-primary" />
                  )}
                </span>
                
                <div className="flex flex-col gap-1">
                    {/* Message Bubble */}
                    <div
                      className={`p-3 rounded-lg max-w-md whitespace-pre-wrap break-words ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <p>{msg.content}</p>
                    </div>

                    {/* Sources */}
                    {msg.role === "assistant" &&
                      msg.sources &&
                      msg.sources.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {msg.sources.map((source, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs rounded-full bg-muted-foreground/10 text-muted-foreground"
                            >
                              {source}
                            </span>
                          ))}
                        </div>
                      )}
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 rounded-full bg-muted h-8 w-8 items-center justify-center flex">
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                </span>
                <div className="p-3 rounded-lg bg-muted text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* --- Input Area --- */}
          {/* Changed to a Textarea with a form for better UX and accessibility */}
          <DrawerFooter>
            <form onSubmit={handleFormSubmit} className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask anything..."
                disabled={isLoading}
                className="pr-12 resize-none" // `resize-none` is important
                rows={1} // Start with one row
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-3 bottom-2.5"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};