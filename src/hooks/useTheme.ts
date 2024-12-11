import { setUserTheme } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useTheme = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const theme = user?.theme || "light";

  const toggleTheme = useCallback(() => {
    const htmlElement = document.querySelector("html");
    if (!htmlElement) return;

    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      dispatch(setUserTheme("light"));
    } else {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      dispatch(setUserTheme("dark"));
    }
  }, [dispatch]);

  const setTheme = useCallback((theme: string) => {
    
    const htmlElement = document.querySelector("html");
    if(theme === "default") {
      htmlElement?.removeAttribute("data-theme");
    };
    if(htmlElement?.hasAttribute("data-theme")){
      
      htmlElement.setAttribute("data-theme", theme);
    }else{
      htmlElement?.setAttribute("data-theme", theme);
    }
  },[]);

  return { theme, toggleTheme, setTheme };
};

export default useTheme;
