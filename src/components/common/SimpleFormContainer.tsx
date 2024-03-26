import type { JSX } from "solid-js";

interface Props {
  formTitle: string;
  children: JSX.Element;
}

export const SimpleFormContainer = (props: Props) => {
  return (
    <div class="mx-auto flex flex-col items-center p-6 md:py-20">
      <div class="w-full max-w-sm rounded-lg bg-neutral-bg-container shadow dark:border dark:border-gray-700 dark:bg-gray-800">
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl">{props.formTitle}</h1>
          {props.children}
        </div>
      </div>
    </div>
  );
};
