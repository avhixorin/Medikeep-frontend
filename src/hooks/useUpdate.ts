import { User } from "@/types/types";
import toast from "react-hot-toast";

const useUpdate = (url: string) => {
  
  const updateField = async (user: User) => {
    console.log("updating user req")
    try {
      console.log("updating user")
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ user }),
      });

      if (!response.ok) {
        console.log("response not ok")
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update");
        throw new Error(errorData.message || "Failed to update");
      }
      console.log("response ok")
      const data = await response.json();
      toast.success("Update successful");
      return data;
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An unexpected error occurred");
      throw error;
    }
  };

  const updatePassword = async (id: string, oldPassword: string, newPassword: string) => {
    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ id, oldPassword, newPassword }),
        });
        if(!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message || "Failed to update password");
            throw new Error(errorData.message || "Failed to update password");
        }
        toast.success("Password updated successfully");
    } catch (error) {
        console.log("Update password error:", error);
    }
  };

  return { updateField, updatePassword };
};

export default useUpdate;
