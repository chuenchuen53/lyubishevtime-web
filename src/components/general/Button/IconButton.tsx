import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { Dynamic } from "solid-js/web";
import type { JSX } from "solid-js";

interface Props {
  children: JSX.Element;
  class?: string;
  variant?: "default" | "primary" | "danger";
  as?: "button" | "div";
  onClick?: () => void;
}

const style = tv({
  base: "inline-flex size-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-4",
  defaultVariants: { color: "default" },
  variants: {
    color: {
      default: "text-neutral-text hover:bg-neutral-fill-secondary focus-visible:ring-neutral-border",
      primary: "text-primary hover:bg-primary-bg-hover focus-visible:ring-primary-border",
      danger: "text-danger hover:bg-danger-bg-hover focus-visible:ring-danger-border",
    },
  },
});

export default function IconButton(props: Props) {
  return (
    <Dynamic component={props.as ?? "button"} onClick={() => props.onClick?.()} class={twMerge(style({ color: props.variant }), props.class)}>
      {props.children}
    </Dynamic>
  );
}
