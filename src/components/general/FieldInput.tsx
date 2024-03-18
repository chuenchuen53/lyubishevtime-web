import { splitProps } from "solid-js";
import { Input } from "./Input";
import type { Maybe } from "@modular-forms/solid";
import type { InputProps } from "./Input";

type BaseFiled = {
  name: string;
  value: Maybe<string>;
  error: string;
};

type FieldInputProps = Omit<Omit<Omit<InputProps, "isError">, "class">, "value"> & {
  label: string;
  filed: BaseFiled;
};

export const FieldInput = (props: FieldInputProps) => {
  const [local, inputProps] = splitProps(props, ["label", "filed"]);

  return (
    <div>
      {local.label && (
        <label for={local.filed.name} class="mb-2 block text-sm font-medium">
          {local.label} {inputProps.required && <span>*</span>}
        </label>
      )}
      <Input {...inputProps} value={local.filed.error} isError={local.filed.error !== ""} id={local.filed.name} class="block w-full" />
      {props.filed.error && <p class="mt-2 text-sm text-red-600 dark:text-red-500">{props.filed.error}</p>}
    </div>
  );
};
