import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../LeftSideBar/LeftSideBar";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";

const Dashboard: React.FC = () => {
  // const isAuthenticated = useSelector((state) => state.user.accessToken);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/medikeep/unauthorized');
  //   }
  // }, [isAuthenticated, navigate]);

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
