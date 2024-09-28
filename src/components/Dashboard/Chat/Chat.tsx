import React from "react";
import ChatCard from "./ChatCard";
import '../../../index.css';

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
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#fffcf8] p-10">
      <div className="h-[35%] w-full flex flex-col justify-start gap-6">
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <p>September 27, 2024</p>

        <div className="w-full flex justify-start items-center gap-6">
          {randomImages.slice(0, 5).map((imgSrc) => (
            <img key={imgSrc} src={imgSrc} alt="" className="w-10 h-10 rounded-full" />
          ))}
        </div>
      </div>

      <div className="h-full w-full bg-[#fbf1e3] rounded-md flex gap-3 overflow-hidden shadow-xl">

        {/* Set a fixed width for the aside section */}
        <aside className="h-full w-64 md:w-72 bg-white flex flex-col justify-start overflow-y-scroll scrollbar-hidden">

          {Array.from({ length: 10 }).map((_, index) => (
            <ChatCard
              key={index}
              name={randomNames[getRandomInt(randomNames.length)]}
              imgSrc={randomImages[getRandomInt(randomImages.length)]}
            />
          ))}
        </aside>

        <main className="flex-grow h-full grid place-content-center">
          <h1>This is my main content</h1>
        </main>
      </div>
    </div>
  );
};

export default Chat;
