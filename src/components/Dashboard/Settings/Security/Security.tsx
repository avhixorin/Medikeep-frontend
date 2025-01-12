import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import React from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useNavigate } from "react-router-dom";
import { clearAuthUser, updateSecuritySettings } from "@/redux/features/authSlice";
import { useTranslation } from "react-i18next";

const Security: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAccountDeletion = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action is irreversible and will delete your account permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete Account",
      confirmButtonColor: "red",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      const deleteUrl = import.meta.env.VITE_DELETE_ACCOUNT_URL;
      try {
        const res = await fetch(deleteUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ id: user?._id }),
        });
        if (!res.ok) {
          throw new Error("An error occurred while deleting your account");
        }
        const data = await res.json();
        if (data.statusCode === 200) {
          navigate("/login");
          dispatch(clearAuthUser());
          toast.success("Your account has been deleted successfully");
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
          throw error;
        } else {
          toast.error("An unexpected error occurred");
          throw new Error("Unexpected error occurred");
        }
      }
    } else {
      toast("Your account is safe");
    }
  };
  const { t } = useTranslation();
  return (
    <div className="container max-w-screen-lg py-6 bg-transparent">
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
              checked={user?.settingPreferences?.security.twoFactorAuth} onCheckedChange={() => dispatch(updateSecuritySettings({key:"twoFactorAuth", value: !user?.settingPreferences?.security.twoFactorAuth}))}
            />
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
                onClick={handleAccountDeletion}
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
