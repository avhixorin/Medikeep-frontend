import { useEffect, useRef } from "react";
import { ChatEmptyState } from "./chatEmptyState";
import { ChatMessage } from "./chatMessage";
import { TypingIndicator } from "./typingIndicator";
import { ChatInput } from "./chatInput";


export const ChatPanel = ({ messages, isLoading, input, setInput, handleSendMessage }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    // Key Fix: `flex flex-col` and `h-full` structure the panel correctly.
    <main className="flex-1 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 && !isLoading ? (
            <ChatEmptyState />
          ) : (
            <div className="space-y-8">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} msg={msg} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-background/80 backdrop-blur-sm border-t border-border">
        <div className="max-w-4xl mx-auto">
          <ChatInput
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            handleSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </main>
  );
};