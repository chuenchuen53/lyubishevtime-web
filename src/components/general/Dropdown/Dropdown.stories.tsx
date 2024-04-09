import { Index } from "solid-js";
import { Button } from "../Button";
import { Dropdown as DropdownComp } from ".";
import type { Meta, StoryObj } from "storybook-solidjs";

const dropdownItems = ["Dashboard", "Settings", "Earnings", "Sign out"];

const meta: Meta<typeof DropdownComp> = {
  title: "general/Dropdown",
  component: DropdownComp,
  render: _args => {
    return (
      <DropdownComp
        id="dropdown-ui-test"
        class="inline-block"
        options={{ placement: "bottom-start" }}
        dropdownClass="w-36"
        dropdownElement={
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
            <Index each={dropdownItems}>{x => <li class="block px-4 py-2 hover:bg-neutral-fill-tertiary">{x()}</li>}</Index>
          </ul>
        }
      >
        <Button class="w-36">Open</Button>
      </DropdownComp>
    );
  },
};

export default meta;
type Story = StoryObj<typeof DropdownComp>;

export const Dropdown: Story = {};
