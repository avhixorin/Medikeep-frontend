import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export interface SettingsNavProps {
  items: { href: string; title: string }[];
  className?: string;
}

export function SettingsNav({ className, items, ...props }: SettingsNavProps) {
  return (
    <nav
      className={cn(
        "flex space-x-6 border-b border-border px-4 md:px-6",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          end // Ensures exact match for root paths
          className={({ isActive }) =>
            cn(
              "flex py-4 border-b-2 border-transparent text-sm font-medium transition-colors",
              "text-gray-700 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200",
              isActive &&
                "border-primary text-black dark:text-white dark:border-secondary"
            )
          }
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
}
