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
} from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LeftSidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = async () => {

    const result = await toast.promise(
      new Promise<{ isConfirmed: boolean }>((resolve, reject) => {
        const confirmed = window.confirm("Are you sure? You will be logged out.");
        if (confirmed) {
          resolve({ isConfirmed: true });
        } else {
          reject({ isConfirmed: false });
        }
      }),
      {
        loading: "Logging out...",
        success: "Logged out successfully",
        error: "An error occurred while logging out. Please try again.",
      }
    );

    if (result.isConfirmed) {
      try {
        const logoutUrl = import.meta.env.VITE_LOGOUT_URL;
        const response = await fetch(logoutUrl, {
          method: "POST",
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message || "Failed to log out");
          return;
        }
        toast.success("Logged out successfully");

        dispatch(clearAuthUser());
        navigate("/sign-in");
      } catch {
        toast.error("An error occurred while logging out. Please try again.");
      }
    } else {
      console.log("User canceled logout");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-16 md:w-48 h-[100dvh] py-2 space-y-8 dark:bg-[#0A0A0A]">
      {/* Logo Section */}
      <div className="w-full flex flex-col gap-12 md:gap-8">
        <div className="flex w-full justify-center items-center p-2 gap-2 my-8">
          <img
            src="https://res.cloudinary.com/avhixorin/image/upload/v1726237530/titleIcon_h3ehnu.png"
            alt="MediKeep Logo"
            className="w-6 object-cover"
          />
          <p className="text-2xl font-bold tracking-wide text-gray-800 hidden md:block dark:text-white">
            MediKeep
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col items-center w-full space-y-4 px-2">
          <SidebarLink
            to="/dashboard"
            icon={<LayoutGrid size={24} />}
            label="Dashboard"
            end
          />
          <SidebarLink
            to="/dashboard/appointments"
            icon={<Calendar size={24} />}
            label="Appointments"
          />
          <SidebarLink
            to="/dashboard/chats"
            icon={<MessageSquare size={24} />}
            label="Chats"
          />
          <SidebarLink
            to="/dashboard/medical-records"
            icon={<HeartPulse size={24} />}
            label="Records"
          />
          <SidebarLink
            to="/dashboard/vitals"
            icon={<User size={24} />}
            label="Health Profile"
          />
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center w-full space-y-4 px-2">
        <SidebarButton
          icon={<LogOut size={24} />}
          label="Logout"
          onClick={handleLogout}
        />
        <SidebarLink
          to="/dashboard/settings"
          icon={<Settings size={24} />}
          label="Settings"
        />
        <div className="flex w-full items-center gap-4 p-2 bg-gray-100 dark:bg-transparent border border-gray-300 rounded-md cursor-pointer dark:border-gray-700"
        onClick={() => navigate('/dashboard/profile')}>
          <img
            src={user?.profilePicture}
            alt={`${user?.username}'s profile picture`}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col justify-center md:block">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {user?.username}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.gender}</p>
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
