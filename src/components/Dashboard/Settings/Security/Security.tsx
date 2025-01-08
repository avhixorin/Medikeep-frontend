import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import React from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useNavigate } from "react-router-dom";
import { clearAuthUser } from "@/redux/features/authSlice";

const Security: React.FC = () => {
  const id = useSelector((state: RootState) => state.auth.user?._id);
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
          body: JSON.stringify({ id }),
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
  return (
    <div className="container max-w-screen-lg py-6 bg-transparent">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">Security</h2>
          <p className="text-sm text-muted-foreground">
            Manage your account privacy and security settings.
          </p>
        </div>
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Account Privacy</Label>
              <div className="text-sm text-muted-foreground">
                Toggle between private and public account settings.
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Two-Factor Authentication</Label>
              <div className="text-sm text-muted-foreground">
                Add an extra layer of security to your account.
              </div>
            </div>
            <Switch />
          </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="text-md font-medium">Account Management</h3>
            <div className="space-y-2 mt-4">
              <p className="text-sm text-muted-foreground">
                Deactivating your account will disable your profile and remove
                your data from public view. You can reactivate your account at
                any time by logging in again.
              </p>
              <Button variant="destructive" size="sm">
                Deactivate Account
              </Button>
            </div>
            <div className="space-y-2 mt-6">
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data. This
                action is irreversible.
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleAccountDeletion}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
