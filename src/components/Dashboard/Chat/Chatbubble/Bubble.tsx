import { PrivateMessage } from "@/types/types";
import React from "react";

interface BubbleProps {
  msg: PrivateMessage;
  currentUserId: string;
}

const Bubble: React.FC<BubbleProps> = ({ msg, currentUserId }) => {
  const isSentByCurrentUser = msg.sender._id === currentUserId;

  return (
    <div
      className={`chat ${
        isSentByCurrentUser ? "chat-end" : "chat-start"
      }`}
    >
      <div
        className={`chat-bubble ${
          isSentByCurrentUser
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
        }`}
      >
        {msg.message}
      </div>
    </div>
  );
};

export default Bubble;
