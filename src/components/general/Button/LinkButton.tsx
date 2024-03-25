import { twMerge } from "tailwind-merge";
import { A } from "@solidjs/router";
import { styles } from "./style";
import type { Variant } from "./typing";
import type { JSX } from "solid-js";

type LinkVariant = Variant | "link";

interface Props {
  children: JSX.Element;
  href: string;
  variant?: LinkVariant;
  onClick?: () => void;
  class?: string;
}

export const LinkButton = (props: Props) => {
  return (
    <>
      {props.variant === "link" ? (
        <A href={props.href} class={twMerge("text-primary underline hover:text-primary-text-hover", props.class)}>
          {props.children}
        </A>
      ) : (
        <A href={props.href} class={twMerge(styles({ type: props.variant }), props.class)}>
          {props.children}
        </A>
      )}
    </>
  );
};
