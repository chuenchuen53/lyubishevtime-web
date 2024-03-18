import { Input } from "./Input";
import type { JSX } from "solid-js";

type TextInputProps = {
  name: string;
  type: "text" | "password";
  label: string;
  placeholder?: string;
  value: string | undefined;
  error: string;
  required?: boolean;
  ref: (element: HTMLInputElement) => void;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>;
};

export function TextInput(props: TextInputProps) {
  return (
    <div>
      {props.label && (
        <label for={props.name} class="mb-2 block text-sm font-medium">
          {props.label} {props.required && <span>*</span>}
        </label>
      )}
      <Input {...props} class="block w-full" />
      {props.error && <div id={`${props.name}-error`}>{props.error}</div>}
    </div>
  );
}
