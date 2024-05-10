import { TestNew as TestNewComp } from ".";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof TestNewComp> = {
  title: "general/TestNew",
  component: TestNewComp,
  // render: () => <TestNewComp />,
};

type Story = StoryObj<typeof TestNewComp>;

export const TestNew: Story = {};

export default meta;
