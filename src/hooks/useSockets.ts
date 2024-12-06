import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { addNotification } from "@/redux/features/notificationsSlice";
import { notification } from "@/types/types";
import { useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";

let sharedSocket: Socket | null = null;

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

const useSockets = () => {
  const dispatch = useDispatch();

  const setupSocketListeners = useCallback((socket: Socket) => {
    socket.on(SOCKET_EVENTS.CONNECT, () => {
      console.log("Connected to the socket server:", socket.id);
    });

    socket.on(SOCKET_EVENTS.NOTIFICATION, (data: notification) => {
      toast.success(data.message);
      dispatch(addNotification(data));
    });

    socket.on(SOCKET_EVENTS.CONNECT_ERROR, (err) => {
      console.error("Socket connection error:", err);
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log("Disconnected from the socket server.");
    });
  }, [dispatch]);

  useEffect(() => {
    const socket = initializeSocket();

    if (!socket.connected) {
      socket.connect();
      setupSocketListeners(socket);
    }

    return () => {
      if (sharedSocket?.connected) {
        console.log("Socket remains connected as it is shared globally.");
      } else {
        sharedSocket?.off(); 
      }
    };
  }, [setupSocketListeners]);

  return { socket: sharedSocket };
};

export default useSockets;
