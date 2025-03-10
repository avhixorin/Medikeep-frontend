import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DEFAULT_AVATAR } from "@/constants/constVars";
import { User } from "@/types/types";

const UserCard = ({
  user,
  setIsViewing,
  setSelectedUser,
}: {
  user: Partial<User>;
  setIsViewing: (arg0: boolean) => void;
  setSelectedUser: (user: Partial<User>) => void;
}) => {
  return (
    <Card className="w-full max-w-96 bg-white dark:bg-black rounded-2xl shadow-xl py-2 border border-gray-200 dark:border-gray-700 flex justify-center items-center">
      <CardContent>
        <div className="flex items-center gap-4">
          <img
            src={user.profilePicture || DEFAULT_AVATAR}
            alt="User Avatar"
            className="w-18 h-16 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.username?.[0] === "@" ? "" : "@"}
              {user.username}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300 overflow-hidden">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
          </div>
          <div className="w-full flex flex-col justify-evenly items-end">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Gender:</span> {user.gender}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Role:</span> {user.role}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            className="px-4 py-2 rounded-lg transition-all"
            onClick={() => {
              setIsViewing(true);
              setSelectedUser(user);
            }}
          >
            View Full Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
