import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { SettingsNav } from "./SettingsNav/SettingsNav";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const navItems = [
  { href: "/dashboard/settings/general", title: "settings.navItems.general" },
  { href: "/dashboard/settings/security", title: "settings.navItems.security" },
  { href: "/dashboard/settings/billing", title: "settings.navItems.billing" },
  {
    href: "/dashboard/settings/notifications",
    title: "settings.navItems.notifications",
  },
  { href: "/dashboard/settings/sharing", title: "settings.navItems.sharing" },
];

export default function SettingsPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { t } = useTranslation();
  const updateUrl = import.meta.env.VITE_UPDATE_SETTINGS_URL;
  const handleSettingsChange = async () => {
    try {
      const res = await fetch(updateUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ user, lastSeen: new Date() }),
      });

      if (res.ok) {
        toast.success("Settings updated");
      } else {
        toast.error("Failed to update settings");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full bg-transparent">
      <header className="flex items-center justify-between border-b px-4 py-3 md:px-6">
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold">{user?.firstName}</h1>
          <p className="text-sm text-muted-foreground">
            {t("settings.header.text")}
          </p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("settings.header.search")}
              className="w-[200px] pl-8"
            />
          </div>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            {t("settings.header.invite")}
          </Button>
          <Button size="sm">{t("settings.header.upgrade")}</Button>
          <img
            src={user?.profilePicture}
            alt="Avatar"
            className="h-8 w-8 rounded-full"
            width={32}
            height={32}
          />
        </div>
      </header>

      <SettingsNav items={navItems} />
      <div className="md:p-6 overflow-y-auto scrollbar-webkit">
        <Outlet />
      </div>
      <div className="md:p-6">
        <div className="container max-w-screen-lg py-6 bg-transparent flex items-center justify-end">
          <Button onClick={handleSettingsChange} className="ml-4">
            {t("settings.footer.save")}
          </Button>
        </div>
      </div>
    </div>
  );
}
