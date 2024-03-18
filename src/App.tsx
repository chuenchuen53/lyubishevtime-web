import "flowbite";
import { AppRouter } from "./AppRouter";
import type { Component } from "solid-js";
import { ThemeProvider } from "@components/common/ThemeProvider";

const App: Component = () => {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
