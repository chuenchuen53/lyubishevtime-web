import { Key } from "@solid-primitives/keyed";
import { TransitionGroup } from "solid-transition-group";
import type { Accessor, JSX } from "solid-js";
import "./index.scss";

type Animation = "fade-slide-in-out" | "fade-in-slide-out";

interface Props<T> {
  data: T[];
  key: keyof T;
  animation: Animation;
  children: (item: Accessor<T>) => JSX.Element;
}

export const TransitionList = <T extends object>(props: Props<T>) => {
  return (
    <TransitionGroup name={props.animation === "fade-slide-in-out" ? "transition-list-fade-slide-in-out" : "transition-list-fade-in-slide-out"}>
      <Key each={props.data} by={props.key}>
        {x => <div class="transition-list-item">{props.children(x)}</div>}
      </Key>
    </TransitionGroup>
  );
};
