import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import type { FC } from "react";

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleChange = () => {
    toggleTheme();
  };

  //Style classes (semantic tokens)
  const sunClass =
    "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0";
  const moonClass =
    "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleChange}
      className="relative text-foreground"
      aria-label="Toggle theme"
    >
      <Sun className={sunClass} />
      <Moon className={moonClass} />
      <span className="sr-only">
        {theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      </span>
    </Button>
  );
};
