import React, { useState, useEffect, useRef } from "react";
import ChatCard from "./ChatCard";
import "../../../index.css";
import { Users } from "lucide-react";
import Bubble from "./Chatbubble/Bubble";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSockets from "@/hooks/useSockets";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import useAllUsers from "@/hooks/useAllUsers";
import SearchBox from "./SearchBox/SearchBox";

const randomNames = [
  "Dr. Jane Doe",
  "Dr. John Smith",
  "Dr. Emily Johnson",
  "Dr. Michael Brown",
  "Dr. Sarah Davis",
  "Dr. David Wilson",
  "Dr. Lisa Miller",
  "Dr. James Garcia",
  "Dr. Mary Martinez",
  "Dr. Robert Hernandez",
];

const randomImages = [
  "https://randomuser.me/api/portraits/women/48.jpg",
  "https://randomuser.me/api/portraits/women/49.jpg",
  "https://randomuser.me/api/portraits/women/50.jpg",
  "https://randomuser.me/api/portraits/women/46.jpg",
  "https://randomuser.me/api/portraits/women/52.jpg",
  "https://randomuser.me/api/portraits/men/43.jpg",
  "https://randomuser.me/api/portraits/men/44.jpg",
  "https://randomuser.me/api/portraits/men/45.jpg",
  "https://randomuser.me/api/portraits/men/46.jpg",
  "https://randomuser.me/api/portraits/men/47.jpg",
];

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const Chat: React.FC = () => {
  const [isOnline] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const socket = useSockets();
  const { allUsers } = useSelector((state:RootState) => state);
  const { fetchAllUsers } = useAllUsers();
  if(allUsers.users.length == 0){
    fetchAllUsers();
  }
  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", { roomId: "12345" });

      socket.on("message", (data) => {
        console.log("Received message:", data);
        setChatHistory((prev) => [...prev, data.message]);
      });

      return () => {
        socket.off("message");
      };
    }
  }, [socket]);

  const handleSendMessage = () => {
    if (message.trim() === "" || !socket) return;

    const newMessage = message.trim();
    socket.emit("sendMessage", { message: newMessage, roomId: "12345" });

    setChatHistory((prev) => [...prev, newMessage]);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#fffcf8] dark:bg-[#141414] p-8">
      {
        isSearching && <SearchBox setIsSearching={setIsSearching} />
      }

      {/* Connections Section */}
      <div className="h-[25%] w-full flex flex-col justify-start gap-6">
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <h1 className="text-2xl font-semibold text-zinc-700 dark:text-gray-200">
              Connections
            </h1>
            <Users
              size={24}
              className="stroke-[#3f3f46] dark:stroke-gray-200"
            />
          </div>
          <button
            className="bg-green-500 dark:bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 dark:hover:bg-green-800"
            onClick={() => setIsSearching(true)}
          >
            Add Connections
          </button>
        </div>

        <div className="w-full flex justify-start items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-webkit">
          {randomImages.map((imgSrc) => (
            <img
              key={imgSrc}
              src={imgSrc}
              alt=""
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="h-full w-full bg-[#fbf1e3] rounded-md flex overflow-hidden shadow-xl">
        {/* Sidebar */}
        <aside className="h-full w-64 md:w-72 bg-white dark:bg-[#1A1A1D] flex flex-col justify-start overflow-y-auto scrollbar-webkit">
          {Array.from({ length: 10 }).map((_, index) => (
            <ChatCard
              key={index}
              name={randomNames[getRandomInt(randomNames.length)]}
              imgSrc={randomImages[getRandomInt(randomImages.length)]}
            />
          ))}
        </aside>

        {/* Main Chat */}
        <main className="flex flex-col h-full w-full">
          {/* Header */}
          <header className="w-full py-2 px-4 flex items-center justify-between bg-[#00A884] dark:bg-[#212121] text-slate-200">
            <div className="flex gap-6 items-center">
              <img
                src="https://randomuser.me/api/portraits/women/48.jpg"
                className="rounded-full w-10 h-10"
                alt=""
              />
              <h3 className="font-medium text-lg">{randomNames[0]}</h3>
            </div>
            <h3 className={isOnline ? "text-[#d7d0d0]" : "text-slate-400"}>
              {isOnline ? "Active now" : "Last online: 12:53 AM"}
            </h3>
          </header>

          {/* Chat Messages */}
          <div
            className="flex-grow w-full overflow-y-auto p-4 scrollbar-webkit dark:bg-[#1e0e1a]"
            ref={chatContainerRef}
          >
            {chatHistory.map((msg, index) => (
              <div key={index} className="flex justify-end mb-2">
                <Bubble message={msg} />
              </div>
            ))}
          </div>

          {/* Input Section */}
          <footer className="w-full py-2 px-4 flex items-center gap-2 bg-[#00A884] text-slate-200 dark:bg-[#0A0A0A]">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-10 bg-transparent text-white placeholder-white border-none outline-none dark:text-gray-200 dark:placeholder-gray-500"
            />
            <Button
              onClick={handleSendMessage}
              className="dark:bg-[#212121] dark:text-gray-200 dark:hover:bg-[#2d2d2d] dark:hover:text-gray-300"
            >
              Send
            </Button>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Chat;

