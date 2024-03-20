import * as Select from "@components/general/Select";

export const Demo = (props: Select.RootProps) => {
  const items = [
    { label: "React", value: "react" },
    { label: "Solid", value: "solid" },
    { label: "Svelte", value: "svelte", disabled: true },
    { label: "Vue", value: "vue" },
  ];

  return (
    <Select.Root positioning={{ sameWidth: true }} {...props} items={items}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.ItemGroup id="framework">
            <Select.ItemGroupLabel for="framework">Framework</Select.ItemGroupLabel>
            {items.map(item => (
              <Select.Item item={item}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator>checked</Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
};
