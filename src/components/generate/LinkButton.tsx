import { A } from "@solidjs/router";
import { twMerge } from "tailwind-merge";
import type { JSX } from "solid-js";

interface Props {
  children: JSX.Element;
  href: string;
  onClick?: () => void;
  class?: string;
}

export const LinkButton = (props: Props) => {
  return (
    <A
      href={props.href}
      class={twMerge(
        "rounded-lg bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800",
        props.class,
      )}
    >
      {props.children}
    </A>
  );
};
