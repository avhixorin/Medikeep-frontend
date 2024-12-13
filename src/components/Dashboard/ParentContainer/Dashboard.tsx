import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../LeftSideBar/LeftSideBar";
import useSockets from "@/hooks/useSockets";

const Dashboard: React.FC = () => {
  const { socket } = useSockets();
  useEffect(() => {
    if (!socket) {
      console.warn("Socket2 is undefined");
    }
    
    console.log("Setting up socket listeners for events");
  }, [ socket]);

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
