import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export interface SettingsNavProps {
  items: { href: string; title: string }[]; // `title` should be a translation key
  className?: string;
}

export function SettingsNav({ className, items, ...props }: SettingsNavProps) {
  const { t } = useTranslation(); 

  return (
    <nav
      className={cn(
        "flex space-x-6 flex-wrap border-b border-border px-4 md:px-6",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          end
          className={({ isActive }) =>
            cn(
              "flex py-4 border-b-2 border-transparent text-sm font-medium transition-colors",
              "text-gray-700 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200",
              isActive &&
                "border-primary text-black dark:text-white dark:border-secondary"
            )
          }
        >
          {t(item.title)}
        </NavLink>
      ))}
    </nav>
  );
}
