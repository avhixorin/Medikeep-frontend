import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

interface SettingsNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
  currentPath: string
}

export function SettingsNav({ className, items, currentPath, ...props }: SettingsNavProps) {
  return (
    <nav
      className={cn(
        "flex space-x-6 border-b border-border px-4 md:px-6",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex py-4 border-b-2 border-transparent text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
            currentPath === item.href &&
              "border-primary text-primary"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

