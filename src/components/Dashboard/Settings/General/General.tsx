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
import { useDispatch, useSelector } from "react-redux";
import Upload from "@/utils/Upload";
import { useTranslation } from "react-i18next";
import { updateGeneralSettings } from "@/redux/features/authSlice";

const General = () => {
  const [uploadClicked, setUploadClicked] = React.useState(false);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = React.useState(i18n.language);
  const { toggleTheme } = useTheme();
  const localTheme = localStorage.getItem("theme");
  const user = useSelector((state: RootState) => state.auth.user);
  const cancelUpload = () => {
    setUploadClicked(false);
  };
  const dispatch = useDispatch();
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
          <h2 className="text-lg font-medium">{t("settings.general.title")}</h2>
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>{t("settings.general.photo")}</Label>
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
                {t("settings.general.edit")}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>{t("settings.general.name")}</Label>
                <div>{user?.firstName} {user?.lastName}</div>
              </div>
              <Button variant="outline" size="sm">
              {t("settings.general.edit")}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>{t("settings.general.email")}</Label>
                <div>{user?.email}</div>
              </div>
              <Button variant="outline" size="sm">
              {t("settings.general.edit")}
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium">{t("settings.general.preferences")}</h2>
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>{t("settings.general.theme")}</Label>
                <div>{t("settings.general.light")} / {t("settings.general.dark")}</div>
              </div>
              <Switch
                checked={user?.settingPreferences?.general.theme === "dark" || localTheme === "dark"}
                onCheckedChange={toggleTheme}
              />
            </div>

            <div className="space-y-1">
              <Label>{t("settings.general.language")}</Label>
              <Select
                defaultValue={user?.settingPreferences?.general.language || i18n.language}
                value={language}
                onValueChange={(value) => {
                  i18n.changeLanguage(value);
                  setLanguage(value);
                  dispatch(updateGeneralSettings({key: "language", value}));
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t("settings.general.english")}</SelectItem>
                  <SelectItem value="hi">{t("settings.general.hindi")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* <div className="space-y-1">
              <Label>{t("settings.general.dateFormat")}</Label>
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
            </div> */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>{t("settings.general.accountPrivacy")}</Label>
                <div>{t("settings.general.private")} / {t("settings.general.public")}</div>
              </div>
              <Switch checked={user?.settingPreferences?.general.accountPrivacy === "Private"} onCheckedChange={() => dispatch(updateGeneralSettings({key:"accountPrivacy", value: user?.settingPreferences?.general.accountPrivacy === "Private" ? "Public" : "Private"}))}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
