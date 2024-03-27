import type { JSX } from "solid-js/web/types/jsx";

interface Props {
  title: string;
  icon: JSX.Element;
}

export const EmptyState = (props: Props) => {
  return (
    <div class="flex flex-col items-center justify-center space-y-6">
      <div class="flex size-32 items-center justify-center rounded-full bg-primary-active text-primary-content">{props.icon}</div>
      <p class="text-lg font-medium text-primary">{props.title}</p>
    </div>
  );
};
