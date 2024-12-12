import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { SettingsNav } from "./SettingsNav/SettingsNav";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import useTheme from "@/hooks/useTheme";
import Upload from "../Profile/Upload/Upload";
import { useState } from "react";

const navItems = [
  { href: "/settings/general", title: "General" },
  { href: "/settings/security", title: "Security" },
  { href: "/settings/billing", title: "Billing" },
  { href: "/settings/notifications", title: "Notifications" },
  { href: "/settings/apps", title: "Apps" },
  { href: "/settings/branding", title: "Branding" },
  { href: "/settings/refer", title: "Refer a friend" },
  { href: "/settings/sharing", title: "Sharing" },
];

export default function SettingsPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { theme, toggleTheme } = useTheme();
  const [uploadClicked, setUploadClicked] = useState(false);

  const cancelUpload = () => {
    setUploadClicked(false);
  }
  return (
    <div className="min-h-screen bg-transparent">
      {uploadClicked && <Upload cancelUpload={cancelUpload} setUploadClicked={setUploadClicked} />}
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

      <SettingsNav items={navItems} currentPath="/settings/general" />

      <div className="container max-w-screen-lg py-6 bg-transparent">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium">Basics</h2>
            <div className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Photo</Label>
                  <div className="mt-2">
                    <img
                      src={user?.profilePicture}
                      alt="Profile"
                      className="h-16 w-16 rounded-full"
                      width={64}
                      height={64}
                    />
                  </div>
                </div>
                <Button variant="outline" size="sm"
                onClick={() => setUploadClicked(true)}
                >
                  Edit
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Name</Label>
                  <div>{user?.firstName}</div>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Email address</Label>
                  <div>{user?.email}</div>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>

              <div className="space-y-4">
                <Label>Linked team account</Label>
                <p className="text-sm text-muted-foreground">
                  Easily switch between them and access both accounts from any
                  device.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-zinc-100" />
                      <div>OpenVoid</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage team
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100" />
                      <div>Sisyphus Ventures</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage team
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium">Preferences</h2>
            <div className="mt-6 space-y-6">
              {/* Theme Setting */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Theme</Label>
                  <div>Light / Dark</div>
                </div>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                />
              </div>

              {/* Time Zone Setting */}
              <div className="space-y-1">
                <Label>Time Zone</Label>
                <Select defaultValue="GMT+07:00">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GMT-05:00">
                      GMT -05:00 (Eastern Time)
                    </SelectItem>
                    <SelectItem value="GMT+00:00">GMT +00:00 (UTC)</SelectItem>
                    <SelectItem value="GMT+07:00">
                      GMT +07:00 (Bangkok Time)
                    </SelectItem>
                    <SelectItem value="GMT+10:00">
                      GMT +10:00 (Sydney Time)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Language Setting */}
              <div className="space-y-1">
                <Label>Language</Label>
                <Select defaultValue="en-GB">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-GB">English UK</SelectItem>
                    <SelectItem value="en-US">English US</SelectItem>
                    <SelectItem value="fr-FR">French</SelectItem>
                    <SelectItem value="es-ES">Spanish</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* <div className="space-y-1">
                <Label>Themes</Label>
                <Select defaultValue="default"
                onValueChange={(value) => setTheme(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="retro">Retro</SelectItem>
                    <SelectItem value="synthwave">Synthwave</SelectItem>
                    <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}

              {/* Date Format Setting */}
              <div className="space-y-1">
                <Label>Date Format</Label>
                <Select defaultValue="dd/mm/yyyy">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="yyyy/mm/dd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notifications Setting */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Enable Notifications</Label>
                  <div>Turn notifications on or off</div>
                </div>
                <Switch />
              </div>

              {/* Account Privacy Setting */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Account Privacy</Label>
                  <div>Private / Public</div>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
