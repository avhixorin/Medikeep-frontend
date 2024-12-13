import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import {
  addConnectionRequest,
  addConnection,
  removeConnectionRequest,
  addAppointmentRequest,
  removeAppointmentRequest,
  addAppointment,
  removeAppointment,
  reScheduleAppointment,
} from "@/redux/features/authSlice";
import {
  acceptConnectionResponse,
  AcceptedConnection,
  Appointment,
  notification,
  PrivateMessage,
  rejectConnectionResponse,
  RejectedConnection,
} from "@/types/types";
import { addNotification } from "@/redux/features/notificationsSlice";
import { addFriendMessage } from "@/redux/features/messageSlice";

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

    console.log("Initialized socket instance in context:", sharedSocket);
  }
  return sharedSocket;
};

const SocketContext = createContext<{ socket: Socket | null } | undefined>(
  undefined
);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();

  const setupSocketListeners = useCallback(

    (socket: Socket) => {
        console.log("Setting up socket listeners...");
            socket.on(
              SOCKET_EVENTS.NEW_CONNECTION_NOTIFICATION,
              (data: notification) => {
                console.log("Received NEW_CONNECTION_NOTIFICATION:", data);
                toast.success(data.message);
                dispatch(addConnectionRequest(data.from!));
              }
            );
            socket.on(SOCKET_EVENTS.ACCEPTED_CONNECTION, (data: AcceptedConnection) => {
                toast.success(data.message);
                dispatch(addConnection(data.accepter));
                dispatch(removeConnectionRequest(data.accepter._id!));
              });
            socket.on(
              SOCKET_EVENTS.ACCEPT_CONNECTION_RESPONSE,
              (data: acceptConnectionResponse) => {
                console.log("Received ACCEPT_CONNECTION_RESPONSE:", data);
                toast.success(data.message);
                dispatch(addConnection(data.data.requester));
                dispatch(removeConnectionRequest(data.data.requester._id!));
              }
            );
            socket.on(SOCKET_EVENTS.REJECTED_CONNECTION, (data: RejectedConnection) => {
                toast.error(data.message);
                dispatch(removeConnectionRequest(data.rejecterId));
              });
            socket.on(
              SOCKET_EVENTS.REJECT_CONNECTION_RESPONSE,
              (data: rejectConnectionResponse) => {
                console.log("Received REJECT_CONNECTION_RESPONSE:", data);
                toast.error(data.message);
                dispatch(removeConnectionRequest(data.data.requesterId));
              }
            );
            socket.on(SOCKET_EVENTS.NOTIFICATION, (data: notification) => {
              toast.success(data.message);
              dispatch(addNotification(data));
            });
            socket.on(SOCKET_EVENTS.NEW_PRIVATE_MESSAGE, (data: PrivateMessage) => {
                console.log("Received new private message:", data);
                toast.success("New message received!");
                dispatch(addFriendMessage(data));
              });
            socket.on(SOCKET_EVENTS.CONNECT, () => {
              console.log("Connected to the socket server:", socket.id);
            });
            socket.on(
              SOCKET_EVENTS.NEW_APPOINTMENT_REQUEST,
              (data: { statusCode: number; message: string; data: Appointment }) => {
                if (data.statusCode === 200) {
                  toast.success(data.message);
                  dispatch(addAppointmentRequest(data.data));
                }
              }
            );
            socket.on(
              SOCKET_EVENTS.REQUEST_APPOINTMENT_RESPONSE,
              (data: { statusCode: number; message: string; data: Appointment }) => {
                if (data.statusCode === 200) {
                  toast.success(data.message);
                  dispatch(addAppointmentRequest(data.data));
                }
              }
            );
            socket.on(SOCKET_EVENTS.ACCEPT_APPOINTMENT, (data: { statusCode: number; message: string; data: Appointment }) => {
                if (data.statusCode === 200) {
                  toast.success(data.message);
                  dispatch(removeAppointmentRequest(data.data._id));
                  dispatch(addAppointment(data.data));
                }
              });
            socket.on(
              SOCKET_EVENTS.DECLINE_APPOINTMENT_REQUEST,
              (data: { statusCode: number; message: string; data: Appointment }) => {
                if (data.statusCode === 200) {
                  toast.error(data.message);
                  dispatch(removeAppointmentRequest(data.data._id));
                }
              }
            );
            socket.on(
              SOCKET_EVENTS.RESCHEDULED_APPOINTMENT,
              (data: { statusCode: number; message: string; data: Appointment }) => {
                if (data.statusCode === 200) {
                  toast.success(data.message);
                  dispatch(reScheduleAppointment(data.data));
                }
              }
            );
            socket.on(
              SOCKET_EVENTS.CANCELLED_APPOINTMENT,
              (data: { statusCode: number; message: string; data: Appointment }) => {
                if (data.statusCode === 200) {
                  toast.error(data.message);
                  dispatch(removeAppointment(data.data._id));
                }
              }
            );
            socket.on(
              SOCKET_EVENTS.COMPLETED_APPOINTMENT,
              (data: { statusCode: number; message: string; data: Appointment }) => {
                if (data.statusCode === 200) {
                  toast.success(data.message);
                  dispatch(removeAppointment(data.data._id));
                }
              }
            );
    
          // if (!socket.hasListeners(SOCKET_EVENTS.RTC_EVENT)) {
          //   socket.on(SOCKET_EVENTS.RTC_EVENT, handleRTCEvent);
          // }
            socket.on(SOCKET_EVENTS.CONNECT_ERROR, (err) => {
              console.error("Socket connection error:", err);
            });
            socket.on(SOCKET_EVENTS.DISCONNECT, () => {
              console.log("Disconnected from the socket server.");
            });

        },
    [dispatch]
  );

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

  return (
    <SocketContext.Provider value={{ socket: sharedSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};
