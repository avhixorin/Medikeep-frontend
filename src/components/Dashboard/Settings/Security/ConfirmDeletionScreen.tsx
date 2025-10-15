import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface DeletionProp {
  onCancel: (arg0: boolean) => void;
}

const ConfirmDeletionScreen = ({ onCancel }: DeletionProp) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAccountDeletion = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action is irreversible and will delete your account permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm Deletion",
      confirmButtonColor: "red",
      cancelButtonText: "Keep My Account",
    });

    if (!result.isConfirmed) {
      onCancel(false);
      return;
    }

    const deleteUrl = import.meta.env.VITE_BASE_URL + "/delete/user";
    try {
      const res = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify({ password }),
      });

      const resText = await res.text();
      let data;
      try {
        data = JSON.parse(resText);
      } catch {
        data = { message: resText || "Unknown error occurred" };
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete account");
      }

      if (data.statusCode === 200) {
        navigate("/register");
        toast.success("Your account has been deleted successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      const errorMessage =
        (error as Error).message || "Failed to delete account";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="bg-white dark:bg-black text-gray-800 dark:text-gray-200 rounded-lg p-6 shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold text-center">
          Confirm Account Deletion
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
          To delete your account, please enter your password. This action is
          irreversible.
        </p>
        <div className="mt-4">
          <Input
            autoFocus
            type="password"
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-6 flex justify-between gap-4 w-full">
          <Button
            variant={"destructive"}
            onClick={handleAccountDeletion}
            disabled={!password.trim()}
          >
            Confirm Deletion
          </Button>
          <Button variant={"default"} onClick={() => onCancel(false)}>
            Keep My Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletionScreen;
