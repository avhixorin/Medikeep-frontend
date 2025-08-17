import { useEffect, useRef } from "react";
import { ChatEmptyState } from "./chatEmptyState";
import { ChatMessage } from "./chatMessage";
import { ChatInput } from "./chatInput";
import { TypingIndicator } from "./typingIndicator";
import { useFetchAiChatThread } from "@/components/Dashboard/hooks/dataHooks";

const SelectChatPlaceholder = () => (
  <main className="flex-1 flex items-center justify-center h-full text-muted-foreground">
    <div className="text-center">
      <p>Select a conversation</p>
      <p className="text-sm">or start a new one to begin chatting.</p>
    </div>
  </main>
);

const ChatLoadingSkeleton = () => (
  <main className="flex-1 flex flex-col h-full p-6">
    <div className="max-w-4xl mx-auto w-full space-y-8 animate-pulse">
      <div className="flex items-end justify-end">
        <div className="h-10 w-2/5 bg-muted rounded-lg"></div>
      </div>

      <div className="flex items-end">
        <div className="h-16 w-3/5 bg-muted rounded-lg"></div>
      </div>
      <div className="flex items-end justify-end">
        <div className="h-8 w-1/3 bg-muted rounded-lg"></div>
      </div>
    </div>
  </main>
);

const ChatErrorState = ({ message }: { message: string }) => (
  <main className="flex-1 flex items-center justify-center h-full text-destructive">
    <div className="text-center">
      <p className="font-semibold">Something went wrong</p>
      <p className="text-sm">
        {message || "Failed to load the conversation. Please try again."}
      </p>
    </div>
  </main>
);

export const ChatPanel = ({
  threadId,
  isLoading,
  onSendMessage,
}: {
  threadId: string;
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}) => {
  const { data: thread, error } = useFetchAiChatThread(threadId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread?.chatThread]);

  if (!threadId) {
    return <SelectChatPlaceholder />;
  }

  if (isLoading) {
    return <ChatLoadingSkeleton />;
  }

  if (error) {
    return <ChatErrorState message={error.message} />;
  }

  if (!thread) {
    return <ChatEmptyState />;
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
