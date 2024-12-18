import useRTC from "@/hooks/useRTC";
import { User } from "@/types/types";
import {
  Mic,
  MicOff,
  PhoneCall,
  PhoneMissed,
  Video,
  VideoOff,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type VideoCallScreenProps = {
  setIsVideoCalling: (value: boolean) => void;
  selectedUser: User;
};

type Position = {
  x: number;
  y: number;
};

const VideoCallScreen: React.FC<VideoCallScreenProps> = ({
  setIsVideoCalling,
  selectedUser,
}) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMyVideoActive, setIsMyVideoActive] = useState(false);
  const [localStreamPosition, setLocalStreamPosition] = useState<Position>({
    x: 16,
    y: 16,
  });
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { localStream, remoteStream, grabLocalMedia, createOffer } = useRTC();
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [localStream, remoteStream]);
  const localStreamRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const startX = "clientX" in e ? e.clientX : e.touches[0].clientX;
    const startY = "clientY" in e ? e.clientY : e.touches[0].clientY;

    const element = localStreamRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();

    const offsetX = startX - rect.left;
    const offsetY = startY - rect.top;

    const handleDragMove = (event: MouseEvent | TouchEvent) => {
      const moveX =
        event instanceof MouseEvent ? event.clientX : event.touches[0]?.clientX;
      const moveY =
        event instanceof MouseEvent ? event.clientY : event.touches[0]?.clientY;

      if (moveX === undefined || moveY === undefined) return;

      setLocalStreamPosition({
        x: Math.max(
          0,
          Math.min(window.innerWidth - rect.width, moveX - offsetX)
        ),
        y: Math.max(
          0,
          Math.min(window.innerHeight - rect.height, moveY - offsetY)
        ),
      });
    };

    const handleDragEnd = () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };

    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleDragMove);
    window.addEventListener("touchend", handleDragEnd);
  };

  const toggleMic = () => setIsMicOn((prev) => !prev);
  const toggleVideo = () => setIsVideoOn((prev) => !prev);
  const startCall = async () => {
    if (localStream) {
      await createOffer(selectedUser._id!);
      setIsCallActive(true);
    }
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    setIsCallActive(false);
    setIsMyVideoActive(false);
    setIsVideoCalling(false);
  };
  const startMyVideo = async () => {
    await grabLocalMedia();
    setIsMyVideoActive(true);
  };
  return (
    <div className="fixed inset-0 w-full h-full bg-black/50 dark:bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-2">
      <button
        onClick={() => setIsVideoCalling(false)}
        className="absolute top-4 right-4 bg-gray-100/80 dark:bg-gray-900/60 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded-full transition-colors z-50"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-full h-full bg-black relative overflow-hidden">
        {isCallActive ? (
          <video
            ref={remoteVideoRef}
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 animate-pulse" />
          </div>
        )}

        <div
          ref={localStreamRef}
          className="absolute w-48 h-48 bottom-4 right-4 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg overflow-hidden cursor-pointer"
          style={{
            left: `${localStreamPosition.x}px`,
            top: `${localStreamPosition.y}px`,
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {isMyVideoActive ? (
            <video
              ref={localVideoRef}
              autoPlay
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-red-500 animate-pulse" />
            </div>
          )}
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={toggleMic}
            className={`${
              isMicOn
                ? "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                : "bg-red-500 hover:bg-red-600"
            } text-gray-800 dark:text-gray-200 p-3 rounded-full`}
          >
            {isMicOn ? (
              <Mic className="w-6 h-6" />
            ) : (
              <MicOff className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={toggleVideo}
            className={`${
              isVideoOn
                ? "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                : "bg-red-500 hover:bg-red-600"
            } text-gray-800 dark:text-gray-200 p-3 rounded-full`}
          >
            {isVideoOn ? (
              <Video className="w-6 h-6" />
            ) : (
              <VideoOff className="w-6 h-6" />
            )}
          </button>

          {isCallActive ? (
            <button
              onClick={endCall}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center"
            >
              <PhoneMissed className="w-6 h-6" />
              <span className="ml-2">End Call</span>
            </button>
          ) : (
            <button
              onClick={startCall}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full flex items-center"
            >
              <PhoneCall className="w-6 h-6" />
              <span className="ml-2">Start Call</span>
            </button>
          )}

          {!isMyVideoActive && (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
              onClick={startMyVideo}
            >
              Start my video
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCallScreen;
