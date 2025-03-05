import {
  BarChart3,
  BookOpen,
  Calendar,
  ChevronRight,
  Grid,
  Home,
  LogOut,
  Star,
} from "lucide-react";

const LeftSide = () => {
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
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg bg-gray-100 p-3 font-medium"
        >
          <Home size={18} />
          <span>Home</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg p-3 font-medium text-gray-600 hover:bg-gray-50"
        >
          <Grid size={18} />
          <span>All courses</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg p-3 font-medium text-gray-600 hover:bg-gray-50"
        >
          <Star size={18} />
          <span>Popular courses</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg p-3 font-medium text-gray-600 hover:bg-gray-50"
        >
          <Calendar size={18} />
          <span>Schedule</span>
        </a>
        <a
          href="#"
          className="flex items-center justify-between rounded-lg p-3 font-medium text-gray-600 hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <BookOpen size={18} />
            <span>My courses</span>
          </div>
          <ChevronRight size={16} />
        </a>
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg p-3 font-medium text-gray-600 hover:bg-gray-50"
        >
          <BarChart3 size={18} />
          <span>Statistics</span>
        </a>
      </nav>

      <div className="mt-auto">
        <div className="mt-8 flex items-center gap-3 rounded-lg p-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="User"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium">Volter Anderson</p>
            <p className="text-xs text-gray-500">Premium plan</p>
          </div>
        </div>

        <button className="mt-4 flex w-full items-center gap-3 rounded-lg p-3 font-medium text-gray-600 hover:bg-gray-50">
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default LeftSide;
