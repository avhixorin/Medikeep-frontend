import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarMenu className="flex flex-col gap-2 pt-4">
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link href={item.url} passHref legacyBehavior>
              <SidebarMenuButton
                tooltip={item.title}
                className="flex items-center gap-3 px-2 py-3 cursor-pointer"
              >
                {item.icon && (
                  <item.icon
                    className="min-w-[1.25rem] min-h-[1.25rem] text-muted-foreground"
                    strokeWidth={1.8}
                  />
                )}
                <span className="text-base tracking-wide font-sans">
                  {item.title}
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
