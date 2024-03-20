import { A } from "@solidjs/router";
import favicon from "@assets/favicon.svg";
import { For, Show, createMemo } from "solid-js";
import { useTheme } from "@context/ThemeContext";
import { user } from "@stores/UserStore";

interface NavItem {
  label: string;
  href: string;
}

export const NavBar = () => {
  const [isDark, setIsDark] = useTheme();
  const isLogin = createMemo<boolean>(() => user() !== null);

  const navItems: NavItem[] = [
    { label: "活動標籤", href: "/tag" },
    { label: "活動記錄", href: "/event" },
    { label: "統計數據", href: "/summary" },
  ];

  const userNavItems: NavItem[] = [
    { label: "設定", href: "/setting" },
    { label: "登出", href: "/logout" },
  ];

  return (
    <nav class="fixed top-0 w-full bg-white dark:bg-gray-900">
      <div class="mx-auto flex max-w-screen-xl items-center justify-between p-4">
        <div class="flex items-center space-x-3">
          <img src={favicon} class="h-8" alt="app Logo" />
          <span class="whitespace-nowrap text-2xl font-semibold">柳比歇夫</span>
        </div>

        <Show when={isLogin}>
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

          <Show when={isLogin}>
            <button
              type="button"
              class="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span class="sr-only">Open user menu</span>
              <img class="h-8 w-8 rounded-full" src="https://i.pravatar.cc/100" alt="user photo" />
            </button>
            <div
              class="z-50 my-4 hidden divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
              id="user-dropdown"
            >
              <div class="px-4 py-3">
                <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                <span class="block truncate  text-sm text-gray-500 dark:text-gray-400">name@flowbite.com</span>
              </div>
              <ul class="py-2" aria-labelledby="user-menu-button">
                <For each={userNavItems}>
                  {x => (
                    <li>
                      <A
                        href={x.href}
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {x.label}
                      </A>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </Show>
        </div>
      </div>
    </nav>
  );
};
