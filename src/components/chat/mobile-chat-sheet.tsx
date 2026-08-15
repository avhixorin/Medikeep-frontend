import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useSocketEmitters } from '@/hooks';
import { useAuthStore } from '@/stores/authStore';
import { useChatStore } from '@/stores/chatStore';
import { useVideoCall } from '@/components/video-call/video-call-context';
import type { ChatConversation } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCheck,
  ImageIcon,
  MoreVertical,
  Paperclip,
  Phone,
  Send,
  Smile,
  Video,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function MobileChatSheet({
  open,
  conversation,
  online,
  onClose,
}: {
  open: boolean;
  conversation: ChatConversation | null;
  online: boolean;
  onClose: () => void;
}) {
  const { user } = useAuthStore();
  const { sendMessage } = useSocketEmitters();
  const { markAsRead } = useChatStore();
  const { startCall } = useVideoCall();
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && conversation) {
      markAsRead(conversation.friendId);
      setMessageInput('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, conversation?.friendId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.chatHistory.length, open]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !conversation || !user) return;

    const messageId = Date.now().toString();
    const message = messageInput.trim();

    sendMessage(user._id, conversation.friendId, message, messageId);

    useChatStore
      .getState()
      .addMessage(conversation.friendId, {
        messageId,
        message,
        sender: user._id,
        timestamp: new Date().toISOString(),
      });

    setMessageInput('');
  };

  const name = conversation
    ? `${conversation.friend?.firstName ?? ''} ${conversation.friend?.lastName ?? ''}`.trim() || 'Unknown'
    : '';

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 gap-0">
        {conversation && (
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="h-16 shrink-0 bg-white dark:bg-slate-900 border-b px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={onClose} aria-label="Back to conversations">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={conversation.friend?.profilePicture} />
                  <AvatarFallback className="bg-primary/15 text-primary">
                    {conversation.friend?.firstName?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{name}</h3>
                  <p className="text-xs text-slate-500">{online ? 'Online' : 'Offline'}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (conversation.friend) {
                      startCall(conversation.friendId, conversation.friend, true);
                    }
                  }}
                  aria-label="Start audio call"
                >
                  <Phone className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary"
                  onClick={() => {
                    if (conversation.friend) {
                      startCall(conversation.friendId, conversation.friend, false);
                    }
                  }}
                  aria-label="Start video call"
                >
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
              <AnimatePresence>
                {conversation.chatHistory.map((message, index) => {
                  const isMe = message.sender === user?._id;
                  const showAvatar =
                    index === 0 ||
                    conversation.chatHistory[index - 1]?.sender !== message.sender;

                  return (
                    <motion.div
                      key={message.messageId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex items-end gap-2 max-w-[75%] ${isMe ? 'flex-row-reverse' : ''}`}
                      >
                        {showAvatar && !isMe && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/15 text-primary text-xs">
                              {conversation.friend?.firstName?.[0] || 'U'}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            isMe
                              ? 'bg-primary text-primary-foreground rounded-br-none'
                              : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-bl-none shadow-sm'
                          }`}
                        >
                          <p className="text-sm break-words">{message.message}</p>
                          <div
                            className={`flex items-center gap-1 mt-1 ${isMe ? 'justify-end' : ''}`}
                          >
                            {message.timestamp && (
                              <span
                                className={`text-xs ${
                                  isMe ? 'text-primary-foreground/70' : 'text-slate-400'
                                }`}
                              >
                                {new Date(message.timestamp).toLocaleTimeString('en-US', {
                                  hour: 'numeric',
                                  minute: '2-digit',
                                })}
                              </span>
                            )}
                            {isMe && (
                              <CheckCheck className="h-3 w-3 text-primary-foreground/70" />
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="shrink-0 bg-white dark:bg-slate-900 border-t p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5 text-slate-500" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ImageIcon className="h-5 w-5 text-slate-500" />
                </Button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 h-10 px-4 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5 text-slate-500" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  size="icon"
                  className="rounded-full"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
