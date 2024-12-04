import { useEffect, useRef } from "react";
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
      });
    }
    return socket.current;
  };

  useEffect(() => {
    const socketInstance = initializeSocket();

    if (!socketInstance.connected) {
      socketInstance.connect();

      socketInstance.on("connect", () => {
        console.log("Connected to the socket server:", socketInstance.id);
      });

      socketInstance.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });

      socketInstance.on("disconnect", (reason) => {
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
