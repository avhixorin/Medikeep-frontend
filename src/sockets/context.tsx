import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { io, Socket } from 'socket.io-client';


interface ISocketContext {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  isConnected: false,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [isConnected, setIsConnected] = React.useState(false);

  useEffect(() => {

    const socketURL = import.meta.env.VITE_SOCKET_URL;
    if (!socketURL) {
      console.error("Socket URL is not defined in the environment variables.");
      return;
    }

    const socketInstance = io(socketURL, {
      autoConnect: true, 
      reconnectionAttempts: 5,
      transports: ["websocket"],
      withCredentials: true,
    });

    socketInstance.on('connect', () => {
      console.log("Connected to the socket server:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log("Disconnected from the socket server.");
      setIsConnected(false);
    });

    socketInstance.on('connect_error', (err) => {
      console.error("Socket connection error:", err);
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      console.log("Disconnecting socket...");
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};