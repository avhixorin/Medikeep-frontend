import {
  Mic,
  MicOff,
  PhoneCall,
  PhoneMissed,
  Users,
  Video,
  VideoOff,
  X,
} from "lucide-react";
import React, { useState } from "react";

type HandleScreenProps = {
  setIsAppointmentOnline: (value: boolean) => void;
  appointment: {
    id: number;
    patientName: string;
    timeSlot: string;
    date: string;
    imgSrc: string;
  };
};

const HandleCallScreen: React.FC<HandleScreenProps> = ({
  setIsAppointmentOnline,
  appointment,
}) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);

  const toggleMic = () => setIsMicOn((prev) => !prev);
  const toggleVideo = () => setIsVideoOn((prev) => !prev);
  const startCall = () => setIsCallActive(true);
  const endCall = () => setIsCallActive(false);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-2">
      {/* Close Button */}
      <button
        onClick={() => setIsAppointmentOnline(false)}
        className="absolute top-4 right-4 bg-gray-100/80 dark:bg-gray-900/60 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded-full transition-colors z-50"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="bg-white/70 dark:bg-black/50 backdrop-blur-lg w-full h-full rounded-lg shadow-lg flex overflow-hidden">
        {/* Appointment Details Section */}
        <div className="w-[20%] p-4 bg-gradient-to-b from-gray-100 via-white to-gray-50 dark:from-gray-800 dark:via-black dark:to-gray-900 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            Appointment Details
          </h2>
          <img
            src={appointment.imgSrc}
            alt={appointment.patientName}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700"
          />
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {appointment.patientName}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {appointment.date} at {appointment.timeSlot}
          </p>
          <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
            View Medical History
          </button>
        </div>

        {/* Video Call Section */}
        <div className="w-[60%] p-4 bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-900/20 dark:to-blue-900/20 flex flex-col">
          <div className="grid grid-cols-2 gap-2 h-full">
            <div className="relative bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Video stream"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative bg-gradient-to-br from-pink-500 to-red-500 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 to-red-500 animate-pulse" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            {/* Toggle Mic */}
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

            {/* Toggle Video */}
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

            {/* View Participants */}
            <button className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-full">
              <Users className="w-6 h-6" />
            </button>
            {/* Start/End Call */}
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
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-[20%] p-4 bg-gradient-to-b from-gray-100 via-white to-gray-50 dark:from-gray-800 dark:via-black dark:to-gray-900 flex flex-col">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            Chat
          </h2>
          <div className="flex-1 overflow-y-auto bg-white/70 dark:bg-gray-800 rounded-lg p-4 shadow-inner">
            <div className="space-y-4">
              <div className="bg-blue-500 text-white p-2 rounded-lg self-end">
                Hello Doctor!
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-lg">
                Hello! How can I assist you today?
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandleCallScreen;
