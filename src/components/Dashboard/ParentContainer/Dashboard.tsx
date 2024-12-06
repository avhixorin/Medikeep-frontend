import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../LeftSideBar/LeftSideBar";
import useSockets from "@/hooks/useSockets";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { acceptConnectionResponse, notification, rejectConnectionResponse } from "@/types/types";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addConnection, addConnectionRequest, removeConnectionRequest } from "@/redux/features/authSlice";

const Dashboard: React.FC = () => {
  const { socket } = useSockets();
  const dispatch = useDispatch();
  useEffect(() => {
    if(!socket ) return;
    socket.on(
      SOCKET_EVENTS.NEW_CONNECTION_NOTIFICATION,
      handleNewConnectionNotification
    );
    socket.on(SOCKET_EVENTS.ACCEPT_CONNECTION_RESPONSE, handleAcceptConnectionResponse);
    socket.on(SOCKET_EVENTS.REJECT_CONNECTION_RESPONSE, handleRejectConnectionResponse);
    return () => {
      socket.off(
        SOCKET_EVENTS.NEW_CONNECTION_NOTIFICATION,
        handleNewConnectionNotification
      );
      socket.off(SOCKET_EVENTS.ACCEPT_CONNECTION_RESPONSE, handleAcceptConnectionResponse);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  const handleNewConnectionNotification = (data: notification) => {
    console.log("New Connection Notification",data);
    toast.success(data.message);
    dispatch(addConnectionRequest(data.from!));
  }

  const handleAcceptConnectionResponse = (data: acceptConnectionResponse) => {
    console.log("Accept Connection Response",data);
    toast.success(data.message);
    dispatch(addConnection(data.data.requester))
    dispatch(removeConnectionRequest(data.data.requester._id!))
  }

  const handleRejectConnectionResponse = (data: rejectConnectionResponse) => {
    console.log("Reject Connection Response",data);
    toast.error(data.message);
    dispatch(removeConnectionRequest(data.data.requesterId))
  }
  return (
    <div className="w-full max-h-[100dvh] bg-[#FFFCF8] flex bg-dashboard2 bg-center bg-no-repeat bg-cover dark:bg-[#0C0C0C]">
      <LeftSidebar />
      <div className="flex-1 bg-transparent p-2 dark:bg-[#0C0C0C]">  
      <main className="w-full h-full overflow-y-auto scrollbar-webkit border border-gray-300 dark:border-gray-700 rounded-md">
        <Outlet />
      </main>
      </div>
    </div>
  );
};

export default Dashboard;
