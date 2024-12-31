import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSideBar/LeftSideBar";
import useSockets from "@/hooks/useSockets";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import useAllUsers from "@/hooks/useAllUsers";

const Dashboard: React.FC = () => {
  useSockets();
  const { fetchAllUsers } = useAllUsers();
  const allUsers = useSelector((state: RootState) => state.allUsers)
  useEffect(() => {
    if (allUsers?.users?.length === 0) {
      fetchAllUsers();
    }
  }, [allUsers, fetchAllUsers]);

  return (
    <div className="w-full max-h-[100dvh] flex bg-dashboard2 bg-center bg-no-repeat bg-cover dark:bg-[#0C0C0C]">
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
