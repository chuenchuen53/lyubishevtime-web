import { createSignal } from "solid-js";
import { MultipleSelect as MultipleSelectComp } from "..";
import type { Meta, StoryObj } from "storybook-solidjs";

const selectItems = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "jQuery", value: "jquery" },
];

const [multiSelectedValue, setMultiSelectedValue] = createSignal(["react", "solid"]);

const meta: Meta<typeof MultipleSelectComp> = {
  title: "general/Select/MultipleSelect",
  component: MultipleSelectComp,
  render: args => {
    return (
      <div>
        <MultipleSelectComp
          label={args.label}
          id="multiple-value-select-ui-test"
          triggerClass="w-48"
          items={selectItems}
          value={multiSelectedValue()}
          onValueChange={setMultiSelectedValue}
          renderItem={item => <div>{item.label}</div>}
        />
        <br />
        <div>Selected Value: {multiSelectedValue().join(", ")}</div>
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof MultipleSelectComp>;

export const MultipleSelect: Story = {
  args: {
    label: "Multiple Value Select",
  },
};
