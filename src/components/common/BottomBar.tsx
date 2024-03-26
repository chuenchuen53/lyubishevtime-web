import { A } from "@solidjs/router";
import { For, type JSX } from "solid-js";
import { AiFillTag } from "solid-icons/ai";
import { IoTime } from "solid-icons/io";
import { BsPieChartFill } from "solid-icons/bs";

interface NavItem {
  label: string;
  href: string;
  icon: JSX.Element;
}

export const BottomBar = () => {
  const navItems: NavItem[] = [
    { label: "活動標籤", href: "/tag", icon: <AiFillTag size="26" /> },
    { label: "活動記錄", href: "/event", icon: <IoTime size="26" /> },
    { label: "統計數據", href: "/summary", icon: <BsPieChartFill size="21" /> },
  ];

  return (
    <div class="fixed bottom-0 left-0 z-[1000] h-16 w-full border-t border-neutral-border-secondary bg-neutral-bg-container md:hidden">
      <div class="mx-auto grid h-full max-w-sm grid-cols-3 gap-6 font-medium">
        <For each={navItems}>
          {x => (
            <A
              href={x.href}
              type="button"
              class="flex flex-col items-center justify-center hover:bg-neutral-fill-secondary"
              inactiveClass="hover:text-primary-hover text-neutral-text-secondary"
              activeClass="text-primary"
            >
              <div class="relative size-6">
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{x.icon}</div>
              </div>
              <span class="mt-2 text-sm">{x.label}</span>
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
