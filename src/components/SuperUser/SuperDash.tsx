import { Outlet, useNavigate } from "react-router-dom";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

export default function SuperDash() {
  const admin = useSelector((state: RootState) => state.admin.admin);
  const navigate = useNavigate();
  useEffect(() => {
    if (!admin) navigate("/verify");
  }, [admin, navigate]);
  return (
    <div className="w-full max-h-[100dvh] flex bg-dashboard2 bg-center bg-no-repeat bg-cover dark:bg-[#0C0C0C]">
      <LeftSide />
      <main className="col-span-7 overflow-y-auto scrollbar-webkit border border-gray-300 dark:border-gray-700 rounded-md">
        <Outlet />
      </main>
      <RightSide />
    </div>
  );
}
