// Sidebar.jsx

import React from "react";
import { MessageSquare, Plus } from "lucide-react";

const mockRecentChats = [
  { id: "1", title: "Patient History Analysis" },
  { id: "2", title: "Symptom Checker Query" },
  { id: "3", title: "Medication Information" },
];

export const Sidebar = () => {
  const activeChatId = "1"; // Example

  return (
    // Key Fix: `flex flex-col` ensures items stack vertically and `h-full` makes it tall.
    <aside className="w-64 flex-shrink-0 bg-muted/30 border-r border-border flex flex-col h-full">
      <div className="p-3">
        <button className="flex items-center justify-between w-full border border-border rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors">
          <span>New Chat</span>
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {mockRecentChats.map((chat) => (
          <a
            key={chat.id}
            href="#"
            className={`flex items-center gap-3 p-2 rounded-md transition-colors text-sm truncate ${
              activeChatId === chat.id
                ? "bg-primary/10 text-primary font-semibold"
                : "hover:bg-accent text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageSquare className="h-4 w-4 flex-shrink-0" />
            <span className="flex-1 truncate">{chat.title}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};
