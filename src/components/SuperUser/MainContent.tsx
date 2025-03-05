import { SOCKET_EVENTS } from "@/constants/socketEvents";
import useSockets from "@/hooks/useSockets";
import { RootState } from "@/redux/store/store";
import { ChevronLeft, ChevronRight, Hospital, LogIn, LogOut, PersonStanding, Plus, Signature, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type HomeAdminData = {
  total: {
    accounts: number,
    patients: number,
    doctors: number,
    appointments: number
  },
  recent: {
    login: string,
    logout: string,
    signUp: string
  },
  currentlyOnlineUsers: {
    avatar: string,
    username: string
  }[]
}

const MainContent = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const { socket } = useSockets();
  const [homeData, setHomeData] = useState<HomeAdminData | null>(null)
  useEffect(() => {
    socket?.emit(SOCKET_EVENTS.ADMIN_HOME_STATS)
    socket?.on(SOCKET_EVENTS.ADMIN_HOME_STATS, (data) => setHomeData(data))
  },[socket])

  return (
    <div className="bg-transparent w-full pt-6 px-4 md:px-6 lg:px-4 dark:bg-[#141414]">

      <div className="mb-8">
        <h1 className="text-2xl font-bold">Home</h1>
        <p className="text-gray-500">Welcome back {user?.username} sama!</p>
      </div>

      <div className="mb-8 flex justify-between">
        <div className="flex items-center gap-3 rounded-lg bg-white px-2 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
            <User size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total accounts</p>
            <p className="text-lg font-bold">{homeData?.total.accounts || 0}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
            <PersonStanding size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total patients</p>
            <p className="text-lg font-bold">{homeData?.total.patients || 0}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
          <Hospital size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total doctors</p>
            <p className="text-lg font-bold">{homeData?.total.doctors || 0}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
          <Hospital size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total appointments</p>
            <p className="text-lg font-bold">{homeData?.total.appointments || 0}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent events</h2>
          <div className="flex gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50">
              <ChevronLeft size={18} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-red-50 p-4">
            <div className="mb-4 flex justify-between">
              <h3 className="font-medium">Login</h3>
              <div className="flex h-8 w-8 p-2 items-center justify-center rounded-full bg-blue-500 text-white">
                <LogIn size={20} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h4 className="text-sm font-medium">
                {homeData?.recent.login || "abc"}
              </h4>
              <div className="flex gap-1">
                <div className="h-6 w-6 rounded-full bg-green-400"></div>
                <div className="h-6 w-6 rounded-full bg-blue-400"></div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-pink-50 p-4">
            <div className="mb-4 flex justify-between">
              <h3 className="font-medium">Logout</h3>
              <div className="flex p-2 h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white">
                <LogOut size={20} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h4 className="text-sm font-medium">{homeData?.recent.logout || "xyz"}</h4>
              <div className="flex gap-1">
                <div className="h-6 w-6 rounded-full bg-orange-400"></div>
                <div className="h-6 w-6 rounded-full bg-orange-300"></div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-yellow-50 p-4">
            <div className="mb-4 flex justify-between">
              <h3 className="font-medium">Sign-up</h3>
              <div className="flex h-8 w-8 p-2 items-center justify-center rounded-full bg-blue-500 text-white">
                <Signature size={20} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h4 className="text-sm font-medium">
              {homeData?.recent.login || "abc"}
              </h4>
              <div className="flex gap-1">
                <div className="h-6 w-6 rounded-full bg-blue-400"></div>
                <div className="h-6 w-6 rounded-full bg-blue-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Currently online users</h2>
          <a
            href="#"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            See all
            <ChevronRight size={16} />
          </a>
        </div>

        <div className="flex gap-6">
          {[
            "Anna Stewart",
            "Volter Anderson",
            "Alice Miller",
            "Monica Peterson",
          ].map((teacher, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative mb-2 h-16 w-16 overflow-hidden rounded-full border-2 border-white">
                <img
                  src={`/placeholder.svg?height=64&width=64`}
                  alt={teacher}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <p className="text-sm font-medium">{teacher.split(" ")[0]}</p>
              <p className="text-xs text-gray-500">{teacher.split(" ")[1]}</p>
            </div>
          ))}

          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50">
              <Plus size={24} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      {/* <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">My activity</h2>
          <a
            href="#"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            See all
            <ChevronRight size={16} />
          </a>
        </div>

        <div className="h-40">
          <div className="flex h-full items-end justify-between gap-2">
            <div className="flex w-full flex-col items-center">
              <div className="mb-2 h-[10%] w-4 rounded-full bg-gray-200"></div>
              <span className="text-xs text-gray-500">Mon</span>
            </div>
            <div className="flex w-full flex-col items-center">
              <div className="mb-2 h-[30%] w-4 rounded-full bg-gray-200"></div>
              <span className="text-xs text-gray-500">Tue</span>
            </div>
            <div className="flex w-full flex-col items-center">
              <div className="mb-2 h-[25%] w-4 rounded-full bg-gray-200"></div>
              <span className="text-xs text-gray-500">Wed</span>
            </div>
            <div className="flex w-full flex-col items-center">
              <div className="mb-2 h-[70%] w-4 rounded-full bg-indigo-500"></div>
              <span className="text-xs text-gray-500">Thu</span>
            </div>
            <div className="flex w-full flex-col items-center">
              <div className="mb-2 h-[40%] w-4 rounded-full bg-gray-200"></div>
              <span className="text-xs text-gray-500">Fri</span>
            </div>
            <div className="flex w-full flex-col items-center">
              <div className="mb-2 h-[50%] w-4 rounded-full bg-gray-200"></div>
              <span className="text-xs text-gray-500">Sat</span>
            </div>
            <div className="flex w-full flex-col items-center">
              <div className="mb-2 h-[20%] w-4 rounded-full bg-gray-200"></div>
              <span className="text-xs text-gray-500">Sun</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MainContent;
