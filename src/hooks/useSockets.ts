import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let sharedSocket: Socket | null = null;

const useSockets = () => {
  const [isConnected, setIsConnected] = useState(false);

  const initializeSocket = (): Socket => {
    if (!sharedSocket) {
      const socketURL = import.meta.env.VITE_SOCKET_URL;
      if (!socketURL) {
        throw new Error("Socket URL is not defined in the environment variables.");
      }

      sharedSocket = io(socketURL, {
        autoConnect: false,
        reconnectionAttempts: 5,
        transports: ["websocket"],
        withCredentials: true,
      });
    }

    return sharedSocket;
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

      if (sharedSocket?.connected) {
        console.log("Socket remains connected as it is shared globally.");
      }
    };
  }, []);

  return { socket: sharedSocket, isConnected };
};

export default useSockets;
