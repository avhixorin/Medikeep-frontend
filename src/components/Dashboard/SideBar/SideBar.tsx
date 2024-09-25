import { Link } from 'react-router-dom';
import {
  Infinity,
  LayoutGrid,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  HeartPulse,
} from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="flex flex-col items-center justify-between w-16 md:w-44 h-[100dvh] py-8 space-y-8 bg-white border-r border-gray-200">
      
      {/* Logo at the top */}
      <Link to="/" className="flex items-center justify-center md:justify-start text-indigo-600 hover:text-indigo-700">
        <Infinity size={32} />
        <span className="ml-2 text-xl font-bold hidden md:block">MyApp</span>
      </Link>

      {/* Navigation Links */}
      <nav className="flex flex-col items-center space-y-4 w-full px-2">
        <SidebarLink to="/dashboard" icon={<LayoutGrid size={24} />} label="Dashboard" />
        <SidebarLink to="/dashboard/appointments" icon={<Calendar size={24} />} label="Appointments" />
        <SidebarLink to="/dashboard/chats" icon={<MessageSquare size={24} />} label="Chats" />
        <SidebarLink to="/dashboard/records" icon={<HeartPulse size={24} />} label="Records" />
      </nav>

      {/* Bottom Section */}
      <div  className="flex flex-col items-center space-y-4 w-full px-2">
        <SidebarLink to="/dashboard/settings" icon={<Settings size={24} />} label="Settings" />
        <SidebarButton icon={<LogOut size={24} />} label="Logout" />
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

function SidebarLink({ to, icon, label }: SidebarLinkProps) {
  return (
    <Link
      to={to}
      className="flex items-center justify-center md:justify-start p-2 text-gray-500 w-full hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-150 ease-in-out"
    >
      {icon}
      <span className="ml-3 hidden md:block">{label}</span>
    </Link>
  );
}

interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
}

function SidebarButton({ icon, label }: SidebarButtonProps) {
  return (
    <button className="flex items-center justify-center md:justify-start p-2 text-gray-500 w-full hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-150 ease-in-out focus:outline-none">
      {icon}
      <span className="ml-3 hidden md:block">{label}</span>
    </button>
  );
}
