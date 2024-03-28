import { ThemeProvider } from "@components/common/ThemeProvider";
import { Message } from "@components/general/Message";
import { ConfirmationModal } from "@components/general/ConfirmationModal";
import { AppRouter } from "./AppRouter";
import type { Component } from "solid-js";

const App: Component = () => {
  return (
    <ThemeProvider>
      <AppRouter />
      <ConfirmationModal.Root />
      <Message.Root />
    </ThemeProvider>
  );
};

export default App;
