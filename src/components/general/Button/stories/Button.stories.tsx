import { Button } from "..";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof Button> = {
  title: "general/Button",
  component: Button,
  argTypes: {
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
  },
  render: args => {
    return (
      <div class="flex gap-6">
        <Button variant="primary" {...args}>
          primary
        </Button>
        <Button variant="danger" {...args}>
          danger
        </Button>
        <Button variant="gray" {...args}>
          gray
        </Button>
        <Button variant="text" {...args}>
          text
        </Button>
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Main: Story = {
  args: {
    disabled: false,
    loading: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    disabled: false,
    loading: true,
  },
};
