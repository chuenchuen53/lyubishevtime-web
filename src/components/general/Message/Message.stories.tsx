import { Button } from "../Button";
import { Message as CMessage } from ".";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof CMessage.Root> = {
  title: "general/Message",
  component: CMessage.Root,
  render: _args => {
    return (
      <>
        <CMessage.Root />
        <div class="flex gap-6">
          <Button onClick={() => CMessage.create("Default")}>Default</Button>
          <Button onClick={() => CMessage.create("Success", "success")}>Success</Button>
          <Button onClick={() => CMessage.create("Error", "error")}>Error</Button>
        </div>
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof CMessage.Root>;

export const Message: Story = {};
