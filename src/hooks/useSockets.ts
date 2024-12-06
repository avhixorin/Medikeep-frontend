import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { addConnection, addConnectionRequest, removeConnectionRequest } from "@/redux/features/authSlice";
import { addNotification } from "@/redux/features/notificationsSlice";
import { acceptConnectionResponse, AcceptedConnection, notification, rejectConnectionResponse, RejectedConnection } from "@/types/types";
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

  const handleNewConnectionNotification = useCallback((data: notification) => {
    console.log("Received NEW_CONNECTION_NOTIFICATION:", data);
    toast.success(data.message);
    dispatch(addConnectionRequest(data.from!));
  }, [dispatch]);

  const handleAcceptConnectionResponse = useCallback((data: acceptConnectionResponse) => {
    console.log("Received ACCEPT_CONNECTION_RESPONSE:", data);
    toast.success(data.message);
    dispatch(addConnection(data.data.requester));
    dispatch(removeConnectionRequest(data.data.requester._id!));
  }, [dispatch]);

  const handleAcceptedConnection = useCallback((data: AcceptedConnection) => {
    toast.success(data.message);
    dispatch(addConnection(data.accepter));
    dispatch(removeConnectionRequest(data.accepter._id!));
  }, [dispatch]);

  const handleRejectConnectionResponse = useCallback((data: rejectConnectionResponse) => {
    console.log("Received REJECT_CONNECTION_RESPONSE:", data);
    toast.error(data.message);
    dispatch(removeConnectionRequest(data.data.requesterId));
  }, [dispatch]);

  const handleRejectedConnection = useCallback((data: RejectedConnection) => {
    toast.error(data.message);
    dispatch(removeConnectionRequest(data.rejecterId));
  }, [dispatch]);

  const setupSocketListeners = useCallback((socket: Socket) => {
    if (!socket.hasListeners(SOCKET_EVENTS.NEW_CONNECTION_NOTIFICATION)) {
      socket.on(SOCKET_EVENTS.NEW_CONNECTION_NOTIFICATION, handleNewConnectionNotification);
    }

    if (!socket.hasListeners(SOCKET_EVENTS.ACCEPTED_CONNECTION)) {
      socket.on(SOCKET_EVENTS.ACCEPTED_CONNECTION, handleAcceptedConnection);
    }

    if (!socket.hasListeners(SOCKET_EVENTS.ACCEPT_CONNECTION_RESPONSE)) {
      socket.on(SOCKET_EVENTS.ACCEPT_CONNECTION_RESPONSE, handleAcceptConnectionResponse);
    }

    if (!socket.hasListeners(SOCKET_EVENTS.REJECTED_CONNECTION)) {
      socket.on(SOCKET_EVENTS.REJECTED_CONNECTION, handleRejectedConnection);
    }

    if (!socket.hasListeners(SOCKET_EVENTS.REJECT_CONNECTION_RESPONSE)) {
      socket.on(SOCKET_EVENTS.REJECT_CONNECTION_RESPONSE, handleRejectConnectionResponse);
    }

    if (!socket.hasListeners(SOCKET_EVENTS.NOTIFICATION)) {
      socket.on(SOCKET_EVENTS.NOTIFICATION, (data: notification) => {
        toast.success(data.message);
        dispatch(addNotification(data));
      });
    }

    if (!socket.hasListeners(SOCKET_EVENTS.CONNECT)) {
      socket.on(SOCKET_EVENTS.CONNECT, () => {
        console.log("Connected to the socket server:", socket.id);
      });
    }

    if (!socket.hasListeners(SOCKET_EVENTS.CONNECT_ERROR)) {
      socket.on(SOCKET_EVENTS.CONNECT_ERROR, (err) => {
        console.error("Socket connection error:", err);
      });
    }

    if (!socket.hasListeners(SOCKET_EVENTS.DISCONNECT)) {
      socket.on(SOCKET_EVENTS.DISCONNECT, () => {
        console.log("Disconnected from the socket server.");
      });
    }
  }, [dispatch, handleNewConnectionNotification, handleAcceptConnectionResponse, handleRejectConnectionResponse, handleAcceptedConnection, handleRejectedConnection]);

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
