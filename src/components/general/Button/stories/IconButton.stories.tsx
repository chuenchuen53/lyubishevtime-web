import { BiSolidPencil } from "solid-icons/bi";
import { IconButton as IconButtonComp } from "../IconButton";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof IconButtonComp> = {
  title: "general/IconButton",
  component: IconButtonComp,
  render: _args => {
    return (
      <div class="flex gap-6">
        <IconButtonComp>
          <BiSolidPencil size={24} />
        </IconButtonComp>
        <IconButtonComp variant="primary">
          <BiSolidPencil size={24} />
        </IconButtonComp>
        <IconButtonComp variant="danger">
          <BiSolidPencil size={24} />
        </IconButtonComp>
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof IconButtonComp>;

export const IconButton: Story = {};
