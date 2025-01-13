import React, { useState, useEffect, useRef } from "react";
import ChatCard from "./ChatCard";
import { Bell, BellDotIcon, MenuIcon, Video, VideoOff } from "lucide-react";
import Bubble from "./Chatbubble/Bubble";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSockets from "@/hooks/useSockets";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import SearchBox from "./SearchBox/SearchBox";
import ManageConnections from "./ManageConnections/ManageConnections";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { addMyMessage } from "@/redux/features/messageSlice";
import { v4 as uuid } from "uuid";
import { setSelectedUser } from "@/redux/features/selectedUserSlice";
import NotificationDrawer from "../Notifications/NotificationDrawer";
import { User } from "@/types/types";
import Swal from "sweetalert2";
import VideoCallScreen from "./VideoCallScreen/VideoCallScreen";
import toast from "react-hot-toast";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { format } from "date-fns";
const Chat: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isManagingConnections, setIsManagingConnections] = useState(false);
  const [isVideoCalling, setIsVideoCalling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [activeFriends, setActiveFriends] = useState<User[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { socket } = useSockets();
  const { user } = useSelector((state: RootState) => state.auth);
  const selectedUser = useSelector(
    (state: RootState) => state.selectedUser.selectedUser
  );
  const messages = useSelector((state: RootState) =>
    selectedUser?._id && state.messages.chatHistories
      ? state.messages.chatHistories[selectedUser._id] || []
      : []
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, selectedUser]);

  const handleSendMessage = () => {
    if (!message.trim() || !socket || !selectedUser) return;
    const messageId = uuid();
    dispatch(
      addMyMessage({ message, to: selectedUser, messageId, sender: user! })
    );
    socket.emit(SOCKET_EVENTS.PRIVATE_MESSAGE, {
      message: message.trim(),
      sender: user?._id,
      receiver: selectedUser._id,
      messageId,
    });
    setMessage("");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  useEffect(() => {
    if (socket) {
      socket.emit(SOCKET_EVENTS.GET_ONLINE_FRIENDS, user?._id);
    }
    socket?.on(
      SOCKET_EVENTS.GET_ONLINE_FRIENDS,
      (data: { statusCode: number; message: string; data: User[] }) => {
        setActiveFriends(data.data);
      }
    );

    return () => {
      socket?.off(SOCKET_EVENTS.GET_ONLINE_FRIENDS);
    };
  }, [socket, user]);

  const getUserStatus = (userId: string) => {
    return activeFriends.find((user) => user._id === userId)
      ? "Active now"
      : `Last seen: ${format(user?.lastSeen ?? new Date(), "p")}`;
  };

  const handleVideoCall = async () => {
    const result = await Swal.fire({
      title: "Video Call",
      text: `Do you want to start a video call with ${selectedUser?.username}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Start Call",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      setIsVideoCalling(true);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-transparent dark:bg-[#141414] p-6 gap-4">
      {isManagingConnections && (
        <ManageConnections
          setIsManagingConnections={setIsManagingConnections}
        />
      )}
      {isVideoCalling && (
        <VideoCallScreen
          setIsVideoCalling={setIsVideoCalling}
          selectedUser={selectedUser!}
          caller={"self"}
        />
      )}
      {isSearching && <SearchBox setIsSearching={setIsSearching} />}
      {isOpen && <NotificationDrawer setIsOpen={setIsOpen} />}
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="max-md:w-full flex justify-between md:justify-normal items-start md:items-center gap-3 relative">
            <h1 className="text-lg md:text-2xl font-semibold text-zinc-700 dark:text-gray-200">
              Connections
            </h1>
            <MenuIcon
              className="md:hidden cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            <div
              className={`absolute top-12 right-0 bg-white dark:bg-[#1A1A1D] shadow-xl rounded-md p-2 w-48 transition-transform text-sm flex flex-col justify-evenly items-center space-y-2 duration-300 ${
                isMenuOpen ? "scale-100" : "scale-0"
              }`}
            >
              <button
                className="w-full dark:text-white text-black"
                onClick={() => {
                  setIsManagingConnections(true);
                  setIsMenuOpen(false);
                }}
              >
                Manage Requests
              </button>
              <button
                className="w-full dark:text-white text-black"
                onClick={() => {
                  setIsSearching(true);
                  setIsMenuOpen(false);
                }}
              >
                Add Connection
              </button>
              <button
                className="w-full dark:text-white text-black"
                onClick={() => {
                  setIsOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                Notifications
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Button
              className="w-full py-2 dark:bg-zinc-300 dark:hover:bg-white"
              onClick={() => setIsManagingConnections(true)}
            >
              Manage Connection Requests
            </Button>
            <Button
              className="w-full py-2 dark:bg-zinc-300 dark:hover:bg-white"
              onClick={() => setIsSearching(true)}
            >
              Add Connection
            </Button>
            {(user?.notifications?.length ?? 0) > 0 ? (
              <BellDotIcon
                size={58}
                className="stroke-[#3f3f46] hover:stroke-black dark:stroke-gray-200 dark:hover:stroke-white cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            ) : (
              <Bell
                size={58}
                className="stroke-[#3f3f46] hover:stroke-black dark:stroke-gray-200 dark:hover:stroke-white cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            )}
          </div>
        </div>

        <div className="md:flex gap-6 whitespace-nowrap flex-wrap hidden">
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

      {user?.connections && user?.connections.length > 0 ? (
  <div className="md:hidden w-full h-full">
    <Sheet>
      <SheetTrigger asChild>
        <button className="w-full text-left">
          <div className="h-full w-full rounded-t-lg bg-white dark:bg-[#1A1A1D] flex flex-col overflow-y-auto scrollbar-webkit">
            {user.connections.map((connUser) => (
              <ChatCard
                key={connUser._id}
                user={connUser}
                isActive={getUserStatus(connUser._id!) === "Active now"}
              />
            ))}
          </div>
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full h-full px-0">
        <main className="flex flex-col h-full pt-6 w-full dark:bg-[#1e0e1a]">
          {selectedUser ? (
            <>
              <header className="w-full py-3 px-4 flex items-center justify-between bg-[#00A884] dark:bg-[#212121] text-slate-200 border-l dark:border-l-slate-700">
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
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  {getUserStatus(selectedUser._id!) === "Active now" ? (
                    <button
                      onClick={handleVideoCall}
                      className="text-gray-200 p-3 rounded-full"
                    >
                      <Video className="w-6 h-6" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        toast.error("User is offline");
                      }}
                      className="text-gray-200 p-3 rounded-full"
                    >
                      <VideoOff className="w-6 h-6" />
                    </button>
                  )}

                  <h3
                    className={`${
                      getUserStatus(selectedUser._id!) === "Active now"
                        ? "text-gray-100"
                        : "text-gray-300"
                    }`}
                  >
                    {getUserStatus(selectedUser._id!)}
                  </h3>
                </div>
              </header>

              <div
                ref={chatContainerRef}
                className="flex-grow p-4 overflow-y-auto scrollbar-webkit dark:bg-[#1e0e1a]"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.messageId}
                    className={`flex ${
                      msg.sender._id === user?._id
                        ? "justify-end"
                        : "justify-start"
                    } mb-2`}
                  >
                    <Bubble currentUserId={user?._id || ""} msg={msg} />
                  </div>
                ))}
              </div>

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
              <h1 className="text-base md:text-xl font-semibold text-gray-800 dark:text-gray-200">
                Select a user to start chatting
              </h1>
            </div>
          )}
        </main>
      </SheetContent>
    </Sheet>
  </div>
) : (
  <div className="flex items-center justify-center h-full w-full">
    <h1 className="text-sm md:text-xl font-semibold text-gray-500 dark:text-gray-200 text-center">
      No connections found. Add some connections to start chatting.
    </h1>
  </div>
)}


      {user?.connections && user?.connections?.length > 0 ? (
        <div className="h-full w-full md:bg-[#fbf1e3] hidden rounded-md md:flex shadow-xl overflow-hidden">
          <>
            <aside className="h-full w-72 bg-white dark:bg-[#1A1A1D] flex flex-col overflow-y-auto scrollbar-webkit">
              {user?.connections?.map((connUser) => (
                <ChatCard
                  key={connUser._id}
                  user={connUser}
                  isActive={
                    getUserStatus(connUser._id!) === "Active now" ? true : false
                  }
                />
              ))}
            </aside>
            <main className="flex flex-col h-full w-full dark:bg-[#1e0e1a]">
              {selectedUser ? (
                <>
                  <header className="w-full py-3 px-4 flex items-center justify-between bg-[#00A884] dark:bg-[#212121] text-slate-200 border-l dark:border-l-slate-700">
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
                        {selectedUser.firstName} {selectedUser.lastName}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4">
                      {getUserStatus(selectedUser._id!) === "Active now" ? (
                        <button
                          onClick={handleVideoCall}
                          className="text-gray-200 p-3 rounded-full"
                        >
                          <Video className="w-6 h-6" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            toast.error("User is offline");
                          }}
                          className="text-gray-200 p-3 rounded-full"
                        >
                          <VideoOff className="w-6 h-6" />
                        </button>
                      )}

                      <h3
                        className={`${
                          getUserStatus(selectedUser._id!) === "Active now"
                            ? "text-gray-100"
                            : "text-gray-300"
                        }`}
                      >
                        {getUserStatus(selectedUser._id!)}
                      </h3>
                    </div>
                  </header>

                  <div
                    ref={chatContainerRef}
                    className="flex-grow p-4 overflow-y-auto scrollbar-webkit dark:bg-[#1e0e1a]"
                  >
                    {messages.map((msg) => (
                      <div
                        key={msg.messageId}
                        className={`flex ${
                          msg.sender._id === user?._id
                            ? "justify-end"
                            : "justify-start"
                        } mb-2`}
                      >
                        <Bubble currentUserId={user?._id || ""} msg={msg} />
                      </div>
                    ))}
                  </div>

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
                  <h1 className="text-base md:text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Select a user to start chatting
                  </h1>
                </div>
              )}
            </main>
          </>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <h1 className="text-sm md:text-xl font-semibold text-gray-500 dark:text-gray-200 text-center">
            No connections found. Add some connections to start chatting
          </h1>
        </div>
      )}
    </div>
  );
};

export default Chat;
