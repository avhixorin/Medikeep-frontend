import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { addAppointment, addAppointmentRequest, addConnection, addConnectionRequest, removeAppointment, removeAppointmentRequest, removeConnectionRequest, reScheduleAppointment } from "@/redux/features/authSlice";
import { addFriendMessage } from "@/redux/features/messageSlice";
import { addNotification } from "@/redux/features/notificationsSlice";
import { acceptConnectionResponse, AcceptedConnection, Appointment, notification, PrivateMessage, rejectConnectionResponse, RejectedConnection } from "@/types/types";
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

  const handleNewPrivateMessage = useCallback((data: PrivateMessage) => {
    console.log("Received new private message:", data);
    toast.success("New message received!");
    dispatch(addFriendMessage(data));
  }, [dispatch]);

  const handleRejectedConnection = useCallback((data: RejectedConnection) => {
    toast.error(data.message);
    dispatch(removeConnectionRequest(data.rejecterId));
  }, [dispatch]);

  const handleAppointmentRequestResponse = useCallback((data: {
    statusCode: number;
    message: string;
    data: Appointment;
  }) => {
    if(data.statusCode === 200) {
    toast.success(data.message);
    dispatch(addAppointmentRequest(data.data));
    }
  }, [dispatch]);

  const handleNewAppointmentRequest = useCallback((data: {
    statusCode: number;
    message: string;
    data: Appointment;
  }) => {
    if(data.statusCode === 200) {
    toast.success(data.message);
    dispatch(addAppointmentRequest(data.data));
    }
  }, [dispatch]);

  const handleAppointmentAcception = useCallback((data: {
    statusCode: number;
    message: string;
    data: Appointment;
  }) => {
    if(data.statusCode === 200) {
    toast.success(data.message);
    dispatch(removeAppointmentRequest(data.data._id));
    dispatch(addAppointment(data.data));
    }
  }, [dispatch]);

  const handleAppointmentRescheduling = useCallback((data: {
    statusCode: number;
    message: string;
    data: Appointment;
  }) => {
    if(data.statusCode === 200) {
    toast.success(data.message);
    dispatch(reScheduleAppointment(data.data));
    }
  }, [dispatch]);

  const handleAppointmentCancellation = useCallback((data: {
    statusCode: number;
    message: string;
    data: Appointment;
  }) => {
    if(data.statusCode === 200) {
    toast.error(data.message);
    dispatch(removeAppointment(data.data._id));
    }
  }, [dispatch]);

  const handleAppointmentRequestRejection = useCallback((data: {
    statusCode: number;
    message: string;
    data: Appointment;
  }) => {
    if(data.statusCode === 200) {
    toast.error(data.message);
    dispatch(removeAppointmentRequest(data.data._id));
    }
  }, [dispatch]);

  const handleAppointmentCompletion = useCallback((data: {
    statusCode: number;
    message: string;
    data: Appointment;
  }) => {
    if(data.statusCode === 200) {
    toast.success(data.message);
    dispatch(removeAppointment(data.data._id));
    }
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

    if (!socket.hasListeners(SOCKET_EVENTS.NEW_PRIVATE_MESSAGE)) {
      socket.on(SOCKET_EVENTS.NEW_PRIVATE_MESSAGE, handleNewPrivateMessage);
    }

    if (!socket.hasListeners(SOCKET_EVENTS.CONNECT)) {
      socket.on(SOCKET_EVENTS.CONNECT, () => {
        console.log("Connected to the socket server:", socket.id);
      });
    }

    if (!socket.hasListeners(SOCKET_EVENTS.NEW_APPOINTMENT_REQUEST)) {
      socket.on(SOCKET_EVENTS.NEW_APPOINTMENT_REQUEST, handleNewAppointmentRequest);
    }
    
    if (!socket.hasListeners(SOCKET_EVENTS.REQUEST_APPOINTMENT_RESPONSE)) {
      socket.on(SOCKET_EVENTS.REQUEST_APPOINTMENT_RESPONSE, handleAppointmentRequestResponse);
    }

    if (!socket.hasListeners(SOCKET_EVENTS.ACCEPT_APPOINTMENT)) {
      socket.on(SOCKET_EVENTS.ACCEPT_APPOINTMENT, handleAppointmentAcception);
    }

    if (!socket.hasListeners(SOCKET_EVENTS.DECLINE_APPOINTMENT_REQUEST)) {
      socket.on(SOCKET_EVENTS.DECLINE_APPOINTMENT_REQUEST, handleAppointmentRequestRejection);
    }
    if (!socket.hasListeners(SOCKET_EVENTS.RESCHEDULED_APPOINTMENT)) {
      socket.on(SOCKET_EVENTS.RESCHEDULED_APPOINTMENT, handleAppointmentRescheduling);
    }

    if (!socket.hasListeners(SOCKET_EVENTS.CANCELLED_APPOINTMENT)) {
      socket.on(SOCKET_EVENTS.CANCELLED_APPOINTMENT, handleAppointmentCancellation);
    }


    if (!socket.hasListeners(SOCKET_EVENTS.COMPLETED_APPOINTMENT)) {
      socket.on(SOCKET_EVENTS.COMPLETED_APPOINTMENT, handleAppointmentCompletion);
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
  }, [dispatch, handleNewConnectionNotification, handleAcceptConnectionResponse, handleRejectConnectionResponse, handleAcceptedConnection, handleRejectedConnection, handleNewPrivateMessage, handleAppointmentRequestResponse, handleNewAppointmentRequest, handleAppointmentRescheduling, handleAppointmentCancellation, handleAppointmentCompletion, handleAppointmentRequestRejection, handleAppointmentAcception]);

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
