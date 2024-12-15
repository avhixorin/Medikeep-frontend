import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { SettingsNav } from "./SettingsNav/SettingsNav";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Outlet } from "react-router-dom";

const navItems = [
  { href: "/dashboard/settings/general", title: "General" },
  { href: "/dashboard/settings/security", title: "Security" },
  { href: "/dashboard/settings/billing", title: "Billing" },
  { href: "/dashboard/settings/notifications", title: "Notifications" },
  { href: "/dashboard/settings/sharing", title: "Sharing" },
];

export default function SettingsPage() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="w-full h-full bg-transparent">
      <header className="flex items-center justify-between border-b px-4 py-3 md:px-6">
        <div>
          <h1 className="text-lg font-semibold">{user?.firstName}</h1>
          <p className="text-sm text-muted-foreground">
            Manage your details and personal preferences here.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="w-[200px] pl-8"
            />
          </div>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Invite
          </Button>
          <Button size="sm">Upgrade</Button>
          <img
            src={user?.profilePicture}
            alt="Avatar"
            className="h-8 w-8 rounded-full"
            width={32}
            height={32}
          />
        </div>
      </header>

      <SettingsNav 
        items={navItems}
      />

      <div className="p-6 overflow-y-auto scrollbar-webkit">
        <Outlet />
      </div>
    </div>
  );
}
