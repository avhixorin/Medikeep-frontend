import { Outlet, useNavigate } from "react-router-dom";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

export default function SuperDash() {
  const admin = useSelector((state: RootState) => state.admin.admin);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!admin) {
      navigate("/verify");
    }
    else if(user?._id !== import.meta.env.VITE_ADMIN_ID){
      navigate("/unauthorized")
    }
  }, [admin, navigate, user?._id]);
  
  return (
    <div className="w-full h-full max-h-[100dvh] flex bg-dashboard2 bg-center bg-no-repeat bg-cover dark:bg-[#0A0A0A]">
      <LeftSide />
      <main className="w-full h-full max-w-5xl overflow-y-auto scrollbar-webkit border dark:bg-[#141414]">
        <Outlet />
      </main>
      <RightSide />
    </div>
  );
}
