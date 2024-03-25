import { Dropdown as FlowbiteDropdown } from "flowbite";
import { onMount, onCleanup } from "solid-js";
import { twMerge } from "tailwind-merge";
import styles from "./index.module.scss";
import type { DropdownOptions } from "flowbite";
import type { JSX } from "solid-js";

interface Props {
  id: string;
  options: DropdownOptions;
  dropdownElement: JSX.Element;
  children: JSX.Element;
  class?: string;
  dropdownClass?: string;
}

export const Dropdown = (props: Props) => {
  let fd!: FlowbiteDropdown;
  let triggerElement!: HTMLDivElement;
  let dropdownElement!: HTMLDivElement;

  onMount(() => {
    fd = new FlowbiteDropdown(dropdownElement, triggerElement, props.options);
  });

  onCleanup(() => {
    fd.destroyAndRemoveInstance();
  });

  return (
    <>
      <div ref={triggerElement} id={`${props.id}-trigger`} class={props.class}>
        {props.children}
      </div>
      <div ref={dropdownElement} id={props.id} class={twMerge(styles.dropdown, "z-10 hidden rounded-lg bg-neutral-bg-elevated", props.dropdownClass)}>
        {props.dropdownElement}
      </div>
    </>
  );
};
