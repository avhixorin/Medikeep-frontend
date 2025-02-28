import { clearAuthUser } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store/store";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface DeletionProp {
  onCancel: (arg0: boolean) => void;
}

const ConfirmDeletionScreen: React.FC<DeletionProp> = ({ onCancel }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
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
      onCancel(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg p-6 shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold text-center">Confirm Account Deletion</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
          To delete your account, please enter your password. This action is irreversible.
        </p>
        <div className="mt-4">
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition"
            onClick={handleAccountDeletion}
            disabled={!password.trim()}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            onClick={() => onCancel(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletionScreen;
 