import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useSockets from "@/hooks/useSockets";
import { RootState } from "@/redux/store/store";
import { User } from "@/types/types";
import {
  ChevronLeft,
  ChevronRight,
  Hospital,
  LogIn,
  LogOut,
  PersonStanding,
  Plus,
  Signature,
  User as UserIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

type HomeAdminData = {
  total: {
    accounts: number;
    patients: number;
    doctors: number;
    appointments: number;
  };
  recent: {
    login: Partial<User> | null;
    logout: Partial<User> | null;
    signUp: Partial<User> | null;
  };
  currentlyOnlineUsers: {
    profilePicture: string;
    username: string;
  }[];
};

const MainContent = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { socket } = useSockets();
  const [homeData, setHomeData] = useState<HomeAdminData | null>(null);
  console.log(homeData);
  const fetchAdminStats = useCallback(() => {
    if (socket) {
      socket.emit(SOCKET_EVENTS.ADMIN_HOME_STATS);
    }
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    fetchAdminStats();
    socket.on(SOCKET_EVENTS.ADMIN_HOME_STATS, (data) => setHomeData(data));

    return () => {
      socket.off(SOCKET_EVENTS.ADMIN_HOME_STATS);
    };
  }, [fetchAdminStats, socket]);

  console.log("This is sicket", socket);

  return (
    <div className="bg-transparent relative w-full h-full pt-6 px-4 md:px-6 lg:px-4 dark:bg-[#141414]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold dark:text-slate-200">Home</h1>
        <p className="text-slate-400">Welcome back {user?.username} sama!</p>
      </div>

      <div className="mb-8 flex justify-between">
        {/* Total Accounts */}
        <StatCard
          icon={<UserIcon size={24} />}
          label="Total accounts"
          value={homeData?.total.accounts}
        />

        {/* Total Patients */}
        <StatCard
          icon={<PersonStanding size={24} />}
          label="Total patients"
          value={homeData?.total.patients}
        />

        {/* Total Doctors */}
        <StatCard
          icon={<Hospital size={24} />}
          label="Total doctors"
          value={homeData?.total.doctors}
        />

        {/* Total Appointments */}
        <StatCard
          icon={<Hospital size={24} />}
          label="Total appointments"
          value={homeData?.total.appointments}
        />
      </div>

      {/* Recent Events Section */}
      <RecentEvents homeData={homeData} />

      {/* Online Users Section */}
      <OnlineUsers
        currentlyOnlineUsers={homeData?.currentlyOnlineUsers || []}
      />
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: JSX.Element;
  label: string;
  value?: number;
}) => (
  <div className="flex items-center gap-3 rounded-lg bg-white dark:bg-slate-800 py-2 px-2 shadow-sm">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-700">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-300">{label}</p>
      <p className="text-lg font-bold">{value ?? 0}</p>
    </div>
  </div>
);

const RecentEvents = ({ homeData }: { homeData: HomeAdminData | null }) => (
  <div>
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-xl font-bold">Recent events</h2>
      <div className="flex gap-2">
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm hover:bg-gray-50">
          <ChevronLeft size={18} />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm hover:bg-gray-50">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4">
      <EventCard
        title="Login"
        value={homeData?.recent.login}
        icon={<LogIn size={20} />}
        bgColor="bg-blue-500"
      />
      <EventCard
        title="Logout"
        value={homeData?.recent.logout}
        icon={<LogOut size={20} />}
        bgColor="bg-orange-500"
      />
      <EventCard
        title="Sign-up"
        value={homeData?.recent.signUp}
        icon={<Signature size={20} />}
        bgColor="bg-green-500"
      />
    </div>
  </div>
);

const EventCard = ({
  title,
  value,
  icon,
  bgColor,
}: {
  title: string;
  value?: Partial<User> | null;
  icon: JSX.Element;
  bgColor: string;
}) => (
  <div className="rounded-xl bg-transparent p-4 dark:bg-[#0A0A0A]">
    <div className="mb-4 flex justify-between">
      <h3 className="font-medium">{title}</h3>
      <div
        className={`flex h-8 w-8 p-2 items-center justify-center rounded-full ${bgColor} text-white`}
      >
        {icon}
      </div>
    </div>
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-medium">{value?.username || "N/A"}</h4>
      <img
        src={value?.profilePicture}
        className="w-7 h-7 rounded-full"
        alt=""
      />
    </div>
  </div>
);

const OnlineUsers = ({
  currentlyOnlineUsers,
}: {
  currentlyOnlineUsers: { profilePicture: string; username: string }[];
}) => (
  <div className="mt-8">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-xl font-bold">Currently online users {}</h2>
      <a
        href="#"
        className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
      >
        See all
        <ChevronRight size={16} />
      </a>
    </div>

    <div className="flex gap-6">
      {currentlyOnlineUsers.length > 0
        ? currentlyOnlineUsers.map((user, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative mb-2 h-16 w-16 overflow-hidden rounded-full border-2 border-white">
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <p className="text-sm font-medium">{user.username}</p>
            </div>
          ))
        : null}

      <div className="flex flex-col items-center">
        <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50">
          <Plus size={24} className="text-gray-400" />
        </div>
      </div>
    </div>
  </div>
);

export default MainContent;
