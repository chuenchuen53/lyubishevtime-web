import type { JSX } from "solid-js";

interface Props {
  formTitle: string;
  children: JSX.Element;
}

export const SimpleFormContainer = (props: Props) => {
  return (
    <div class="mx-auto flex flex-col items-center md:py-20">
      <div class="w-full max-w-sm rounded-lg bg-neutral-bg-elevated shadow dark:border dark:border-neutral-700">
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <div class="text-xl font-bold leading-tight tracking-tight md:text-2xl">{props.formTitle}</div>
          {props.children}
        </div>
      </div>
    </div>
  );
};
