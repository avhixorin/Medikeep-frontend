import axios from "axios";
import toast from "react-hot-toast";
import { User } from "@/types/types";

const useUpdate = (url: string) => {
  const updateField = async (user: User) => {
    const updatedUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phone: user.phone,
      about: user.about,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      profilePicture: user.profilePicture,
      settingPreferences: user.settingPreferences,
      sharingLink: user.sharingLink,
    }
    try {

      const { data } = await axios.patch(
        url,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success("Update successful");
      return data;
    } catch (error) {
      console.error("Update error:", error);

      const errorMessage = "Failed to update";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updatePassword = async (
    oldPassword: string,
    newPassword: string
  ) => {
    try {
      const { data } = await axios.patch(
        url,
        {oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success("Password updated successfully");
      return data;
    } catch (error) {
      console.error("Update password error:", error);

      const errorMessage = "Failed to update password";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return { updateField, updatePassword };
};

export default useUpdate;
