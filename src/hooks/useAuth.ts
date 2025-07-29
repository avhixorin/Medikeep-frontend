import { User } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import axios from "axios";
import { setRecords } from "@/redux/features/recordSlice";
import { clearAuthUser, setAuthUser } from "@/redux/features/authSlice";
import { setAdmin } from "@/redux/features/adminSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { RootState } from "@/redux/store/store";
import { useCallback } from "react";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_USER_BASE_URL;
  const user = useSelector((state: RootState) => state.auth.user);

  const loginUser = useCallback(
    async (values: { email: string; password: string }) => {
      try {
        const loginUrl = import.meta.env.VITE_SIGN_IN_URL;
        const response = await fetch(loginUrl, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to log in");
        }

        const data = await response.json();
        if (data?.statusCode === 200) {
          toast.success("Logged in successfully");
          if (data.data) {
            dispatch(setAuthUser(data.data));
            if (data.data._id === import.meta.env.VITE_ADMIN_ID) {
              dispatch(setAdmin());
            }
          }
          navigate("/dashboard");
        }
      } catch (error: unknown) {
        toast.error(
          (error as Error).message || "An error occurred while logging in"
        );
      }
    },
    [dispatch, navigate]
  );

  const registerUser = useCallback(
    async (user: User) => {
      try {
        const registerUrl: string = import.meta.env.VITE_SIGN_UP_URL;

        const response = await fetch(registerUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const data = await response.json();
        console.log("Signup response:", data);
        if (data.success) {
          toast.success("User registered successfully");
          navigate("/login");
        } else {
          toast.error(data.message || "An error occurred");
        }
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : "An error occurred"
        );
        throw error;
      }
    },
    [navigate]
  );

  const logoutUser = useCallback(async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const logoutUrl = import.meta.env.VITE_LOGOUT_URL;

        const response = await axios.post(
          logoutUrl,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          dispatch(clearAuthUser());
          toast.success("You have been logged out successfully.");
          setTimeout(() => navigate("/login"), 0);
        } else {
          toast.error(response.data.message || "An error occurred.");
        }
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : "An error occurred."
        );
      }
    } else {
      toast("Logout cancelled.");
    }
  }, [dispatch, navigate]);

  const verifyUser = useCallback(async (email: string, dateOfBirth: Date) => {
    try {
      const url = import.meta.env.VITE_FORGOT_URL1;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          dateOfBirth: format(dateOfBirth, "dd-MM-yyyy"),
        }),
      });

      if (!res.ok) throw new Error(`Verification failed: ${res.statusText}`);

      const data = await res.json();

      if (data.statusCode !== 200)
        throw new Error("Verification failed. Please check your details.");

      toast.success("Verification successful.");
      return data;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(message);
      throw new Error(message);
    }
  }, []);

  const verifyUserOtp = useCallback(
    async (
      otp: string,
      mail: string,
      setIsEmailVerified: (value: boolean) => void,
      toggleOTPForm: () => void
    ) => {
      try {
        const res = await fetch(import.meta.env.VITE_VERIFY_OTP_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, email: mail }),
        });
        if (!res.ok) {
          const errorMessage = await res.text();
          throw new Error(errorMessage || "Something went wrong");
        }
        const data = await res.json();
        console.log("OTP verification response:", data);
        if (data.status === "success") {
          toast.success("Email verified successfully!");
          setIsEmailVerified(true);
          toggleOTPForm();
        } else {
          toast.error("Invalid OTP. Please try again.");
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const resetPassword = useCallback(
    async (email: string, dateOfBirth: Date, password: string) => {
      try {
        const url = import.meta.env.VITE_FORGOT_URL2;

        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            dateOfBirth: format(dateOfBirth, "dd-MM-yyyy"),
            password,
          }),
        });

        if (!res.ok)
          throw new Error(`Password update failed: ${res.statusText}`);

        const data = await res.json();

        if (data.statusCode === 200) {
          toast.success("Password updated successfully.");
          return data;
        }
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        toast.error(message);
        throw new Error(message);
      }
    },
    []
  );

  const uploadUserRecords = async (files: File[], target: string, doctorId: string, patientId: string) => {
    try {
      if (!files.length) {
        toast.error("No files selected");
        return false;
      }

      if (!target) {
        toast.error("Target user is not specified");
        return false;
      }

      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      formData.append("target", target);

      const res = await axios.post(
        import.meta.env.VITE_UPLOAD_FILES_URL,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Files uploaded successfully");
      await getUserRecords(doctorId, patientId);
      return true;
    } catch (error: unknown) {
      const errMsg =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Upload failed";
      toast.error(errMsg);
      console.error("Upload error:", error);
      return false;
    }
  };

  const getUserRecords = useCallback(
    async (doctorId: string, patientId: string) => {
      try {
        const res = await axios.post(
          import.meta.env.VITE_GET_USER_RECORDS_URL,
          {
            doctorId,
            patientId,
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res.status !== 200) {
          throw new Error("Failed to fetch records");
        }
        console.log("Fetched records:", res.data.records);
        dispatch(setRecords(res.data.records));
        return res.data.records;
      } catch (error: unknown) {
        const errMsg =
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Fetch failed";
        toast.error(errMsg);
        console.error("Record fetching error:", error);
        return null;
      }
    },
    []
  );

  const deleteUserRecord = async (id: string, doctorId: string, patientId: string) => {
    try {
      if (!id) {
        toast.error("ID of record is not specified");
        return false;
      }

      const res = await axios.post(
        import.meta.env.VITE_DELETE_FILE_URL,
        { recordId: id },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      await getUserRecords(doctorId, patientId);
      return true;
    } catch (error: unknown) {
      const errMsg =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Delete failed";
      console.error("Deletion error:", errMsg);
      return false;
    }
  };

  const validateSession = useCallback(async () => {
    console.log("[validateSession] Starting session validation...");
    if (user) {
      return true;
    }
    try {
      console.log("[validateSession] Sending initial request to:", baseUrl);
      const res = await fetch(baseUrl + "/verify", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      console.log("[validateSession] Initial response status:", res.status);

      if (res.ok) {
        const data = await res.json();
        console.log("[validateSession] Session valid. User data:", data.data);
        dispatch(setAuthUser(data.data));
        return true;
      }

      if (res.status === 401) {
        console.warn(
          "[validateSession] Session expired. Attempting refresh..."
        );

        const refreshUrl = import.meta.env.VITE_REFRESH_TOKEN_VALIDATION_URL;
        console.log("[validateSession] Refresh URL:", refreshUrl);

        const refRes = await fetch(baseUrl + "/generate/refresh", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        console.log(
          "[validateSession] Refresh response status:",
          refRes.status
        );

        if (refRes.ok) {
          const data = await refRes.json();
          console.log(
            "[validateSession] Token refreshed. User data:",
            data.data
          );
          dispatch(setAuthUser(data.data));
          return true;
        } else {
          console.error(
            "[validateSession] Refresh failed with status:",
            refRes.status
          );
        }
      }

      console.warn("[validateSession] Session invalid and refresh failed.");
      return false;
    } catch (error) {
      console.error("[validateSession] Unexpected error:", error);
      return false;
    }
  }, [baseUrl, dispatch, user]);

  const updateField = useCallback(
    async (user: User) => {
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
      };

      try {
        const { data } = await axios.patch(baseUrl + "/update", updatedUser, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        toast.success("Update successful");
        return data;
      } catch (error) {
        console.error("Update error:", error);
        toast.error("Failed to update");
        throw new Error("Failed to update");
      }
    },
    [baseUrl]
  );

  const updatePassword = useCallback(
    async (oldPassword: string, newPassword: string) => {
      try {
        const { data } = await axios.patch(
          baseUrl,
          { oldPassword, newPassword },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        toast.success("Password updated successfully");
        return data;
      } catch (error) {
        console.error("Update password error:", error);
        toast.error("Failed to update password");
        throw new Error("Failed to update password");
      }
    },
    [baseUrl]
  );

  return {
    loginUser,
    registerUser,
    logoutUser,
    verifyUser,
    verifyUserOtp,
    resetPassword,
    uploadUserRecords,
    getUserRecords,
    deleteUserRecord,
    validateSession,
    updateField,
    updatePassword,
  };
};

export default useAuth;
