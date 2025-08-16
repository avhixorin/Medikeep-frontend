import React from "react";
import { Sparkles, User, FileText } from "lucide-react";

const SourceTag = ({ label }: { label: string }) => (
  <button
    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full 
               text-muted-foreground border border-border/60 bg-background/50 hover:bg-accent transition-colors cursor-pointer"
  >
    <FileText className="h-3 w-3" />
    {label}
  </button>
);

export const ChatMessage = ({
  msg,
}: {
  msg: any /* Replace with Message type */;
}) => {
  const isUser = msg.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex items-start gap-3 max-w-xl animate-fade-in-up ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`flex-shrink-0 rounded-full h-8 w-8 flex items-center justify-center shadow-sm ${
            isUser ? "bg-muted" : "bg-primary/10"
          }`}
        >
          {isUser ? (
            <User className="h-4 w-4 text-foreground" />
          ) : (
            <Sparkles className="h-4 w-4 text-primary" />
          )}
        </div>
        <div
          className={`flex flex-col gap-2 ${
            isUser ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`p-3 rounded-2xl whitespace-pre-wrap break-words shadow-sm ${
              isUser
                ? "bg-primary text-primary-foreground rounded-br-lg"
                : "bg-muted text-foreground rounded-bl-lg"
            }`}
          >
            {msg.content}
          </div>
          {msg.role === "assistant" &&
            msg.sources &&
            msg.sources.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {msg.sources.map((source: string, i: number) => (
                  <SourceTag key={`${msg.id}-src-${i}`} label={source} />
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
