import { RootState } from "@/redux/store/store";
import {
  ArrowBigLeft,
  CalendarPlus2,
  Home,
  Hospital,
  PersonStanding,
  UsersRound,
} from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const SideNavs = [
  {
    toLink: "/admin",
    icon: <Home size={22} />,
    text: "Home",
  },
  {
    toLink: "/admin/users",
    icon: <UsersRound size={22} />,
    text: "All Users",
  },
  {
    toLink: "/admin/patients",
    icon: <PersonStanding size={22} />,
    text: "Patients",
  },
  {
    toLink: "/admin/doctors",
    icon: <Hospital size={22} />,
    text: "Doctors",
  },
  {
    toLink: "/admin/allAppoints",
    icon: <CalendarPlus2 size={22} />,
    text: "Appointments",
  },
  {
    toLink: "/dashboard",
    icon: <ArrowBigLeft size={22} />,
    text: "User Dash",
  },
];
const LeftSide = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="col-span-2 border-r p-4 flex flex-col gap-8 h-screen overflow-y-auto flex-shrink-0 bg-transparent dark:bg-[#0A0A0A]">
      <div className="mb-8 flex items-center justify-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md ">
          <img
            src="https://res.cloudinary.com/avhixorin/image/upload/v1726237530/titleIcon_h3ehnu.png"
            alt=""
          />
        </div>

        <h1 className="text-3xl font-bold md:block hidden">MediKeep</h1>
      </div>

      <nav className="space-y-1">
        {SideNavs.map((navLink, i) => (
          <SideLink
            key={i}
            toLink={navLink.toLink}
            icon={navLink.icon}
            text={navLink.text}
          />
        ))}
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
          <div className="md:block hidden">
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
const SideLink = ({
  toLink,
  icon,
  text,
}: {
  toLink: string;
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <NavLink
      to={toLink}
      className={({ isActive }) =>
        `${
          isActive
            ? "text-gray-800 bg-gray-200 dark:bg-transparent dark:text-gray-100"
            : "text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-transparent dark:hover:text-gray-300"
        } flex items-center gap-3 rounded-lg p-3 font-medium  hover:bg-gray-50`
      }
    >
      {icon}
      <span className="hidden md:block font-medium">{text}</span>
    </NavLink>
  );
};
export default LeftSide;
