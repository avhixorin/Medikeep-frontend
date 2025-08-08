import { SOCKET_EVENTS } from "@/constants/socketEvents";
import {
  addConnection,
  addConnectionRequest,
  removeConnectionRequest,
} from "@/redux/features/authSlice";
import { useSocket } from "@/sockets/context";
import {
  acceptConnectionResponse,
  AcceptedConnection,
  notification,
  rejectConnectionResponse,
  RejectedConnection,
} from "@/types/types";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export const useConnectionSocketEvents = () => {
  const { socket } = useSocket();
  const dispatch = useDispatch();

  const handleNewConnectionNotification = useCallback(
    (data: notification) => {
      toast.success(data.message);
      dispatch(addConnectionRequest(data.from!));
    },
    [dispatch]
  );

  const handleAcceptedConnection = useCallback(
    (data: AcceptedConnection) => {
      toast.success(data.message);
      dispatch(addConnection(data.accepter));
      dispatch(removeConnectionRequest(data.accepter._id!));
    },
    [dispatch]
  );

  const handleAcceptConnectionResponse = useCallback(
    (data: acceptConnectionResponse) => {
      toast.success(data.message);
      dispatch(addConnection(data.data.requester));
      dispatch(removeConnectionRequest(data.data.requester._id!));
    },
    [dispatch]
  );

  const handleRejectedConnection = useCallback(
    (data: RejectedConnection) => {
      toast.error(data.message);
      dispatch(removeConnectionRequest(data.rejecterId));
    },
    [dispatch]
  );

  const handleRejectConnectionResponse = useCallback(
    (data: rejectConnectionResponse) => {
      toast.success(data.message);
      dispatch(removeConnectionRequest(data.data.requesterId));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!socket) return;
    const listeners = {
      [SOCKET_EVENTS.NEW_CONNECTION_NOTIFICATION]:
        handleNewConnectionNotification,
      [SOCKET_EVENTS.ACCEPTED_CONNECTION]: handleAcceptedConnection,
      [SOCKET_EVENTS.ACCEPT_CONNECTION_RESPONSE]:
        handleAcceptConnectionResponse,
      [SOCKET_EVENTS.REJECTED_CONNECTION]: handleRejectedConnection,
      [SOCKET_EVENTS.REJECT_CONNECTION_RESPONSE]:
        handleRejectConnectionResponse,
    };

    Object.entries(listeners).forEach(([event, handler]) =>
      socket.on(event, handler)
    );

    return () => {
      Object.entries(listeners).forEach(([event, handler]) =>
        socket.off(event, handler)
      );
    };
  }, [
    socket,
    handleNewConnectionNotification,
    handleAcceptedConnection,
    handleAcceptConnectionResponse,
    handleRejectedConnection,
    handleRejectConnectionResponse,
  ]);
};
