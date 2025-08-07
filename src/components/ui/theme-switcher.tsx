import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="group/toggle extend-touch-target size-8 cursor-pointer"
      onClick={toggleTheme}
      title="Toggle theme"
    >
      <MoonIcon className="size-4.5 dark:hidden" />
      <SunIcon className="hidden size-4.5 dark:flex" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}