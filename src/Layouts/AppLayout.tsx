import { BottomBar } from "@components/common/BottomBar";
import { MainContent } from "@components/common/MainContent";
import { Show, type ParentComponent } from "solid-js";
import { user } from "@stores/UserStore";
import { NavBar } from "../components/common/NavBar";

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
