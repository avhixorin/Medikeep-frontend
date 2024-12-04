import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

const useSockets = () => {
  const socket = useRef<Socket | null>(null);

  const initializeSocket = (): Socket => {
    if (!socket.current) {
      const socketURL = import.meta.env.VITE_SOCKET_URL;
      if (!socketURL) {
        throw new Error("Socket URL is not defined in the environment variables.");
      }

      socket.current = io(socketURL, {
        autoConnect: false, 
        reconnectionAttempts: 5, 
        transports: ["websocket"],
        withCredentials: true,
      });
    }
    return socket.current;
  };

  useEffect(() => {
    const socketInstance = initializeSocket();

    if (!socketInstance.connected) {
      socketInstance.connect();

      socketInstance.on(SOCKET_EVENTS.CONNECT, () => {
        console.log("Connected to the socket server:", socketInstance.id);
      });

      socketInstance.on(SOCKET_EVENTS.CONNECT_ERROR, (err) => {
        console.error("Socket connection error:", err);
        toast.error("Failed to connect to the server.");
      });

      socketInstance.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
        console.log("Disconnected from the socket server:", reason);
      });
    }

    return () => {
      if (socketInstance.connected) {
        socketInstance.disconnect();
      }
    };
  }, []);

  return socket.current; 
};

export default useSockets;
