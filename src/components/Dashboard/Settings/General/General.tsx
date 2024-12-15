import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import useTheme from "@/hooks/useTheme";
import React from "react";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import Upload from "@/utils/Upload";

const General = () => {
  const [uploadClicked, setUploadClicked] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const user = useSelector((state: RootState) => state.auth.user)
  const cancelUpload = () => {
    setUploadClicked(false);
  };
  return (
    <div className="container max-w-screen-lg py-6 bg-transparent">
      {uploadClicked && (
        <Upload
          cancelUpload={cancelUpload}
          setUploadClicked={setUploadClicked}
        />
      )}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">General</h2>
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
              <Button
                variant="outline"
                size="sm"
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
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium">Preferences</h2>
          <div className="mt-6 space-y-6">
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

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Enable Notifications</Label>
                <div>Turn notifications on or off</div>
              </div>
              <Switch />
            </div>

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
  );
};

export default General;
