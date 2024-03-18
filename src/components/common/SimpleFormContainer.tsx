import type { JSX } from "solid-js";

interface Props {
  formTitle: string;
  children: JSX.Element;
}

export const SimpleFormContainer = (props: Props) => {
  return (
    <div class="mx-auto flex flex-col items-center p-6 md:py-20">
      <div class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md">
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">{props.formTitle}</h1>
          {props.children}
        </div>
      </div>
    </div>
  );
};
