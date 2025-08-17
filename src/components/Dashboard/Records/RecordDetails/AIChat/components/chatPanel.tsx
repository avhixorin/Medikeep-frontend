import { useEffect, useRef } from "react";
import { ChatEmptyState } from "./chatEmptyState";
import { ChatMessage } from "./chatMessage";
import { ChatInput } from "./chatInput";
import { AiChatThread } from "@/redux/features/aiChatSlice";
import { TypingIndicator } from "./typingIndicator";

// A placeholder component to show when no chat is selected.
const SelectChatPlaceholder = () => (
  <main className="flex-1 flex items-center justify-center h-full text-muted-foreground">
    <div className="text-center">
      <p>Select a conversation</p>
      <p className="text-sm">or start a new one to begin chatting.</p>
    </div>
  </main>
);

export const ChatPanel = ({
  thread,
  isLoading,
  onSendMessage,
}: {
  thread: AiChatThread | null | undefined;
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread?.chatThread]);

  if (!thread) {
    return <SelectChatPlaceholder />;
  }

  const hasMessages = thread.chatThread && thread.chatThread.length > 0;

  return (
    <main className="flex-1 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {!hasMessages ? (
            <ChatEmptyState />
          ) : (
            <div className="space-y-8">
              {thread.chatThread.map((msg) => (
                <ChatMessage key={msg._id} msg={msg} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-background/80 backdrop-blur-sm border-t border-border">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={onSendMessage} />
        </div>
      </div>
    </main>
  );
};
