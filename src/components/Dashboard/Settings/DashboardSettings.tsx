import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { SettingsNav } from "./SettingsNav/SettingsNav";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InviteScreen from "./InviteScreen";
import SearchScreen from "./SearchScreen";
import useUpdate from "@/hooks/useUpdate";

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
  const [updating, setUpdating] = useState(false);
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const updateUrl = import.meta.env.VITE_UPDATE_URL;
  const { updateField } = useUpdate(updateUrl);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      setFocused(true);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleUserUpdate = async () => {
    setUpdating(true);
    if (user) await updateField(user);
    else console.log("User not found");
    setUpdating(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full h-full bg-transparent">
      {isInviting && <InviteScreen onClose={() => setIsInviting(false)} />}
      {search.length > 0 && (
        <SearchScreen searchText={search} setSearch={setSearch} />
      )}

      <header className="flex items-center justify-between border-b px-4 py-3 md:px-6 relative">
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
              ref={inputRef}
              type="search"
              placeholder={t("settings.header.search")}
              className="w-[200px] pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus={focused}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 text-xs text-muted-foreground">
              <kbd className="px-1.5 py-0.5 bg-gray-300 rounded">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-1.5 py-0.5 bg-gray-300 rounded">K</kbd>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsInviting(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            {t("settings.header.invite")}
          </Button>
          <Button
            size="sm"
            onClick={() => navigate("/dashboard/settings/billing")}
          >
            {t("settings.header.upgrade")}
          </Button>
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

      <main className="md:p-6 overflow-y-auto scrollbar-webkit">
        <Outlet />
      </main>

      <footer className="md:p-6">
        <div className="container max-w-screen-lg py-6 bg-transparent flex items-center justify-end">
          <Button
            onClick={handleUserUpdate}
            disabled={updating}
            className="ml-4 disabled:opacity-50"
          >
            {updating ? "Saving changes..." : t("settings.footer.save")}
          </Button>
        </div>
      </footer>
    </div>
  );
}
