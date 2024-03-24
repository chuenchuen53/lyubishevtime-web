import { Dropdown as FlowbiteDropdown, DropdownOptions } from "flowbite";
import { JSX, onMount, onCleanup } from "solid-js";

interface Props {
  id: string;
  options: DropdownOptions;
  dropDownElement: JSX.Element;
  children: JSX.Element;
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
      <div ref={triggerElement} id={`${props.id}-trigger`}>
        {props.children}
      </div>
      <div ref={dropdownElement} id={props.id} class="z-50 hidden">
        {props.dropDownElement}
      </div>
    </>
  );
};
