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

export const Input = (props: InputProps) => {
  const [local, inputProps] = splitProps(props, ["value", "class", "isError"]);

  return (
    <input
      value={local.value || ""}
      class={twMerge(
        "rounded-lg border p-2.5 text-sm",
        props.isError
          ? "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500"
          : "border-gray-300 bg-gray-50 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
        local.class,
      )}
      {...inputProps}
    />
  );
};
