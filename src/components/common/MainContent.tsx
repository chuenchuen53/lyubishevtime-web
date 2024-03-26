import type { ParentComponent } from "solid-js";

export const MainContent: ParentComponent = props => {
  return <div class="mx-auto max-w-3xl px-6 py-24">{props.children}</div>;
};
