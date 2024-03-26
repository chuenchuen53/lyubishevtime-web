import type { ParentComponent } from "solid-js";

export const MainContent: ParentComponent = props => {
  return <div class="mx-auto max-w-3xl py-24">{props.children}</div>;
};
