import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { useTranslation } from "react-i18next";

const NotificationSetting: React.FC = () => {
  const { t } = useTranslation();
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
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("settings.notifications.title3")}</Label>
              <div className="text-sm text-muted-foreground">
              {t("settings.notifications.text3")}
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("settings.notifications.title4")}</Label>
              <div className="text-sm text-muted-foreground">
              {t("settings.notifications.text4")}
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("settings.notifications.title5")}</Label>
              <div className="text-sm text-muted-foreground">
              {t("settings.notifications.text5")}
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("settings.notifications.title6")}</Label>
              <div className="text-sm text-muted-foreground">
              {t("settings.notifications.text6")}
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("settings.notifications.title7")}</Label>
              <div className="text-sm text-muted-foreground">
              {t("settings.notifications.text7")}
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("settings.notifications.title8")}</Label>
              <div className="text-sm text-muted-foreground">
              {t("settings.notifications.text8")}
              </div>
            </div>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSetting;
