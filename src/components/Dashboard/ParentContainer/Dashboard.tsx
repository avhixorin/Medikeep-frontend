import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import useAllUsers from "@/hooks/useAllUsers";
import LeftSidebar from "./LeftSideBar/LeftSideBar";

const useTheme = (userTheme: string | undefined) => {
  useEffect(() => {
    const htmlElement = document.querySelector("html");
    const themeClass = userTheme || "light";
    htmlElement?.classList.remove("dark", "light");
    htmlElement?.classList.add(themeClass);
  }, [userTheme]);
};

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const allUsers = useSelector((state: RootState) => state.allUsers.users);
  const { fetchAllUsers } = useAllUsers();
  const userTheme = user?.settingPreferences?.general?.theme;
  useTheme(userTheme);
  useEffect(() => {
    if (allUsers.length === 0) {
      fetchAllUsers();
    }
  }, [fetchAllUsers, allUsers]);


  if (!user) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="w-full max-h-[100dvh] flex bg-dashboard2 bg-center bg-no-repeat bg-cover dark:bg-[#0C0C0C]">
      <LeftSidebar />
      <div className="flex-1 bg-transparent p-2 dark:bg-[#0C0C0C]">
        <main className="w-full h-full overflow-y-auto scrollbar-webkit border border-gray-300 dark:border-gray-700 rounded-md overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
