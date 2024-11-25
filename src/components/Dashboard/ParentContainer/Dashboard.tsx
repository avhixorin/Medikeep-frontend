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
    <div className="w-full max-h-[100dvh] bg-[#FFFCF8] flex">
      <LeftSidebar />
      <main className="flex-1 overflow-y-auto bg-dashboard2 bg-center bg-no-repeat bg-cover scrollbar-webkit">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
