import React, { useMemo } from "react";
import { MessageSquare, Plus, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils"; 
import { AiChatThread } from "@/redux/features/aiChatSlice";

const ChatItem = ({ thread, isActive, onClick }: { thread: AiChatThread; isActive: boolean; onClick: (id: string) => void; }) => (
  <button
    onClick={() => onClick(thread._id!)}
    className={cn(
      "flex items-center gap-3 p-2 rounded-md transition-colors text-sm w-full text-left truncate",
      "hover:bg-accent hover:text-foreground",
      isActive
        ? "bg-accent text-accent-foreground"
        : "text-muted-foreground"
    )}
  >
    <MessageSquare className="h-4 w-4 flex-shrink-0" />
    <span className="flex-1 truncate">{thread.title}</span>
  </button>
);

const SidebarSkeleton = () => (
  <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2 animate-pulse">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-9 w-full bg-muted rounded-md" />
    ))}
  </div>
);


interface SidebarProps {
  threads: AiChatThread[];
  activeThread: AiChatThread | null;
  onSelectThread: (id: string) => void;
  onNewChat: () => void;
  isLoading: boolean;
  isError: boolean;
}

export const Sidebar = ({ threads, activeThread, onSelectThread, onNewChat, isLoading, isError }: SidebarProps) => {
  const sortedThreads = useMemo(() => {
    if (!threads) return [];
    return [...threads].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [threads]);

  const renderContent = () => {
    if (isLoading) {
      return <SidebarSkeleton />;
    }

    if (isError) {
      return (
        <div className="p-4 text-center text-destructive">
          <AlertTriangle className="mx-auto h-8 w-8 mb-2" />
          <p className="text-sm">Failed to load chats.</p>
        </div>
      );
    }

    if (sortedThreads.length === 0) {
      return (
        <div className="p-4 text-center text-muted-foreground">
          <p className="text-sm">No chats available. Start a new conversation!</p>
        </div>
      );
    }

    return (
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {sortedThreads.map((chat) => (
          <ChatItem
            key={chat._id}
            thread={chat}
            isActive={chat._id === activeThread?._id}
            onClick={onSelectThread}
          />
        ))}
      </nav>
    );
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-muted/30 border-r border-border flex flex-col h-full">
      <div className="p-3">
        <button
          onClick={onNewChat}
          className="flex items-center justify-between w-full border border-border rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
        >
          <span>New Chat</span>
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {renderContent()}
    </aside>
  );
};