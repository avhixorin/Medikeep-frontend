"use client";

import { RootState } from "@/redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import {
  BellDot,
  Trash2,
  CheckCheck,
  Check,
  Square,
  SquareCheckBig,
} from "lucide-react";
import { useState } from "react";
import {
  markAsRead,
  deleteNotification,
  markMultipleAsRead,
  deleteMultipleNotifications,
} from "@/redux/features/notificationsSlice";
import { Button } from "@/components/ui/button";

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.auth.user?.notifications || []
  );

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (index: number) => {
    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const handleMarkAsRead = (index: number) => {
    dispatch(markAsRead(index));
  };

  const handleDelete = (index: number) => {
    dispatch(deleteNotification(index));
  };

  const handleBatchRead = () => {
    if (selected.length > 0) {
      dispatch(markMultipleAsRead(selected));
      setSelected([]);
    }
  };

  const handleBatchDelete = () => {
    if (selected.length > 0) {
      dispatch(deleteMultipleNotifications(selected));
      setSelected([]);
    }
  };

  const isSelected = (index: number) => selected.includes(index);

  return (
    <div className="bg-background p-5 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
          <BellDot className="w-5 h-5 text-primary" />
          Notifications
        </h2>

        {selected.length > 0 && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleBatchRead}
            >
              <Check className="w-4 h-4" />
              Mark Read
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleBatchDelete}
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        )}
      </div>

      {sortedNotifications.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center">
          No notifications yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {sortedNotifications.map((notif, index) => (
            <li
              key={index}
              className={`p-4 rounded-xl border flex justify-between items-start gap-4 transition-all hover:bg-accent/50 ${
                notif.read ? "bg-transparent" : "bg-muted/60"
              }`}
            >
              <div className="flex items-start gap-3 w-full">
                <button
                  onClick={() => toggleSelect(index)}
                  className="mt-1"
                  title="Select"
                >
                  {isSelected(index) ? (
                    <SquareCheckBig className="w-5 h-5 text-primary" />
                  ) : (
                    <Square className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                <div className="flex-1">
                  <p className="text-sm text-foreground">{notif.message}</p>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(notif.time), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-1">
                {!notif.read && (
                  <button
                    onClick={() => handleMarkAsRead(index)}
                    title="Mark as read"
                  >
                    <CheckCheck className="w-4 h-4 text-blue-600 hover:text-blue-800 transition" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(index)}
                  title="Delete"
                  className="transition"
                >
                  <Trash2 className="w-4 h-4 text-destructive hover:text-red-700" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
