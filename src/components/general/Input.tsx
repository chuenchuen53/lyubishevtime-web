import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import { splitProps, type JSX } from "solid-js";

export type InputProps = {
  type: "text" | "password" | "number";
  value: string | number | undefined;
  id?: string;
  required?: boolean;
  placeholder?: string;
  class?: string;
  isError?: boolean;
  ref?: (element: HTMLInputElement) => void;
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange?: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur?: JSX.EventHandler<HTMLInputElement, FocusEvent>;
};

const style = tv({
  base: "rounded-lg border p-2.5 text-sm",
  variants: {
    color: {
      default:
        "border-neutral-border bg-neutral-bg-container text-neutral-text hover:border-primary-hover focus:border-primary focus:ring-primary-border",
      danger: "border-danger bg-danger-bg text-danger-text focus:border-danger focus:ring-danger-border",
    },
  },
});

export const Input = (props: InputProps) => {
  const [local, inputProps] = splitProps(props, ["value", "class", "isError"]);

  return <input value={local.value || ""} class={twMerge(style({ color: local.isError ? "danger" : "default" }), local.class)} {...inputProps} />;
};
