import { PrivateMessage } from "@/types/types";
import React, { useState } from "react";

interface BubbleProps {
  msg: PrivateMessage;
  currentUserId: string; 
}

const Bubble: React.FC<BubbleProps> = ({ msg, currentUserId }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const isSentByCurrentUser = msg.sender._id === currentUserId;

  return (
    <div
      className={`flex items-start gap-2.5 ${
        isSentByCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isSentByCurrentUser && (
        <img
          src={msg.sender.profilePicture || "https://randomuser.me/api/portraits"}
          alt="Sender"
          className="w-8 h-8 rounded-full"
        />
      )}
      <div
        className={`flex flex-col gap-1 max-w-[320px] ${
          isSentByCurrentUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`flex flex-col leading-1.5 p-4 rounded-xl ${
            isSentByCurrentUser
              ? "bg-blue-500 text-white rounded-tr-none"
              : "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white rounded-tl-none"
          }`}
        >
          <p className="text-sm font-normal">{msg.message}</p>
        </div>
      </div>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 4 15"
          >
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </button>
        {isDropdownOpen && (
          <div
            className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <button
                  onClick={() => console.log("Reply")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Reply
                </button>
              </li>
              <li>
                <button
                  onClick={() => console.log("Forward")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Forward
                </button>
              </li>
              <li>
                <button
                  onClick={() => console.log("Copy")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Copy
                </button>
              </li>
              <li>
                <button
                  onClick={() => console.log("Report")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Report
                </button>
              </li>
              <li>
                <button
                  onClick={() => console.log("Delete")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bubble;
