import { ChevronDown, ChevronRight, Search } from "lucide-react";

const RightSide = () => {
  return (
    <div className="col-span-3 border-l border-gray-100 p-4 overflow-y-auto scrollbar-thin scrollbar-webkit">
      <div className="mb-4 flex items-center justify-between">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-full bg-gray-100 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="ml-4 flex gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                fill="none"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* English Test Card */}
      <div className="mb-4 overflow-hidden rounded-xl bg-blue-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Test your English level!</h3>
          <div className="flex h-12 w-12 items-center justify-center">
            <img
              src="/placeholder.svg?height=48&width=48"
              alt="ABC"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </div>
        <button className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">
          Pass test
        </button>
      </div>

      {/* Course Progress Card */}
      <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
        <h3 className="font-bold">English for travelling</h3>
        <p className="text-sm text-gray-500">Start date: 04/09/2024</p>

        <div className="my-4 flex items-center gap-4">
          <div className="relative h-16 w-16">
            <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E6E6E6"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeDasharray="64, 100"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
              64%
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tutor: Volter Anderson</p>
          </div>
        </div>
      </div>

      {/* My Courses */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">My courses</h2>
          <button className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm hover:bg-gray-50">
            All subjects
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z"
                  fill="#F97316"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Tags in layout</h3>
              <p className="text-xs text-gray-500">
                10 lecture · 5 practical work
              </p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>

          <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 19C5 19.55 5.45 20 6 20H18C18.55 20 19 19.55 19 19C19 18.45 18.55 18 18 18H6C5.45 18 5 18.45 5 19ZM12 2C8.69 2 6 4.69 6 8C6 12.5 12 19 12 19C12 19 18 12.5 18 8C18 4.69 15.31 2 12 2ZM12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10Z"
                  fill="#3B82F6"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Chemistry is easy!</h3>
              <p className="text-xs text-gray-500">
                8 lecture · 4 practical work
              </p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>

          <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"
                  fill="#22C55E"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Economic Geography</h3>
              <p className="text-xs text-gray-500">
                8 lecture · 4 practical work
              </p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>

          <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H14V17H7V15Z"
                  fill="#8B5CF6"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Maths in simple terms</h3>
              <p className="text-xs text-gray-500">
                24 lecture · 16 practical work
              </p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
