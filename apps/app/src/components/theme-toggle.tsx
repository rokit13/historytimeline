"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm gap-2 border border-base-300/70"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <FontAwesomeIcon icon={theme === "dim" ? faSun : faMoon} className="h-4 w-4" />
      {theme === "dim" ? "Light" : "Dim"}
    </button>
  );
}
