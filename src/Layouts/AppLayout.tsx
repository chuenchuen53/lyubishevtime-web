import { BottomBar } from "@components/common/BottomBar";
import { MainContent } from "@components/common/MainContent";
import { NavBar } from "../components/common/NavBar";
import { Show, type ParentComponent, createMemo } from "solid-js";
import { user } from "@stores/UserStore";

export const AppLayout: ParentComponent = props => {
  const isLogin = createMemo<boolean>(() => user() !== null);

  return (
    <div id="app-layout" class="dark:text-white">
      <NavBar />
      <MainContent>{props.children}</MainContent>
      <Show when={isLogin()}>
        <BottomBar />
      </Show>
    </div>
  );
};
