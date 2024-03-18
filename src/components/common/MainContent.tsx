import type { ParentComponent } from "solid-js";

export const MainContent: ParentComponent = props => {
  return <div class="py-[72px]">{props.children}</div>;
};
