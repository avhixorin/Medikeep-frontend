import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { useCallback } from "react";

const useTheme = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const theme = user?.theme || "light";

  const toggleTheme = useCallback(() => {
    const htmlElement = document.querySelector("html");
    if (!htmlElement) return;

    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  return { theme, toggleTheme };
};

export default useTheme;
