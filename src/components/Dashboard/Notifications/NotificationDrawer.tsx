import { RootState } from "@/redux/store/store";
import React from "react";
import { useSelector } from "react-redux";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface NotificationDrawerProps {
  setIsOpen: (isOpen: boolean) => void;
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  setIsOpen,
}) => {
  const notifications = useSelector(
    (state: RootState) => state.auth.user?.notifications
  );

  const sortedNotifications = notifications
    ? [...notifications].sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="relative w-[90%] max-w-md bg-white dark:bg-[#0d121a] rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Notifications
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-4 space-y-4">
          {sortedNotifications.length > 0 ? (
            sortedNotifications.map((notification, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-sm flex justify-between items-start"
              >
                <p className="text-sm text-gray-700 dark:text-gray-300 flex-1 font-medium">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 ml-4 whitespace-nowrap font-medium">
                  {format(new Date(notification.time), "MM/dd/yy hh:mm a")}
                </p>
                {/* <button
                  onClick={() => handleRemoveNotification(notification.time)}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition ml-4"
                  aria-label="Clear Notification"
                >
                  <X className="w-4 h-4" />
                </button> */}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No notifications available.
            </p>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={() => setIsOpen(false)}
            className="w-full py-2 px-4 rounded-lg transition"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDrawer;
