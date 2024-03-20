import { BottomBar } from "@components/common/BottomBar";
import { MainContent } from "@components/common/MainContent";
import { NavBar } from "../components/common/NavBar";
import { Show, type ParentComponent, createMemo } from "solid-js";
import { user } from "@stores/UserStore";

export const AppLayout: ParentComponent = props => {
  return (
    <div id="app-layout">
      <NavBar />
      <MainContent>{props.children}</MainContent>
      <Show when={user()}>
        <BottomBar />
      </Show>
    </div>
  );
};
