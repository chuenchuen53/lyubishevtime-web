import { twMerge } from "tailwind-merge";
import type { JSX } from "solid-js";
import { tv } from "tailwind-variants";
import { Dynamic } from "solid-js/web";
import { A } from "@solidjs/router";

type Variant = "primary" | "danger" | "gray";

interface Props {
  children: JSX.Element;
  variant?: Variant;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  class?: string;
  disabled?: boolean;
}

type LinkButtonProps = Omit<Props, "type" | "disabled"> & {
  href: string;
};

export const Button = (props: Props) => {
  return (
    <button
      onClick={() => props.onClick?.()}
      type={props.type || "button"}
      disabled={props.disabled}
      class={twMerge(styles({ color: props.variant, disabled: props.disabled }), props.class)}
    >
      {props.children}
    </button>
  );
};

export const LinkButton = (props: LinkButtonProps) => {
  return (
    <A href={props.href} class={twMerge(styles({ color: props.variant }), props.class)}>
      {props.children}
    </A>
  );
};

const styles = tv({
  base: "rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4",
  defaultVariants: { color: "primary" },
  variants: {
    color: {
      primary: "from-primary-500 via-primary-600 to-primary-700 text-white focus:ring-primary-300 dark:focus:ring-primary-800",
      danger: "from-red-400 via-red-500 to-red-600 text-white focus:ring-red-300 dark:focus:ring-red-800",
      gray: "border border-gray-300 bg-white hover:bg-gray-100 focus:ring-gray-300 dark:border-gray-800 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700",
    },
    disabled: {
      true: "cursor-not-allowed opacity-50",
    },
  },
  compoundVariants: [
    {
      color: ["primary", "danger"],
      class: "bg-gradient-to-r hover:bg-gradient-to-br",
    },
    {
      color: ["primary", "danger"],
      disabled: true,
      class: "disabled:hover:bg-gradient-to-r",
    },
    {
      color: "gray",
      disabled: true,
      class: "disabled:hover:bg-white dark:disabled:hover:bg-gray-800",
    },
  ],
});
