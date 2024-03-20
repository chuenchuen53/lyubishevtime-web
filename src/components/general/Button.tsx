import { twMerge } from "tailwind-merge";
import type { JSX } from "solid-js";
import { className } from "solid-js/web";

type Variant = "primary" | "danger" | "gray";

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
      class={twMerge(
        "rounded-lg bg-gradient-to-r px-5 py-2.5 text-center text-sm font-medium hover:bg-gradient-to-br focus:outline-none focus:ring-4",
        getColorCls(props.variant),
        props.disabled && "cursor-not-allowed opacity-50 disabled:hover:bg-gradient-to-r",
        props.class,
      )}
    >
      {props.children}
    </button>
  );
};

function getColorCls(variant: Variant | undefined): string {
  switch (variant) {
    case undefined:
    case "primary":
      return "from-primary-500 via-primary-600 to-primary-700 text-white focus:ring-primary-300 dark:focus:ring-primary-800";
    case "danger":
      return "from-red-400 via-red-500 to-red-600 text-white focus:ring-red-300 dark:focus:ring-red-800";
    case "gray":
      return "border border border-gray-300 bg-white focus:ring-gray-300 dark:from-gray-400 dark:via-gray-500 dark:to-gray-600 dark:text-white dark:focus:ring-gray-800";
  }
}
