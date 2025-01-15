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
import {
  updateGeneralSettings,
  updateUserFields,
} from "@/redux/features/authSlice";

const General = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [uploadClicked, setUploadClicked] = React.useState(false);
  const [fieldState, setFieldsState] = React.useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    about: user?.about,
    username: user?.username,
    email: user?.email,
  });
  const [fieldsStatus, setFieldsStatus] = React.useState({
    firstName: false,
    lastName: false,
    about: false,
    username: false,
    email: false,
  });
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = React.useState(i18n.language);
  const { toggleTheme } = useTheme();

  const cancelUpload = () => {
    setUploadClicked(false);
  };

  const handleFieldChange = (field: string, value: string | boolean) => {
    setFieldsState((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleEditToggle = (field: keyof typeof fieldsStatus) => {
    setFieldsStatus((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const saveField = (field: keyof typeof fieldState) => {
    if (
      field === "firstName" ||
      field === "lastName" ||
      field === "username" ||
      field === "email" ||
      field === "about"
    ) {
      dispatch(updateUserFields(fieldState));
    } else {
      dispatch(
        updateGeneralSettings({ key: field, value: fieldState[field] || "" })
      );
    }
    handleEditToggle(field);
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

            {Object.keys(fieldState).map((key) => (
              <div key={key} className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>{t(`settings.general.${key}`)}</Label>
                  {fieldsStatus[key as keyof typeof fieldsStatus] ? (
                    <input
                      type="text"
                      className="border rounded ml-2 px-2 py-1 dark:bg-black bg-white text-slate-800 dark:text-gray-200"
                      value={fieldState[key as keyof typeof fieldState] || ""}
                      onChange={(e) => handleFieldChange(key, e.target.value)}
                    />
                  ) : (
                    <div>
                      {fieldState[key as keyof typeof fieldState] || "N/A"}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {fieldsStatus[key as keyof typeof fieldsStatus] ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          saveField(key as keyof typeof fieldState)
                        }
                      >
                        {t("settings.general.save")}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleEditToggle(key as keyof typeof fieldsStatus)
                        }
                      >
                        {t("settings.general.cancel")}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleEditToggle(key as keyof typeof fieldsStatus)
                      }
                    >
                      {t("settings.general.edit")}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium">
            {t("settings.general.preferences")}
          </h2>
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>{t("settings.general.theme")}</Label>
                <div>
                  {t("settings.general.light")} / {t("settings.general.dark")}
                </div>
              </div>
              <Switch
                checked={user?.settingPreferences?.general.theme === "dark"}
                onCheckedChange={toggleTheme}
              />
            </div>

            <div className="space-y-1">
              <Label>{t("settings.general.language")}</Label>
              <Select
                defaultValue={
                  user?.settingPreferences?.general.language || i18n.language
                }
                value={language}
                onValueChange={(value) => {
                  i18n.changeLanguage(value);
                  setLanguage(value);
                  dispatch(updateGeneralSettings({ key: "language", value }));
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">
                    {t("settings.general.english")}
                  </SelectItem>
                  <SelectItem value="hi">
                    {t("settings.general.hindi")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>{t("settings.general.accountPrivacy")}</Label>
                <div>
                  {" "}
                  {t("settings.general.public")} /{" "}
                  {t("settings.general.private")}
                </div>
              </div>
              <Switch
                checked={
                  user?.settingPreferences?.general.accountPrivacy === "Private"
                }
                onCheckedChange={() =>
                  dispatch(
                    updateGeneralSettings({
                      key: "accountPrivacy",
                      value:
                        user?.settingPreferences?.general.accountPrivacy ===
                        "Private"
                          ? "Public"
                          : "Private",
                    })
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
