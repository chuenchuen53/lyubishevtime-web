import { splitProps } from "solid-js";
import { Input } from "./Input";
import type { Maybe } from "@modular-forms/solid";
import type { InputProps } from "./Input";

type BaseField = {
  name: string;
  value: Maybe<string>;
  error: string;
};

type FieldInputProps = Omit<Omit<Omit<InputProps, "isError">, "class">, "value"> & {
  label: string;
  field: BaseField;
};

export const FieldInput = (props: FieldInputProps) => {
  const [local, inputProps] = splitProps(props, ["label", "field"]);

  return (
    <div>
      {local.label && (
        <label for={local.field.name} class="mb-2 block text-sm font-medium">
          {local.label} {inputProps.required && <span>*</span>}
        </label>
      )}
      <Input {...inputProps} value={local.field.value} isError={local.field.error !== ""} id={local.field.name} class="block w-full" />
      {props.field.error && <p class="mt-2 text-sm text-red-600 dark:text-red-500">{props.field.error}</p>}
    </div>
  );
};
