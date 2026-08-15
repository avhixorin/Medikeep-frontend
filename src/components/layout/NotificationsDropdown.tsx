import { useEffect, useRef, useState } from 'react';
import {
  Bell,
  UserPlus,
  CalendarClock,
  MessageSquare,
  Info,
  Check,
  Trash2,
  Inbox,
} from 'lucide-react';
import { useUIStore } from '@/stores';
import { useNotifications } from '@/hooks/useNotifications';
import { cn } from '@/lib/utils';

const TYPE_ICONS = {
  connection: UserPlus,
  appointment: CalendarClock,
  message: MessageSquare,
  system: Info,
} as const;

function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadNotificationsCount } = useUIStore();
  const {
    notifications: serverNotifications,
    isLoading,
    refetch,
    markRead,
    markAllRead,
    clearAll,
    isClearing,
  } = useNotifications();

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next) {
      refetch();
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const items = notifications.length > 0 ? notifications : serverNotifications.map((n) => ({
    id: n._id,
    type: n.type,
    title: n.message,
    message: n.message,
    time: n.time,
    read: n.read,
  }));

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={handleToggle}
        className="relative rounded-md p-2 hover:bg-accent cursor-pointer"
        aria-label={`Notifications${unreadNotificationsCount > 0 ? ` (${unreadNotificationsCount} unread)` : ''}`}
        aria-expanded={isOpen}
      >
        <Bell className="h-5 w-5" />
        {unreadNotificationsCount > 0 && (
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-lg border bg-background shadow-lg">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="text-sm font-semibold">Notifications</h3>
            <div className="flex items-center gap-1">
              {unreadNotificationsCount > 0 && (
                <button
                  type="button"
                  onClick={() => markAllRead()}
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer"
                >
                  <Check className="h-3.5 w-3.5" />
                  Mark all read
                </button>
              )}
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={() => clearAll()}
                  disabled={isClearing}
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {isLoading && items.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-10 text-muted-foreground">
                <Bell className="h-6 w-6 animate-pulse" />
                <p className="text-sm">Loading notifications…</p>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-10 text-muted-foreground">
                <Inbox className="h-8 w-8" />
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              <ul className="divide-y">
                {items.map((item) => {
                  const Icon =
                    TYPE_ICONS[item.type as keyof typeof TYPE_ICONS] ?? Info;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => {
                          markRead([item.id]);
                        }}
                        className={cn(
                          'flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-accent/50 cursor-pointer',
                          !item.read && 'bg-accent/30'
                        )}
                      >
                        <span
                          className={cn(
                            'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                            item.type === 'connection' && 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
                            item.type === 'appointment' && 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400',
                            item.type === 'message' && 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
                            item.type === 'system' && 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={cn(
                              'block text-sm leading-snug',
                              !item.read && 'font-medium'
                            )}
                          >
                            {item.message}
                          </span>
                          {item.time && (
                            <span className="mt-0.5 block text-xs text-muted-foreground">
                              {formatRelativeTime(item.time)}
                            </span>
                          )}
                        </span>
                        {!item.read && (
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}