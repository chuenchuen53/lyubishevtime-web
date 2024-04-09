import { Input as InputComp } from ".";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof InputComp> = {
  title: "general/Input",
  component: InputComp,
  argTypes: {
    type: {
      options: ["text", "password", "number"],
      control: { type: "select" },
    },
  },
  render: args => {
    return (
      <div class="flex gap-6">
        <InputComp type={args.type} placeholder={args.placeholder} value="" />
        <InputComp type={args.type} placeholder={args.placeholder} value="" isError />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof InputComp>;

export const Input: Story = {
  args: {
    type: "text",
    placeholder: "input text here",
  },
};
