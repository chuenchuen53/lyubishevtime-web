import { ThemeProvider } from "@components/common/ThemeProvider";
import { AppRouter } from "./AppRouter";
import type { Component } from "solid-js";
import "@park-ui/tailwind-plugin/preset.css";

const App: Component = () => {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
