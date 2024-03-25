import { twMerge } from "tailwind-merge";
import { styles } from "./style";
import type { Variant } from "./typing";
import type { JSX } from "solid-js";

interface Props {
  children: JSX.Element;
  variant?: Variant;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  class?: string;
  disabled?: boolean;
}

export const Button = (props: Props) => {
  return (
    <button
      onClick={() => props.onClick?.()}
      type={props.type || "button"}
      disabled={props.disabled}
      class={twMerge(styles({ type: props.variant, disabled: props.disabled }), props.class)}
    >
      {props.children}
    </button>
  );
};
