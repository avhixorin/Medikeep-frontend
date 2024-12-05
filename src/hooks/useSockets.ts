import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSockets = () => {
  const socket = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

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
        setIsConnected(true);
        console.log("Connected to the socket server:", socketInstance.id);
      });

      socketInstance.on(SOCKET_EVENTS.CONNECT_ERROR, (err) => {
        console.error("Socket connection error:", err);
        setIsConnected(false);
      });

      socketInstance.on(SOCKET_EVENTS.DISCONNECT, () => {
        setIsConnected(false);
        console.log("Disconnected from the socket server.");
      });
    }

    return () => {
      if (socketInstance.connected) {
        socketInstance.disconnect();
      }
    };
  }, []);

  // Ensure socket is initialized before returning
  return { socket: socket.current, isConnected };
};

export default useSockets;
