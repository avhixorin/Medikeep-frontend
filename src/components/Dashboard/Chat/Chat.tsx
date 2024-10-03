import React, { useState, useEffect, useRef } from "react";
import ChatCard from "./ChatCard";
import "../../../index.css";
import { Users } from "lucide-react";
import Bubble from "./Chatbubble/Bubble";

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
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (message.trim() === "") return; // Prevent empty messages
    setChatHistory([...chatHistory, message]);
    setMessage(""); // Clear input field after sending
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#fffcf8] p-8">
      <div className="h-[25%] w-full flex flex-col justify-start gap-6">
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <h1 className="text-2xl font-semibold text-zinc-700">Connections</h1>
            <Users size={24} stroke="#3f3f46" />
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Add Connections
          </button>
        </div>

        <div className="w-full flex justify-start items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-webkit">
          {randomImages.slice(0, 10).map((imgSrc) => (
            <img
              key={imgSrc}
              src={imgSrc}
              alt=""
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          ))}
        </div>
      </div>

      <div className="h-full w-full bg-[#fbf1e3] rounded-md flex overflow-hidden shadow-xl">
        {/* Set a fixed width for the aside section */}
        <aside className="h-full w-64 md:w-72 bg-white flex flex-col justify-start overflow-y-auto scrollbar-webkit">
          {Array.from({ length: 10 }).map((_, index) => (
            <ChatCard
              key={index}
              name={randomNames[getRandomInt(randomNames.length)]}
              imgSrc={randomImages[getRandomInt(randomImages.length)]}
            />
          ))}
        </aside>

        <main className="flex flex-col h-full w-full">
          {/* Header */}
          <header className="w-full py-2 px-4 flex items-center justify-between bg-[#00A884] text-slate-200">
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

          {/* Chat area */}
          <div
            className="flex-grow w-full overflow-y-auto p-4 scrollbar-webkit"
            ref={chatContainerRef}
          >
            {chatHistory.map((msg, index) => (
              <div key={index} className="flex justify-end mb-2">
                <Bubble message={msg} />
              </div>
            ))}
          </div>

          {/* Footer */}
          <footer className="w-full py-2 px-4 flex items-center gap-2 bg-[#00A884] text-slate-200">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-grow py-2 px-4 rounded-lg bg-slate-100 text-slate-900"
            />
            <button
              onClick={handleSendMessage}
              className="bg-white text-[#00A884] px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Chat;