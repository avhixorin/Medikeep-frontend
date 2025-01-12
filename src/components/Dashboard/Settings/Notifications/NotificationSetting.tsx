import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { updateNotificationSettings } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store/store";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const NotificationSetting: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const settingPref = useSelector((state: RootState) => state.auth.user?.settingPreferences);
  return (
    <div className="container max-w-screen-lg py-6 bg-transparent">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">{t("settings.notifications.title1")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("settings.notifications.text1")}
          </p>
        </div>
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("settings.notifications.title2")}</Label>
              <div className="text-sm text-muted-foreground">
              {t("settings.notifications.text2")}
              </div>
            </div>
            <Switch checked={settingPref?.notifications.isEnabled} onCheckedChange={() => dispatch(updateNotificationSettings({key: "isEnabled", value: !settingPref?.notifications.isEnabled}))}/>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("settings.notifications.title3")}</Label>
              <div className="text-sm text-muted-foreground">
              {t("settings.notifications.text3")}
              </div>
            </div>
            <Switch checked={settingPref?.notifications.emailNotifications} onCheckedChange={() => dispatch(updateNotificationSettings({key: "emailNotifications", value: !settingPref?.notifications.emailNotifications}))}/>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("settings.notifications.title4")}</Label>
              <div className="text-sm text-muted-foreground">
              {t("settings.notifications.text4")}
              </div>
            </div>
            <Switch checked={settingPref?.notifications.pushNotifications} onCheckedChange={() => dispatch(updateNotificationSettings({key: "pushNotifications", value: !settingPref?.notifications.pushNotifications}))}/>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("settings.notifications.title5")}</Label>
              <div className="text-sm text-muted-foreground">
              {t("settings.notifications.text5")}
              </div>
            </div>
            <Switch checked={settingPref?.notifications.smsNotifications} onCheckedChange={() => dispatch(updateNotificationSettings({key: "smsNotifications", value: !settingPref?.notifications.smsNotifications}))}/>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("settings.notifications.title6")}</Label>
              <div className="text-sm text-muted-foreground">
              {t("settings.notifications.text6")}
              </div>
            </div>
            <Switch checked={settingPref?.notifications.promotionalEmails} onCheckedChange={() => dispatch(updateNotificationSettings({key: "promotionalEmails", value: !settingPref?.notifications.promotionalEmails}))}/>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("settings.notifications.title7")}</Label>
              <div className="text-sm text-muted-foreground">
              {t("settings.notifications.text7")}
              </div>
            </div>
            <Switch checked={settingPref?.notifications.notificationSound} onCheckedChange={() => dispatch(updateNotificationSettings({key: "notificationSound", value: !settingPref?.notifications.notificationSound}))}/>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("settings.notifications.title8")}</Label>
              <div className="text-sm text-muted-foreground">
              {t("settings.notifications.text8")}
              </div>
            </div>
            <Switch checked={settingPref?.notifications.weeklyDigest} onCheckedChange={() => dispatch(updateNotificationSettings({key: "weeklyDigest", value: !settingPref?.notifications.weeklyDigest}))}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSetting;
