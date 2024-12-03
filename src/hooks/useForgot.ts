import toast from "react-hot-toast";
import { format } from "date-fns";

const useForgot = () => {
  const verifyUser = async (email: string, dateOfBirth: Date) => {
    try {
      const forgetUrl1 = import.meta.env.VITE_FORGOT_URL;

      const verificationResponse = await fetch(forgetUrl1, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, dateOfBirth: format(dateOfBirth, "dd-MM-yyyy") }),
      });

      if (!verificationResponse.ok) {
        throw new Error(`Verification failed: ${verificationResponse.statusText}`);
      }

      const verificationData = await verificationResponse.json();

      if (verificationData.statusCode !== 200) {
        throw new Error("Verification failed. Please check your details.");
      }

      toast.success("Verification successful.");
      return verificationData; 
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        throw error;
      } else {
        toast.error("An unexpected error occurred");
        throw new Error("Unexpected error occurred");
      }
    }
  };

  const resetPassword = async (email: string, dateOfBirth: Date, password: string) => {
    try {
      const forgetUrl2 = import.meta.env.VITE_FORGOT_URL2;

      const passwordUpdateResponse = await fetch(forgetUrl2, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, dateOfBirth: format(dateOfBirth, "dd-MM-yyyy"), password }),
      });

      if (!passwordUpdateResponse.ok) {
        throw new Error(`Password update failed: ${passwordUpdateResponse.statusText}`);
      }

      const passwordUpdateData = await passwordUpdateResponse.json();

      if (passwordUpdateData.statusCode === 200) {
        toast.success("Password updated successfully.");
        return passwordUpdateData;
      } else {
        throw new Error("Password update failed. Please try again.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        throw error;
      } else {
        toast.error("An unexpected error occurred");
        throw new Error("Unexpected error occurred");
      }
    }
  };

  return { verifyUser, resetPassword };
};

export default useForgot;
