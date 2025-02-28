import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import {
  updateSecuritySettings,
} from "@/redux/features/authSlice";
import { useTranslation } from "react-i18next";
import UpdatePasswordScreen from "./UpdatePasswordScreen";
import ConfirmDeletionScreen from "./ConfirmDeletionScreen";

const Security: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [confirmedDel, setConfirmedDel] = React.useState(false);
  const [isChangingPassword, setIsChangingPassword] = React.useState(false);
  const dispatch = useDispatch();
  
  const { t } = useTranslation();
  return (
    <div className="container max-w-screen-lg py-6 bg-transparent">
      {
        isChangingPassword && (
          <UpdatePasswordScreen onClose={setIsChangingPassword} />
        )
      }
      {
        confirmedDel && (
          <ConfirmDeletionScreen onCancel={setConfirmedDel} />
        )
      }
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">
            {t("settings.security.title1")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("settings.security.text1")}
          </p>
        </div>
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("settings.security.title2")}</Label>
              <div className="text-sm text-muted-foreground">
                {t("settings.security.text2")}
              </div>
            </div>
            <Switch
              checked={user?.settingPreferences?.security.twoFactorAuth}
              onCheckedChange={() =>
                dispatch(
                  updateSecuritySettings({
                    key: "twoFactorAuth",
                    value: !user?.settingPreferences?.security.twoFactorAuth,
                  })
                )
              }
            />
          </div>
          <div className="space-y-2 mt-4">
          <div className="space-y-1">
              <Label>{t("settings.security.password")}</Label>
              <div className="text-sm text-muted-foreground">
                {t("settings.security.passText")}
              </div>
            </div>
              <Button variant="destructive" size="sm" onClick={() => setIsChangingPassword(true)}>
                {t("settings.security.changePassword")}
              </Button>
            </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="text-md font-medium">
              {t("settings.security.title3")}
            </h3>
            <div className="space-y-2 mt-4">
              <p className="text-sm text-muted-foreground">
                {t("settings.security.text4")}
              </p>
              <Button variant="destructive" size="sm">
                {user?.settingPreferences?.security.isAccountActive
                  ? "Deactivate Account"
                  : "Activate Account"}
              </Button>
            </div>
            <div className="space-y-2 mt-6">
              <p className="text-sm text-muted-foreground">
                {t("settings.security.text5")}
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setConfirmedDel(true)}
              >
                {t("settings.security.title5")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
