import useActiveFriends from "@/hooks/useActiveFriends";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

const Calls: React.FC = () => {
    // Mock data for friends and recent calls
    const friends = [
      { id: 1, name: "Alice", status: "Online" },
      { id: 2, name: "Bob", status: "Offline" },
      { id: 3, name: "Charlie", status: "Online" },
    ];
  
    const recents = [
      { id: 1, name: "David", time: "Yesterday, 3:00 PM" },
      { id: 2, name: "Eve", time: "Today, 10:00 AM" },
      { id: 3, name: "Frank", time: "2 days ago, 6:30 PM" },
    ];
    const { getUserStatus } = useActiveFriends();
    const user = useSelector((state: RootState) => state.auth.user);
    return (
      <div className="w-full h-full flex flex-col justify-start items-center bg-transparent dark:bg-[#141414] px-4 py-2 gap-4">
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="max-md:w-full flex justify-between md:justify-normal items-start md:items-center gap-3 relative">
              <h1 className="text-lg md:text-3xl font-semibold text-zinc-700 dark:text-gray-200">
                Calls
              </h1>
            </div>
          </div>
        </div>
  
        <div className="w-full h-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-md grid grid-cols-2">
          {/* Friends Section */}
          <div className="w-full h-full p-4 border-r border-gray-300 dark:border-gray-700">
            <div className="max-md:w-full flex justify-between md:justify-normal items-start md:items-center gap-3 relative">
              <h1 className="text-lg md:text-2xl font-semibold text-zinc-700 dark:text-gray-200">
                Friends
              </h1>
            </div>
            <div className="w-full flex flex-col gap-4 mt-4">
              {user?.connections?.map((connection) => (
                <div
                  key={connection._id}
                  className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm"
                >
                  <span className="text-sm md:text-lg font-medium text-zinc-700 dark:text-gray-200">
                    {connection.firstName} {connection.lastName}
                  </span>
                  <span
                    className={`text-xs md:text-sm ${
                        getUserStatus(connection._id!) === "Online" ? "text-green-500" : "text-gray-500"
                    }`}
                  >
                    {getUserStatus(connection._id!)}
                  </span>
                </div>
              ))}
            </div>
          </div>
  
          {/* Recents Section */}
          <div className="w-full h-full p-4">
            <div className="max-md:w-full flex justify-between md:justify-normal items-start md:items-center gap-3 relative">
              <h1 className="text-lg md:text-2xl font-semibold text-zinc-700 dark:text-gray-200">
                Recents
              </h1>
            </div>
            <div className="w-full flex flex-col gap-4 mt-4">
              {recents.map((recent) => (
                <div
                  key={recent.id}
                  className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm"
                >
                  <span className="text-sm md:text-lg font-medium text-zinc-700 dark:text-gray-200">
                    {recent.name}
                  </span>
                  <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    {recent.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Calls;
  