import React, { useState, useEffect, useRef } from "react";
import ChatCard from "./ChatCard";
import { Users } from "lucide-react";
import Bubble from "./Chatbubble/Bubble";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSockets from "@/hooks/useSockets";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import useAllUsers from "@/hooks/useAllUsers";
import SearchBox from "./SearchBox/SearchBox";
import ManageConnections from "./ManageConnections/ManageConnections";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { addMyMessage } from "@/redux/features/messageSlice";
import { v4 as uuid } from "uuid";
import { setSelectedUser } from "@/redux/features/selectedUserSlice";

const Chat: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isManagingConnections, setIsManagingConnections] = useState(false);
  const [message, setMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { socket } = useSockets();
  const { user } = useSelector((state: RootState) => state.auth);
  const { allUsers } = useSelector((state: RootState) => state);
  const selectedUser = useSelector((state: RootState) => state.selectedUser.selectedUser);
  const { fetchAllUsers } = useAllUsers();
  const messages = useSelector((state: RootState) =>
    selectedUser?._id && state.messages.chatHistories ? state.messages.chatHistories[selectedUser._id] || [] : []
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, selectedUser]);
  useEffect(() => {
      if (allUsers?.users?.length === 0) {
         fetchAllUsers();
      }
  }, [allUsers, fetchAllUsers]);

  const handleSendMessage = () => {
    if (!message.trim() || !socket || !selectedUser) return;
    const messageId = uuid();
    console.log("Adding my message to the store", message, messageId);
    dispatch(addMyMessage({ message, to: selectedUser, messageId, sender: user! }));
    socket.emit(SOCKET_EVENTS.PRIVATE_MESSAGE, {
      message: message.trim(),
      sender: user?._id,
      receiver: selectedUser._id,
      messageId,
    });
    setMessage("");
    console.log("The messages of the in the user are", user?.messages);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#fffcf8] dark:bg-[#141414] p-8">
      {/* Connection Management */}
      {isManagingConnections && (
        <ManageConnections
          setIsManagingConnections={setIsManagingConnections}
        />
      )}
      {isSearching && <SearchBox setIsSearching={setIsSearching} />}

      {/* Connections Section */}
      <div className="h-[25%] w-full flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-zinc-700 dark:text-gray-200">
              Connections
            </h1>
            <Users
              size={24}
              className="stroke-[#3f3f46] dark:stroke-gray-200"
            />
          </div>
          <div className="flex gap-2">
            <button
              className="bg-green-500 dark:bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 dark:hover:bg-green-800"
              onClick={() => setIsManagingConnections(true)}
            >
              Manage Connection Requests
            </button>
            <button
              className="bg-green-500 dark:bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 dark:hover:bg-green-800"
              onClick={() => setIsSearching(true)}
            >
              Add Connections
            </button>
          </div>
        </div>

        <div className="flex gap-6 whitespace-nowrap flex-wrap">
          {user?.connections?.map((connUser) => (
            <img
              key={connUser._id}
              src={
                connUser.profilePicture || "https://randomuser.me/api/portraits"
              }
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => dispatch(setSelectedUser(connUser))}
            />
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="h-full w-full bg-[#fbf1e3] rounded-md flex shadow-xl overflow-hidden">
        {/* Sidebar */}
        <aside className="h-full w-64 md:w-72 bg-white dark:bg-[#1A1A1D] flex flex-col overflow-y-auto scrollbar-webkit">
          {user?.connections?.map((connUser) => (
            <ChatCard
              key={connUser._id}
              user={connUser}
            />
          ))}
        </aside>

        {/* Main Chat */}
        <main className="flex flex-col h-full w-full">
          {selectedUser ? (
            <>
              {/* Header */}
              <header className="w-full py-2 px-4 flex items-center justify-between bg-[#00A884] dark:bg-[#212121] text-slate-200">
                <div className="flex items-center gap-6">
                  <img
                    src={
                      selectedUser.profilePicture ||
                      "https://randomuser.me/api/portraits"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <h3 className="font-medium text-lg">
                    {selectedUser.username}
                  </h3>
                </div>
                <h3 className="text-slate-400">Active now</h3>
              </header>

              {/* Chat Messages */}
              <div
                ref={chatContainerRef}
                className="flex-grow p-4 overflow-y-auto scrollbar-webkit dark:bg-[#1e0e1a]"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.messageId}
                    className={`flex ${msg.sender._id === user?._id ? "justify-end" : "justify-start"} mb-2`}
                  >
                    <Bubble currentUserId={user?._id || ""} msg={msg} />
                  </div>
                ))}
              </div>

              {/* Input Section */}
              <footer className="w-full py-2 px-4 flex gap-2 border-t-2 dark:border-gray-800 bg-transparent dark:bg-[#0A0A0A]">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-grow bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-200 border-none outline-none"
                />
                <Button
                  onClick={handleSendMessage}
                  className="dark:bg-[#212121] dark:text-gray-200"
                >
                  Send
                </Button>
              </footer>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Select a user to start chatting
              </h1>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Chat;
