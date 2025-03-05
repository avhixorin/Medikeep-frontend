import { ChevronLeft, ChevronRight } from "lucide-react";

const MainContent = () => {
  return (
    <div className="bg-transparent pt-6 px-4 md:px-6 lg:px-4 dark:bg-[#141414]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Home</h1>
        <p className="text-gray-500">Welcome back!</p>
      </div>

      {/* Balance Info */}
      <div className="mb-8 flex gap-6">
        <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.31 11.14C10.54 10.69 9.97 10.2 9.97 9.47C9.97 8.63 10.76 8.04 12.07 8.04C13.45 8.04 13.97 8.7 14.01 9.68H15.72C15.67 8.34 14.85 7.11 13.23 6.71V5H10.9V6.69C9.39 7.01 8.18 7.99 8.18 9.5C8.18 11.29 9.67 12.19 11.84 12.71C13.79 13.17 14.18 13.86 14.18 14.58C14.18 15.11 13.79 15.97 12.08 15.97C10.48 15.97 9.85 15.25 9.76 14.33H8.04C8.14 16.03 9.4 16.99 10.9 17.3V19H13.24V17.33C14.76 17.04 15.96 16.17 15.97 14.56C15.96 12.36 14.07 11.6 12.31 11.14Z"
                fill="black"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">My Balance</p>
            <p className="text-lg font-bold">$ 323</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z"
                fill="black"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Deposit</p>
            <p className="text-lg font-bold">5 lesson</p>
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

      {/* Upcoming Classes */}
      {/* <div className="mb-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-sm font-medium">10:00</p>
          </div>
          <div className="flex flex-1 items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 3C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H5ZM5 5H19V19H5V5ZM7 7V9H17V7H7ZM7 11V13H17V11H7ZM7 15V17H14V15H7Z"
                  fill="black"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium">Math in</p>
              <p className="text-sm text-gray-500">Simple Terms</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-sm font-medium">12:00</p>
          </div>
          <div className="flex flex-1 items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <Edit2 size={20} />
            </div>
            <div>
              <p className="font-medium">Chemistry</p>
              <p className="text-sm text-gray-500">Is Easy!</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Teachers */}
      {/* <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Your teachers</h2>
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
      </div> */}

      {/* Popular Courses */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Popular courses</h2>
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
              <h3 className="font-medium">Languages</h3>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h4 className="text-sm font-medium">
                German Grammar and Vocabulary
              </h4>
              <div className="flex gap-1">
                <div className="h-6 w-6 rounded-full bg-green-400"></div>
                <div className="h-6 w-6 rounded-full bg-blue-400"></div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-pink-50 p-4">
            <div className="mb-4 flex justify-between">
              <h3 className="font-medium">Maths</h3>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM11 7H13V11H17V13H13V17H11V13H7V11H11V7Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h4 className="text-sm font-medium">Logic and Problem Solving</h4>
              <div className="flex gap-1">
                <div className="h-6 w-6 rounded-full bg-orange-400"></div>
                <div className="h-6 w-6 rounded-full bg-orange-300"></div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-yellow-50 p-4">
            <div className="mb-4 flex justify-between">
              <h3 className="font-medium">Chemistry</h3>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 19C5 19.55 5.45 20 6 20H18C18.55 20 19 19.55 19 19C19 18.45 18.55 18 18 18H6C5.45 18 5 18.45 5 19ZM12 2C8.69 2 6 4.69 6 8C6 12.5 12 19 12 19C12 19 18 12.5 18 8C18 4.69 15.31 2 12 2ZM12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h4 className="text-sm font-medium">
                Chemistry and the Environment
              </h4>
              <div className="flex gap-1">
                <div className="h-6 w-6 rounded-full bg-blue-400"></div>
                <div className="h-6 w-6 rounded-full bg-blue-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
