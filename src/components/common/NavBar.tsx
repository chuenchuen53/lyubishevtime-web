import { A, useNavigate } from "@solidjs/router";
import favicon from "@assets/favicon.svg";
import { For, ParentProps, Show, createEffect, createMemo, createSignal } from "solid-js";
import { useTheme } from "@context/ThemeContext";
import { user, logout } from "@stores/UserStore";
import { Dropdown } from "@components/general/Dropdown";
import type { DropdownOptions } from "flowbite";

interface NavItem {
  label: string;
  href: string;
}

interface UserNavItems {
  label: string;
  action: () => void;
}

export const NavBar = () => {
  const [isDark, setIsDark] = useTheme();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { label: "活動標籤", href: "/tag" },
    { label: "活動記錄", href: "/event" },
    { label: "統計數據", href: "/summary" },
  ];

  const userNavItems: UserNavItems[] = [
    { label: "設定", action: () => navigate("/setting") },
    {
      label: "登出",
      action: () => {
        logout();
      },
    },
  ];

  const dropDownOptions: DropdownOptions = {
    placement: "bottom-end",
  };

  return (
    <nav class="fixed top-0 w-full bg-white dark:bg-gray-900">
      <div class="mx-auto flex max-w-screen-xl items-center justify-between p-4">
        <A href={user() ? "/tag" : "/"}>
          <div class="flex items-center space-x-3">
            <img src={favicon} class="h-8" alt="app Logo" />
            <span class="whitespace-nowrap text-2xl font-semibold">柳比歇夫</span>
          </div>
        </A>

        <Show when={user()}>
          <div class="hidden w-auto items-center justify-between md:flex">
            <ul class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse">
              <For each={navItems}>
                {x => (
                  <li>
                    <A href={x.href} activeClass="text-primary" inactiveClass="hover:text-primary">
                      {x.label}
                    </A>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </Show>

        <div class="flex items-center space-x-4">
          <button
            id="theme-toggle"
            type="button"
            class="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            onClick={() => setIsDark(!isDark())}
          >
            <Show
              when={isDark()}
              fallback={
                <svg id="theme-toggle-dark-icon" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              }
            >
              <svg id="theme-toggle-light-icon" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                />
              </svg>
            </Show>
          </button>

          <Show when={user()}>
            {nonNullUser => {
              return (
                <Dropdown
                  id="user-menu-dropdown"
                  options={dropDownOptions}
                  dropDownElement={
                    <div class="my-4 w-40 divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700">
                      <div class="px-4 py-3">
                        <span class="block text-sm text-gray-900 dark:text-white">{nonNullUser().nickname}</span>
                        <span class="block truncate  text-sm text-gray-500 dark:text-gray-400">{nonNullUser().username}</span>
                      </div>
                      <ul class="py-2" aria-labelledby="user-menu-button">
                        <For each={userNavItems}>
                          {x => (
                            <li>
                              <button
                                onClick={x.action}
                                class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                {x.label}
                              </button>
                            </li>
                          )}
                        </For>
                      </ul>
                    </div>
                  }
                >
                  <button type="button" class="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                    <span class="sr-only">Open user menu</span>
                    <Show when={nonNullUser().profilePic} fallback={<UserIcon />}>
                      <img class="h-8 w-8 rounded-full" src={nonNullUser().profilePic} alt="user photo" />
                    </Show>
                  </button>
                </Dropdown>
              );
            }}
          </Show>
        </div>
      </div>
    </nav>
  );
};

function UserIcon() {
  return (
    <svg
      class="h-6 w-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fill-rule="evenodd"
        d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
        clip-rule="evenodd"
      />
    </svg>
  );
}
