import { A, useNavigate } from "@solidjs/router";
import favicon from "@assets/favicon.svg";
import { For, Show } from "solid-js";
import { useTheme } from "@context/ThemeContext";
import { user, logout } from "@stores/UserStore";
import { BiSolidMoon, BiSolidSun } from "solid-icons/bi";
import { Dropdown } from "@components/general/Dropdown";
import IconButton from "@components/general/Button/IconButton";
import { Button } from "@components/general/Button";
import { FaSolidUserLarge } from "solid-icons/fa";

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
    { label: "登出", action: () => logout() },
  ];

  return (
    <nav class="fixed top-0 z-[1000] w-full bg-neutral-bg-layout">
      <div class="mx-auto flex max-w-screen-lg items-center justify-between px-4 py-3 md:py-4">
        <A href={user() ? "/tag" : "/"}>
          <div class="flex items-center space-x-3">
            <img src={favicon} class="h-8" alt="app Logo" />
            <span class="whitespace-nowrap text-2xl font-semibold">柳比歇夫</span>
          </div>
        </A>

        <Show when={user()}>
          <div class="hidden w-auto items-center justify-between md:flex">
            <ul class="flex space-x-8 font-medium">
              <For each={navItems}>
                {x => (
                  <li>
                    <A href={x.href} activeClass="text-primary" inactiveClass="hover:text-primary-hover">
                      {x.label}
                    </A>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </Show>

        <div class="flex items-center space-x-4">
          <IconButton class="text-neutral-text-tertiary" onClick={() => setIsDark(!isDark())}>
            <Show when={isDark()} fallback={<BiSolidMoon size="24" />}>
              <BiSolidSun size="24" />
            </Show>
          </IconButton>

          <Show when={user()}>
            {nonNullUser => {
              return (
                <Dropdown
                  id="user-menu-dropdown"
                  options={{ placement: "bottom-end" }}
                  dropdownElement={
                    <div class="w-40 divide-y divide-neutral-border-secondary">
                      <div class="px-4 py-3">
                        <span class="block text-sm text-neutral-text">{nonNullUser().nickname}</span>
                        <span class="block truncate  text-sm text-neutral-text-secondary">{nonNullUser().username}</span>
                      </div>
                      <ul class="py-2">
                        <For each={userNavItems}>
                          {x => (
                            <li>
                              <Button variant="text" onClick={x.action} class="w-full rounded-none text-left font-normal">
                                {x.label}
                              </Button>
                            </li>
                          )}
                        </For>
                      </ul>
                    </div>
                  }
                >
                  <button
                    type="button"
                    class="flex size-8 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-gray-500 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  >
                    <span class="sr-only">Open user menu</span>
                    <Show when={nonNullUser().profilePic} fallback={<FaSolidUserLarge class="relative -bottom-1" size="24" />}>
                      {nonNullProfilePic => <img class="size-8 rounded-full" src={nonNullProfilePic()} alt="user photo" />}
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
