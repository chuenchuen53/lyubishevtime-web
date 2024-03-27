import { twMerge } from "tailwind-merge";
import { styles } from "./style";
import { Spinner } from "./Spinner";
import type { Variant } from "./typing";
import type { JSX } from "solid-js";

interface Props {
  children: JSX.Element;
  variant?: Variant;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  class?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const Button = (props: Props) => {
  return (
    <button
      onClick={() => props.onClick?.()}
      type={props.type || "button"}
      disabled={props.disabled || props.loading}
      class={twMerge(styles({ type: props.variant }), props.class)}
    >
      {props.loading && <Spinner />} {props.children}
    </button>
  );
};
