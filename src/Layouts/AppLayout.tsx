import { BottomBar } from "@components/common/BottomBar";
import { MainContent } from "@components/common/MainContent";
import { ThemeProvider } from "@components/common/ThemeProvider";
import { NavBar } from "../components/common/NavBar";
import type { ParentComponent } from "solid-js";

export const AppLayout: ParentComponent = props => {
  return (
    <ThemeProvider>
      <div id="app-layout" class="dark:text-white">
        <NavBar />
        <MainContent>{props.children}</MainContent>
        <BottomBar />
      </div>
    </ThemeProvider>
  );
};
