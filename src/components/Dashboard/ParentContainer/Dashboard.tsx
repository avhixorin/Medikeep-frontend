import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
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
      <SideBar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
