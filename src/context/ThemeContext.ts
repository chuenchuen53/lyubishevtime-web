import { createContext, useContext } from "solid-js";
import type { Accessor, Setter } from "solid-js";

export function initialTheme(): boolean {
  return document.documentElement.classList.contains("dark");
}

export const ThemeContext = createContext<[Accessor<boolean>, Setter<boolean>]>();

export const useTheme = () => {
  return useContext(ThemeContext)!;
};
