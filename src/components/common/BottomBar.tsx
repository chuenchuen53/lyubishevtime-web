import { A } from "@solidjs/router";
import { For, type JSX } from "solid-js";

const TagIcon = () => (
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.045 3.007 12.31 3a1.965 1.965 0 0 0-1.4.585l-7.33 7.394a2 2 0 0 0 0 2.805l6.573 6.631a1.957 1.957 0 0 0 1.4.585 1.965 1.965 0 0 0 1.4-.585l7.409-7.477A2 2 0 0 0 21 11.479v-5.5a2.972 2.972 0 0 0-2.955-2.972Zm-2.452 6.438a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
  </svg>
);

const ClockIcon = () => (
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path
      fill-rule="evenodd"
      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
      clip-rule="evenodd"
    />
  </svg>
);

const StatisticIcon = () => (
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M 20.678806,12.540737 H 12.233421 L 6.2614979,18.585263 A 8.6864331,8.7920382 0 0 0 20.67772,12.540737 Z M 5.4938345,17.807168 A 8.6864331,8.7920382 0 0 1 11.465758,3.2156817 V 11.763741 Z M 12.551561,3.2156817 v 8.2260503 h 8.127245 A 8.6864331,8.7920382 0 0 0 12.551561,3.2156817" />
  </svg>
);

interface NavItem {
  label: string;
  href: string;
  icon: JSX.Element;
}

export const BottomBar = () => {
  const navItems: NavItem[] = [
    { label: "活動標籤", href: "/tag", icon: <TagIcon /> },
    { label: "活動記錄", href: "/event", icon: <ClockIcon /> },
    { label: "統計數據", href: "/summary", icon: <StatisticIcon /> },
  ];

  return (
    <div class="fixed bottom-0 left-0 z-50 z-[1000] h-16 w-full border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700 md:hidden">
      <div class="mx-auto grid h-full max-w-lg grid-cols-3 font-medium">
        <For each={navItems}>
          {x => (
            <A
              href={x.href}
              type="button"
              class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
              inactiveClass="hover:text-primary dark:hover:text-primary text-gray-500  dark:text-gray-400"
              activeClass="text-primary dark:text-primary"
            >
              {x.icon}
              <span class="mt-2 text-sm">{x.label}</span>
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
