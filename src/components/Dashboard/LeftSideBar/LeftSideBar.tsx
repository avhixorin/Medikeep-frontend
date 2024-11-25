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
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LeftSidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out? You will need to log in again to access your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const logoutUrl = import.meta.env.VITE_LOGOUT_URL;
        const response = await fetch(logoutUrl, {
          method: "POST",
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          Swal.fire({
            text: errorData.message || "Failed to log out",
            icon: "error",
          });
          return;
        }

        Swal.fire({
          text: "Logged out successfully",
          icon: "success",
        });

        dispatch(clearAuthUser());
        navigate("/sign-in");
      } catch {
        Swal.fire({
          text: "An error occurred while logging out. Please try again.",
          icon: "error",
        });
      }
    } else {
      console.log("User canceled logout");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-16 md:w-48 h-[100dvh] py-2 space-y-8">
      {/* Logo Section */}
      <div className="w-full flex flex-col gap-12 md:gap-8">
        <div className="flex w-full justify-center items-center p-2 gap-2 my-8">
          <img
            src="https://res.cloudinary.com/avhixorin/image/upload/v1726237530/titleIcon_h3ehnu.png"
            alt="MediKeep Logo"
            className="w-6 object-cover"
          />
          <p className="text-2xl font-bold tracking-wide text-gray-800 hidden md:block">
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
        <div className="flex w-full items-center gap-4 p-2 bg-gray-100 border border-gray-300 rounded-md">
          <img
            src={user?.profilePicture}
            alt={`${user?.username}'s profile picture`}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col justify-center hidden md:block">
            <p className="text-sm font-semibold text-gray-800">
              {user?.username}
            </p>
            <p className="text-xs text-gray-500">{user?.gender}</p>
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
            ? "text-gray-800 bg-gray-200"
            : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
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
      className="flex items-center justify-center md:justify-start p-2 text-gray-500 w-full rounded-lg transition-colors duration-150 ease-in-out hover:text-gray-800 hover:bg-gray-100 focus:outline-none"
    >
      {icon}
      <span className="ml-3 hidden md:block">{label}</span>
    </button>
  );
}
