/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/types"; 

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const baseUrl = import.meta.env.VITE_USER_BASE_URL;
  const user = useSelector((state: RootState) => state.auth.user);

  // --- Mutations ---

  // Login User
  const loginUserMutation = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
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
      return response.json();
    },
    onSuccess: (data) => {
      if (data?.statusCode === 200) {
        toast.success("Logged in successfully");
        if (data.data) {
          dispatch(setAuthUser(data.data));
          if (data.data._id === import.meta.env.VITE_ADMIN_ID) {
            dispatch(setAdmin());
          }
        }
        navigate("/dashboard");
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      } else {
        throw new Error(data.message || "Login failed");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred while logging in");
    },
  });

  // Register User
  const registerUserMutation = useMutation({
    mutationFn: async (user: User) => {
      const registerUrl: string = import.meta.env.VITE_SIGN_UP_URL;
      const response = await fetch(registerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("User registered successfully");
        navigate("/login");
      } else {
        throw new Error(data.message || "Registration failed");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred during registration");
    },
  });

  // Logout User
  const logoutUserMutation = useMutation({
    mutationFn: async () => {
      const logoutUrl = import.meta.env.VITE_LOGOUT_URL;
      const response = await axios.post(
        logoutUrl,
        {},
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      if (response.status !== 200) {
        throw new Error(response.data.message || "Logout failed");
      }
      return response.data;
    },
    onSuccess: () => {
      dispatch(clearAuthUser());
      toast.success("You have been logged out successfully.");
      setTimeout(() => navigate("/login"), 0);
      queryClient.invalidateQueries();
    },
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred during logout.");
    },
  });

  // Verify User (Forgot Password Step 1)
  const verifyUserMutation = useMutation({
    mutationFn: async ({ email, dateOfBirth }: { email: string; dateOfBirth: Date }) => {
      const url = import.meta.env.VITE_FORGOT_URL1;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          dateOfBirth: format(dateOfBirth, "dd-MM-yyyy"),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Verification failed: ${res.statusText}`);
      }
      return res.json();
    },
    onSuccess: (data) => {
      if (data.statusCode === 200) {
        toast.success("Verification successful.");
      } else {
        throw new Error(data.message || "Verification failed. Please check your details.");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Verify OTP
  const verifyUserOtpMutation = useMutation({
    mutationFn: async ({ otp, mail }: { otp: string; mail: string }) => {
      const res = await fetch(import.meta.env.VITE_VERIFY_OTP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, email: mail }),
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage || "Something went wrong during OTP verification");
      }
      return res.json();
    },
    onSuccess: (data) => {
      if (data.status === "success") {
        toast.success("Email verified successfully!");
        // Note: setIsEmailVerified and toggleOTPForm would typically be handled in the component
        // where this mutation is called, not directly in the hook.
      } else {
        throw new Error("Invalid OTP. Please try again.");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Reset Password
  const resetPasswordMutation = useMutation({
    mutationFn: async ({ email, dateOfBirth, password }: { email: string; dateOfBirth: Date; password: string }) => {
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

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Password update failed: ${res.statusText}`);
      }
      return res.json();
    },
    onSuccess: (data) => {
      if (data.statusCode === 200) {
        toast.success("Password updated successfully.");
      } else {
        throw new Error(data.message || "Password update failed.");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Validate Session - This could be a useQuery if it needs to fetch user data on mount,
  // or remain a plain function if only called on demand (e.g., in a route guard).
  // For simplicity, let's keep it as a standalone function for now,
  // as it primarily deals with authentication side effects (dispatching setAuthUser).
  const validateSession = async () => {
    console.log("[validateSession] Starting session validation...");
    if (user) {
      return true; // If user is already in Redux, consider session valid
    }
    try {
      console.log("[validateSession] Sending initial request to:", baseUrl + "/verify");
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
        console.warn("[validateSession] Session expired. Attempting refresh...");
        const refreshUrl = baseUrl + "/generate/refresh"; // Corrected refresh URL based on baseUrl
        console.log("[validateSession] Refresh URL:", refreshUrl);

        const refRes = await fetch(refreshUrl, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        console.log("[validateSession] Refresh response status:", refRes.status);

        if (refRes.ok) {
          const data = await refRes.json();
          console.log("[validateSession] Token refreshed. User data:", data.data);
          dispatch(setAuthUser(data.data));
          return true;
        } else {
          console.error("[validateSession] Refresh failed with status:", refRes.status);
          dispatch(clearAuthUser()); // Clear user if refresh fails
          navigate("/login"); // Redirect to login
        }
      }

      console.warn("[validateSession] Session invalid and refresh failed.");
      return false;
    } catch (error) {
      console.error("[validateSession] Unexpected error:", error);
      dispatch(clearAuthUser()); // Clear user on unexpected error
      navigate("/login"); // Redirect to login
      return false;
    }
  };

  // Update User Profile Fields
  const updateFieldMutation = useMutation({
    mutationFn: async (updatedUser: Partial<User>) => { // Accept Partial<User> for specific field updates
      const { data } = await axios.patch(baseUrl + "/update", updatedUser, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (data.statusCode !== 200) {
        throw new Error(data.message || "Failed to update profile");
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success("Update successful");
      if (data.data) {
        dispatch(setAuthUser(data.data)); // Update Redux state with new user data
      }
      // Invalidate relevant queries if other parts of the app rely on user data
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error: any) => {
      const errMsg = axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to update profile";
      toast.error(errMsg);
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: async ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) => {
      const { data } = await axios.patch(
        baseUrl + "/update-password", 
        { oldPassword, newPassword },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      if (data.statusCode !== 200) {
        throw new Error(data.message || "Failed to update password");
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
    onError: (error: any) => {
      const errMsg = axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to update password";
      toast.error(errMsg);
    },
  });

  return {
    // Return the mutation functions and their states
    loginUser: loginUserMutation.mutateAsync, // Expose mutateAsync for awaiting the result
    loginUserStatus: loginUserMutation.status,
    loginUserLoading: loginUserMutation.isPending,
    loginUserError: loginUserMutation.error,

    registerUser: registerUserMutation.mutateAsync,
    registerUserStatus: registerUserMutation.status,
    registerUserLoading: registerUserMutation.isPending,
    registerUserError: registerUserMutation.error,

    logoutUser: async () => { // Wrap logout in a function to show SweetAlert
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
        logoutUserMutation.mutate();
      } else {
        toast("Logout cancelled.");
      }
    },
    logoutUserLoading: logoutUserMutation.isPending,

    verifyUser: verifyUserMutation.mutateAsync,
    verifyUserLoading: verifyUserMutation.isPending,

    verifyUserOtp: verifyUserOtpMutation.mutateAsync,
    verifyUserOtpLoading: verifyUserOtpMutation.isPending,

    resetPassword: resetPasswordMutation.mutateAsync,
    resetPasswordLoading: resetPasswordMutation.isPending,

    // getUserRecords will be used directly with useQuery in components,
    // so we'll provide the function directly for the queryFn.
    // It's not a mutation in this context.
    getUserRecords: async (doctorId: string, patientId: string) => {
      try {
        const res = await axios.post(
          import.meta.env.VITE_GET_USER_RECORDS_URL,
          { doctorId, patientId },
          { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        if (res.status !== 200) {
          throw new Error("Failed to fetch records");
        }
        dispatch(setRecords(res.data.records)); // Still dispatch to Redux for global state
        return res.data.records;
      } catch (error: unknown) {
        const errMsg =
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Fetch failed";
        console.error("Record fetching error:", error);
        throw new Error(errMsg); 
      }
    },

    validateSession,
    updateField: updateFieldMutation.mutateAsync,
    updateFieldLoading: updateFieldMutation.isPending,

    updatePassword: updatePasswordMutation.mutateAsync,
    updatePasswordLoading: updatePasswordMutation.isPending,
  };
};

export default useAuth;