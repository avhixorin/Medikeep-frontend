import { RootState } from "@/redux/store/store";
import {
  ArrowBigLeft,
  CalendarPlus2,
  ChevronRight,
  Home,
  Hospital,
  PersonStanding,
  UsersRound,
} from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const LeftSide = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="col-span-2 border-r border-gray-100 p-4 flex flex-col gap-8 h-screen overflow-y-auto flex-shrink-0">
      <div className="mb-8 flex items-center justify-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md ">
          <img
            src="https://res.cloudinary.com/avhixorin/image/upload/v1726237530/titleIcon_h3ehnu.png"
            alt=""
          />
        </div>
        <h1 className="text-3xl font-bold">MediKeep</h1>
      </div>

      <nav className="space-y-1">
        <NavLink
          to="/admin"
          end
          className={({isActive}) => `${isActive ? "text-black" : "text-gray-600"} flex items-center gap-3 rounded-lg bg-gray-100 p-3 font-medium`}
        >
          <Home size={18} />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({isActive}) => `${isActive ? "text-black" : "text-gray-600"} flex items-center gap-3 rounded-lg p-3 font-medium  hover:bg-gray-50`}
        >
          <UsersRound size={18} />
          <span>All Users</span>
        </NavLink>
        <NavLink
          to="/admin/patients"
          className={({isActive}) => `${isActive ? "text-black" : "text-gray-600"} flex items-center gap-3 rounded-lg p-3 font-medium  hover:bg-gray-50`}
        >
          <PersonStanding size={18} />
          <span>Patients</span>
        </NavLink>
        <NavLink
          to="/admin/doctors"
          className={({isActive}) => `${isActive ? "text-black" : "text-gray-600"} flex items-center gap-3 rounded-lg p-3 font-medium  hover:bg-gray-50`}
        >
          <Hospital size={18} />
          <span>Doctors</span>
        </NavLink>
        <NavLink
          to="/admin/allAppoints"
          className={({isActive}) => `${isActive ? "text-black" : "text-gray-600"} flex items-center gap-3 rounded-lg p-3 font-medium  hover:bg-gray-50`}
        >
          <div className="flex items-center gap-3">
            <CalendarPlus2 size={18} />
            <span>Appointments</span>
          </div>
          <ChevronRight size={16} />
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({isActive}) => `${isActive ? "text-black" : "text-gray-600"} flex items-center gap-3 rounded-lg p-3 font-medium  hover:bg-gray-50`}
        >
          <ArrowBigLeft size={18} />
          <span>User Dash</span>
        </NavLink>
      </nav>

      <div className="mt-auto">
        <div className="mt-8 flex items-center gap-3 rounded-lg p-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <img
              src={user?.profilePicture}
              alt="User"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium">{user?.username}</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>

        {/* <button className="mt-4 flex w-full items-center gap-3 rounded-lg p-3 font-medium text-gray-600 hover:bg-gray-50">
          <LogOut size={18} />
          <span>Log out</span>
        </button> */}
      </div>
    </div>
  );
};

export default LeftSide;
