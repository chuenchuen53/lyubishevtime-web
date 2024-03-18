import { twMerge } from "tailwind-merge";
import { splitProps, type JSX } from "solid-js";

type TextInputProps = {
  name: string;
  type: "text" | "password";
  value: string | undefined;
  error: string;
  required?: boolean;
  placeholder?: string;
  class?: string;
  ref: (element: HTMLInputElement) => void;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>;
};

export const Input = (props: TextInputProps) => {
  const [local, inputProps] = splitProps(props, ["value", "name", "class", "error"]);

  return (
    <input
      id={local.name}
      value={local.value || ""}
      class={twMerge(
        "rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
        local.class,
      )}
      {...inputProps}
    />
  );
};
