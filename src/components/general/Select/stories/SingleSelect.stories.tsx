import { createSignal } from "solid-js";
import { SingleSelect as SingleSelectComp } from "..";
import type { Meta, StoryObj } from "storybook-solidjs";

const selectItems = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "jQuery", value: "jquery" },
];

const [singleSelectedValue, setSingleSelectedValue] = createSignal("react");

const meta: Meta<typeof SingleSelectComp> = {
  title: "general/Select/SingleSelect",
  component: SingleSelectComp,
  render: args => {
    return (
      <div>
        <SingleSelectComp
          id="single-value-select-ui-test"
          triggerClass="w-48"
          items={selectItems}
          value={singleSelectedValue()}
          onValueChange={setSingleSelectedValue}
          renderItem={item => <div>{item.label}</div>}
          label={args.label}
        />
        <br />
        <div>Selected Value: {singleSelectedValue()}</div>
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof SingleSelectComp>;

export const SingleSelect: Story = {
  args: {
    label: "Single Value Select",
  },
};
