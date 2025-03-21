import { clearAuthUser } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store/store";
import {
  LayoutGrid,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  HeartPulse,
  User,
  ShieldCheck,
} from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import VideoCallScreen from "../../Chat/VideoCallScreen/VideoCallScreen";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { useEffect, useState } from "react";
import { User as LoggedInUser } from "@/types/types";
import useSockets from "@/hooks/useSockets";
import { useTranslation } from "react-i18next";

export default function LeftSidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const admin = useSelector((state: RootState) => state.admin.admin);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const logoutUrl = import.meta.env.VITE_LOGOUT_URL;

        const response = await axios.post(
          logoutUrl,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          dispatch(clearAuthUser());
          toast.success("You have been logged out successfully.");
          setTimeout(() => navigate("/login"), 0);
        } else {
          toast.error(response.data.message || "An error occurred.");
        }
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : "An error occurred."
        );
      }
    } else {
      toast("Logout cancelled.");
    }
  };

  const { socket } = useSockets();
  const [someoneCalling, setSomeoneCalling] = useState(false);
  const [data, setData] = useState<{ from?: LoggedInUser }>({});

  useEffect(() => {
    const handleVideoCallRequest = async (data: { from: LoggedInUser }) => {
      console.log("Video call request received", data);
      setData(data);

      const result = await Swal.fire({
        title: `${data.from?.username} ${t("videoCall.incoming")}`,
        showDenyButton: true,
        confirmButtonText: t("videoCall.accept"),
        denyButtonText: t("videoCall.reject"),
      });

      const verdict = result.isConfirmed ? "accept" : "reject";
      socket?.emit(SOCKET_EVENTS.VIDEO_CALL_RESPONSE, {
        verdict,
        to: data.from?._id,
      });

      if (verdict === "accept") setSomeoneCalling(true);
    };

    socket?.on(SOCKET_EVENTS.VIDEO_CALL_REQUEST, handleVideoCallRequest);

    return () => {
      socket?.off(SOCKET_EVENTS.VIDEO_CALL_REQUEST, handleVideoCallRequest);
    };
  }, [socket, t]);

  return (
    <div className="flex flex-col items-center justify-between w-16 md:w-48 h-[100dvh] py-2 space-y-8 dark:bg-[#0A0A0A]">
      {someoneCalling ? (
        <VideoCallScreen
          setIsVideoCalling={setSomeoneCalling}
          selectedUser={data.from!}
          caller={"other"}
        />
      ) : null}

      <div className="w-full flex flex-col gap-12 md:gap-8">
        <div
          className="flex w-full justify-center items-center p-2 gap-2 my-8 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <img
            src="https://res.cloudinary.com/avhixorin/image/upload/f_auto/v1726237530/titleIcon_h3ehnu.png"
            alt="MediKeep Logo"
            className="w-6 object-cover"
          />
          <p className="text-2xl font-bold tracking-wide text-gray-800 hidden md:block dark:text-white">
            {t(`sidebar.title`)}
          </p>
        </div>

        <nav className="flex flex-col items-center w-full space-y-4 px-2">
          <SidebarLink
            to="/dashboard"
            icon={<LayoutGrid size={24} />}
            label={t(`sidebar.dashboard`)}
            end
          />
          <SidebarLink
            to="/dashboard/appointments"
            icon={<Calendar size={24} />}
            label={t("sidebar.appointments")}
          />
          <SidebarLink
            to="/dashboard/chats"
            icon={<MessageSquare size={24} />}
            label={t("sidebar.chats")}
          />
          <SidebarLink
            to="/dashboard/medical-records"
            icon={<HeartPulse size={24} />}
            label={t("sidebar.records")}
          />
          {user?.role === "doctor" ? (
            <SidebarLink
              to="/dashboard/patients"
              icon={<User size={24} />}
              label={t("sidebar.patients")}
            />
          ) : (
            <SidebarLink
              to="/dashboard/vitals"
              icon={<User size={24} />}
              label={t("sidebar.vitals")}
            />
          )}
          {admin ? (
            <SidebarLink
              to="/admin"
              icon={<ShieldCheck size={24} />}
              label={"Super Admin"}
            />
          ) : null}
        </nav>
      </div>

      <div className="flex flex-col items-center w-full space-y-4 px-2">
        <SidebarButton
          icon={<LogOut size={24} />}
          label={t("sidebar.logout")}
          onClick={handleLogout}
        />
        <SidebarLink
          to="/dashboard/settings"
          icon={<Settings size={24} />}
          label={t("sidebar.settings")}
        />
        <div
          className="flex w-full items-center gap-4 p-2 bg-gray-100 dark:bg-transparent border border-gray-300 rounded-md cursor-pointer dark:border-gray-700"
          onClick={() => navigate("/dashboard/profile")}
        >
          <img
            src={user?.profilePicture}
            alt={`${user?.username}'s profile picture`}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="hidden md:block">
            <div className="w-full h-full flex flex-col justify-center">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.gender}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
}

function SidebarLink({ to, icon, label, end = false }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center justify-center md:justify-start p-2 w-full rounded-lg transition-colors duration-150 ease-in-out ${
          isActive
            ? "text-gray-800 bg-gray-200 dark:bg-transparent dark:text-gray-100"
            : "text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-transparent dark:hover:text-gray-300"
        }`
      }
    >
      {icon}
      <span className="ml-3 hidden md:block font-medium">{label}</span>
    </NavLink>
  );
}

interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function SidebarButton({ icon, label, onClick }: SidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center md:justify-start p-2 text-gray-500 w-full rounded-lg transition-colors duration-150 ease-in-out hover:text-gray-800 hover:bg-gray-100 focus:outline-none dark:bg-transparent dark:text-gray-500 dark:hover:text-gray-300"
    >
      {icon}
      <span className="ml-3 hidden md:block">{label}</span>
    </button>
  );
}
