import { setAuthUser } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";

const useSession = () => {
  const url = import.meta.env.VITE_ACCESS_TOKEN_VALIDATION_URL;
  const dispatch = useDispatch();
  const validateSession = async () => {
    console.log("Validating session");
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(setAuthUser(data.data));
      return true;
    } else if (response.status === 401) {
      // Access token expired
      // Try to refresh the token
      const refRes = await fetch(import.meta.env.VITE_REFRESH_TOKEN_VALIDATION_URL, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (refRes.ok) {
        // Access token refreshed
        // fetch the user data
        const data = await refRes.json();
        dispatch(setAuthUser(data.data));
        return true;
      } else {
        // Refresh token expired
        return false;
      }
    }
    return false;
  };

  return { validateSession };
};

export default useSession;
