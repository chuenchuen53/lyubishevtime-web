import { createEffect, createSignal } from "solid-js";
import { ThemeContext, initialTheme } from "@context/ThemeContext";
import type { ParentComponent } from "solid-js";

export const ThemeProvider: ParentComponent = props => {
  const [isDark, setIsDark] = createSignal(initialTheme());

  createEffect(() => {
    document.documentElement.classList.toggle("dark", isDark());
    localStorage.setItem("color-theme", isDark() ? "dark" : "light");
  });

  return <ThemeContext.Provider value={[isDark, setIsDark]}>{props.children}</ThemeContext.Provider>;
};
