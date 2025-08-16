import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import useAllUsers from "@/hooks/useAllUsers";
import LeftSidebar from "./LeftSideBar/LeftSideBar";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useChatSocketEvents } from "../Chat/hooks/useChatSocketEvents";
import { useConnectionSocketEvents } from "../Chat/hooks/useConnectionSocketEvents";
import { useAppointmentSocketEvents } from "../Appointments/hooks/useAppointmentSocketEvents";

const Dashboard: React.FC = () => {
  const allUsers = useSelector((state: RootState) => state.allUsers.users);
  const { validateSession } = useAuth();
  const { fetchAllUsers } = useAllUsers();
  const navigate = useNavigate();
  useEffect(() => {
    if (allUsers.length === 0) {
      fetchAllUsers();
    }
  }, [fetchAllUsers, allUsers]);

  useEffect(() => {
    const checkSession = async () => {
      const isValid = await validateSession();
      if (!isValid) {
        navigate("/login");
        toast.error("Session expired. Please log in again.");
      }
    };
    checkSession();
  }, [navigate, validateSession]);
  useChatSocketEvents();
  useConnectionSocketEvents();
  useAppointmentSocketEvents();

  return (
    <div className="w-full max-h-[100dvh] flex bg-dashboard2 bg-center bg-no-repeat bg-cover dark:bg-background">
      <LeftSidebar />
      <div className="flex-1 bg-transparent dark:bg-background p-2">
        <main className="w-full h-full overflow-y-auto overflow-x-auto scrollbar-webkit border-2 border-muted rounded-md">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
