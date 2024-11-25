import { clearAuthUser } from '@/redux/features/authSlice';
import { RootState } from '@/redux/store/store';
import {
  LayoutGrid,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  HeartPulse,
  User,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function LeftSidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const logoutUrl = import.meta.env.VITE_LOGOUT_URL;
      const response = await fetch(logoutUrl, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          text: errorData.message || 'Failed to log out',
          icon: 'error',
        });
        return;
      }

      Swal.fire({
        text: 'Logged out successfully',
        icon: 'success',
      });

      dispatch(clearAuthUser());
      navigate('/sign-in');
    } catch {
      Swal.fire({
        text: 'An error occurred while logging out. Please try again.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-16 md:w-44 h-[100dvh] py-8 space-y-8 bg-[#f6f4f4] border-r border-gray-200">
      {/* Logo at the top */}
      <div className="w-full flex flex-col gap-28 md:gap-10">
        <NavLink to="/dashboard/profile" className="flex flex-col gap-6 items-center justify-center md:justify-start">
          <img src={user?.profilePicture} className="rounded-full h-12 w-10 md:h-20 md:w-20" alt="User" />
          <span className="ml-2 text-lg font-medium hidden md:block font-poppins">{user?.username}</span>
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex flex-col items-center space-y-4 w-full px-2">
          <SidebarLink to="/dashboard" icon={<LayoutGrid size={24} />} label="Dashboard" end />
          <SidebarLink to="/dashboard/appointments" icon={<Calendar size={24} />} label="Appointments" />
          <SidebarLink to="/dashboard/chats" icon={<MessageSquare size={24} />} label="Chats" />
          <SidebarLink to="/dashboard/records" icon={<HeartPulse size={24} />} label="Records" />
          <SidebarLink to="/dashboard/health-profile" icon={<User size={24} />} label="Health Profile" /> {/* New Section */}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center space-y-4 w-full px-2">
        <SidebarLink to="/dashboard/settings" icon={<Settings size={24} />} label="Settings" />
        <SidebarButton icon={<LogOut size={24} />} label="Logout" onClick={handleLogout} />
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
          isActive ? 'text-zinc-800 bg-gray-200' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
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
      className="flex items-center justify-center md:justify-start p-2 text-gray-500 w-full hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-150 ease-in-out focus:outline-none"
      onClick={onClick} 
    >
      {icon}
      <span className="ml-3 hidden md:block">{label}</span>
    </button>
  );
}