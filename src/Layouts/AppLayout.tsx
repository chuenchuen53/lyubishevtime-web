import { BottomBar } from "@components/common/BottomBar";
import { MainContent } from "@components/common/MainContent";
import { NavBar } from "../components/common/NavBar";
import { useIsLogin } from "@stores/CustomerStore";
import { Show, type ParentComponent } from "solid-js";

export const AppLayout: ParentComponent = props => {
  const isLogin = useIsLogin();

  return (
    <div id="app-layout" class="dark:text-white">
      <NavBar />
      <MainContent>{props.children}</MainContent>
      <Show when={isLogin}>
        <BottomBar />
      </Show>
    </div>
  );
};
