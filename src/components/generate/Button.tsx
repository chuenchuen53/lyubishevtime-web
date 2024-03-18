import { twMerge } from "tailwind-merge";
import type { JSX } from "solid-js";

interface Props {
  children: JSX.Element;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  class?: string;
}

export const Button = (props: Props) => {
  return (
    <button
      onClick={() => props.onClick?.()}
      type={props.type || "button"}
      class={twMerge(
        "rounded-lg bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800",
        props.class,
      )}
    >
      {props.children}
    </button>
  );
};
