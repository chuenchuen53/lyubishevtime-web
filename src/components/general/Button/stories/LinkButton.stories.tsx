import { Route, Router } from "@solidjs/router";
import { LinkButton as LinkButtonComp } from "../LinkButton";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof LinkButtonComp> = {
  title: "general/LinkButton",
  component: LinkButtonComp,
  decorators: [
    Story => (
      <Router>
        <Route path="*" component={Story} />
      </Router>
    ),
  ],
  render: _args => (
    <div class="flex items-center gap-6">
      <LinkButtonComp href="/" variant="primary">
        primary
      </LinkButtonComp>
      <LinkButtonComp href="/" variant="danger">
        danger
      </LinkButtonComp>
      <LinkButtonComp href="/" variant="gray">
        gray
      </LinkButtonComp>
      <LinkButtonComp href="/" variant="text">
        text
      </LinkButtonComp>
      <LinkButtonComp href="/" variant="link">
        text
      </LinkButtonComp>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof LinkButtonComp>;

export const LinkButton: Story = {};
