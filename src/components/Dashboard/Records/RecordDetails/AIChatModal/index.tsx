"use client";

import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import AutoResizeTextarea from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Sparkles, Send, User } from "lucide-react";
import styles from "./ai-chat-modal.module.css";
import { useSocket } from "@/sockets/context";
import { AI_SOCKET_EVENTS } from "@/constants/socketEvents";

type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  content: string;
  sources?: string[];
}

export interface AiChatModalProps {
  entityId: string;
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <span className="flex-shrink-0 rounded-full bg-muted h-8 w-8 items-center justify-center flex">
        <Sparkles className="h-4 w-4 text-primary" />
      </span>
      <div
        aria-live="polite"
        className={clsx(
          "p-3 rounded-2xl bg-muted/70 text-muted-foreground flex items-center gap-1 border border-border/50 shadow-sm",
          "backdrop-blur-sm"
        )}
      >
        <span className={clsx(styles.typingDot)} />
        <span className={clsx(styles.typingDot, styles.dotDelay1)} />
        <span className={clsx(styles.typingDot, styles.dotDelay2)} />
      </div>
    </div>
  );
}

function SourceTag({ label }: { label: string }) {
  return (
    <span
      data-tooltip={`Source: ${label}`}
      className={clsx(
        "relative inline-flex items-center px-2.5 py-1 text-xs rounded-full transition-colors",
        "text-muted-foreground border border-border/40 shadow-sm",
        styles.sourcePill
      )}
      role="note"
      aria-label={`Source: ${label}`}
      title={`Source: ${label}`}
    >
      {label}
    </span>
  );
}

function MessageBubble({
  msg,
  highlight,
}: {
  msg: Message;
  highlight?: boolean;
}) {
  const isUser = msg.role === "user";
  return (
    <div
      className={clsx(
        "flex items-start gap-3",
        isUser ? "flex-row-reverse" : "flex-row",
        styles.messageEnter,
        isUser ? styles.fromRight : styles.fromLeft
      )}
      role="group"
      aria-label={isUser ? "User message" : "Assistant message"}
    >
      <span className="flex-shrink-0 rounded-full bg-muted h-8 w-8 items-center justify-center flex shadow-sm">
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Sparkles className="h-4 w-4 text-primary" />
        )}
        <span className="sr-only">{isUser ? "User" : "Assistant"}</span>
      </span>
      <div className="flex flex-col gap-1 max-w-[80%] md:max-w-[75%]">
        <div
          className={clsx(
            "p-3 rounded-2xl shadow-sm whitespace-pre-wrap break-words border",
            isUser
              ? "text-primary-foreground border-transparent"
              : "text-muted-foreground bg-muted/70 border-border/50 backdrop-blur-sm",
            isUser ? styles.userBubble : styles.assistantBubble,
            highlight && styles.assistantFlash
          )}
        >
          {msg.content}
        </div>
        {msg.role === "assistant" && msg.sources && msg.sources.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {msg.sources.map((source, i) => (
              <SourceTag key={`${msg.id}-src-${i}`} label={source} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const AiChatModal: React.FC<AiChatModalProps> = ({ entityId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [highlightIds, setHighlightIds] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { socket } = useSocket();
  const canSend = useMemo(
    () => !!input.trim() && !isLoading,
    [input, isLoading]
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setInput("");
      setIsLoading(false);
      setHighlightIds(new Set());
    }
  }, [isOpen]);

  const makeId = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  // const flashMessage = (id: string) => {
  //   setHighlightIds((prev) => new Set(prev).add(id));
  //   // Remove flash after animation duration
  //   setTimeout(() => {
  //     setHighlightIds((prev) => {
  //       const next = new Set(prev);
  //       next.delete(id);
  //       return next;
  //     });
  //   }, 900);
  // };

  const handleSendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = { id: makeId(), role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    console.log("Emitting message: ", trimmed);
    socket?.emit(AI_SOCKET_EVENTS.NEW_AI_MESSAGE, {
      message: trimmed,
      to: entityId,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          size="icon"
          aria-label="Open AI Assistant"
          className={clsx(
            "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-xl",
            "bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105",
            !isOpen && styles.glowLoop
          )}
        >
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-[85vh] max-h-[85vh] fixed bottom-0 left-0 right-0 border-t border-border bg-background">
        <div className="mx-auto w-full max-w-2xl h-full flex flex-col">
          <DrawerHeader className="border-b border-border pb-3">
            <DrawerTitle className="flex items-center gap-2 text-lg font-semibold">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>AI Assistant</span>
            </DrawerTitle>
          </DrawerHeader>

          <div
            className="flex-1 overflow-y-auto p-4 space-y-4"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                msg={msg}
                highlight={highlightIds.has(msg.id)}
              />
            ))}

            {isLoading && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          <DrawerFooter className="border-t border-border pt-3 pb-6 px-4">
            <form
              onSubmit={handleFormSubmit}
              className="relative flex items-end"
            >
              <AutoResizeTextarea
                aria-label="Type your message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className={clsx(
                  "w-full resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-primary",
                  "pr-16" // ensure space for the send button
                )}
                minRows={1}
                maxRows={6}
              />

              <Button
                type="submit"
                size="icon"
                aria-label="Send message"
                className={clsx(
                  "absolute right-2 bottom-1 transition-transform duration-300",
                  "h-8 w-8 rounded-full shadow-sm",
                  canSend
                    ? clsx("bg-primary hover:bg-primary/90", styles.sendWave)
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
                disabled={!canSend}
              >
                <Send className="h-2 w-2" />
              </Button>
            </form>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

// Default props for Next.js previews
AiChatModal.defaultProps = {
  entityId: "demo-entity",
};

export default AiChatModal;
