import { Select } from "@ark-ui/solid";
import { Show, type ComponentProps, JSX, For } from "solid-js";
import { tv } from "tailwind-variants";
import { createStyleContext } from "@lib/create-style-context";

const styles = tv(
  {
    base: "select",
    defaultVariants: { size: "md", variant: "outline" },
    slots: {
      label: "select__label",
      positioner: "select__positioner",
      trigger: "select__trigger",
      indicator: "select__indicator",
      clearTrigger: "select__clearTrigger",
      item: "select__item",
      itemText: "select__itemText",
      itemIndicator: "select__itemIndicator",
      itemGroup: "select__itemGroup",
      itemGroupLabel: "select__itemGroupLabel",
      content: "select__content",
      root: "select__root",
      control: "select__control",
      valueText: "select__valueText",
    },
    variants: {
      variant: {
        outline: {
          label: "select__label--variant_outline",
          positioner: "select__positioner--variant_outline",
          trigger: "select__trigger--variant_outline",
          indicator: "select__indicator--variant_outline",
          clearTrigger: "select__clearTrigger--variant_outline",
          item: "select__item--variant_outline",
          itemText: "select__itemText--variant_outline",
          itemIndicator: "select__itemIndicator--variant_outline",
          itemGroup: "select__itemGroup--variant_outline",
          itemGroupLabel: "select__itemGroupLabel--variant_outline",
          content: "select__content--variant_outline",
          root: "select__root--variant_outline",
          control: "select__control--variant_outline",
          valueText: "select__valueText--variant_outline",
        },
        ghost: {
          label: "select__label--variant_ghost",
          positioner: "select__positioner--variant_ghost",
          trigger: "select__trigger--variant_ghost",
          indicator: "select__indicator--variant_ghost",
          clearTrigger: "select__clearTrigger--variant_ghost",
          item: "select__item--variant_ghost",
          itemText: "select__itemText--variant_ghost",
          itemIndicator: "select__itemIndicator--variant_ghost",
          itemGroup: "select__itemGroup--variant_ghost",
          itemGroupLabel: "select__itemGroupLabel--variant_ghost",
          content: "select__content--variant_ghost",
          root: "select__root--variant_ghost",
          control: "select__control--variant_ghost",
          valueText: "select__valueText--variant_ghost",
        },
      },
      size: {
        sm: {
          label: "select__label--size_sm",
          positioner: "select__positioner--size_sm",
          trigger: "select__trigger--size_sm",
          indicator: "select__indicator--size_sm",
          clearTrigger: "select__clearTrigger--size_sm",
          item: "select__item--size_sm",
          itemText: "select__itemText--size_sm",
          itemIndicator: "select__itemIndicator--size_sm",
          itemGroup: "select__itemGroup--size_sm",
          itemGroupLabel: "select__itemGroupLabel--size_sm",
          content: "select__content--size_sm",
          root: "select__root--size_sm",
          control: "select__control--size_sm",
          valueText: "select__valueText--size_sm",
        },
        md: {
          label: "select__label--size_md",
          positioner: "select__positioner--size_md",
          trigger: "select__trigger--size_md",
          indicator: "select__indicator--size_md",
          clearTrigger: "select__clearTrigger--size_md",
          item: "select__item--size_md",
          itemText: "select__itemText--size_md",
          itemIndicator: "select__itemIndicator--size_md",
          itemGroup: "select__itemGroup--size_md",
          itemGroupLabel: "select__itemGroupLabel--size_md",
          content: "select__content--size_md",
          root: "select__root--size_md",
          control: "select__control--size_md",
          valueText: "select__valueText--size_md",
        },
        lg: {
          label: "select__label--size_lg",
          positioner: "select__positioner--size_lg",
          trigger: "select__trigger--size_lg",
          indicator: "select__indicator--size_lg",
          clearTrigger: "select__clearTrigger--size_lg",
          item: "select__item--size_lg",
          itemText: "select__itemText--size_lg",
          itemIndicator: "select__itemIndicator--size_lg",
          itemGroup: "select__itemGroup--size_lg",
          itemGroupLabel: "select__itemGroupLabel--size_lg",
          content: "select__content--size_lg",
          root: "select__root--size_lg",
          control: "select__control--size_lg",
          valueText: "select__valueText--size_lg",
        },
      },
    },
  },
  { twMerge: false },
);
const { withProvider, withContext } = createStyleContext(styles);

export const Root = withProvider(Select.Root, "root");
export const ClearTrigger = withContext(Select.ClearTrigger, "clearTrigger");
export const Content = withContext(Select.Content, "content");
export const Control = withContext(Select.Control, "control");
export const Indicator = withContext(Select.Indicator, "indicator");
export const Item = withContext(Select.Item, "item");
export const ItemGroup = withContext(Select.ItemGroup, "itemGroup");
export const ItemGroupLabel = withContext(Select.ItemGroupLabel, "itemGroupLabel");
export const ItemIndicator = withContext(Select.ItemIndicator, "itemIndicator");
export const ItemText = withContext(Select.ItemText, "itemText");
export const Label = withContext(Select.Label, "label");
export const Positioner = withContext(Select.Positioner, "positioner");
export const Trigger = withContext(Select.Trigger, "trigger");
export const ValueText = withContext(Select.ValueText, "valueText");

export type RootProps = ComponentProps<typeof Root>;
export interface ClearTriggerProps extends ComponentProps<typeof ClearTrigger> {}
export interface ContentProps extends ComponentProps<typeof Content> {}
export interface ControlProps extends ComponentProps<typeof Control> {}
export interface IndicatorProps extends ComponentProps<typeof Indicator> {}
export interface ItemProps extends ComponentProps<typeof Item> {}
export interface ItemGroupProps extends ComponentProps<typeof ItemGroup> {}
export interface ItemGroupLabelProps extends ComponentProps<typeof ItemGroupLabel> {}
export interface ItemIndicatorProps extends ComponentProps<typeof ItemIndicator> {}
export interface ItemTextProps extends ComponentProps<typeof ItemText> {}
export interface LabelProps extends ComponentProps<typeof Label> {}
export interface PositionerProps extends ComponentProps<typeof Positioner> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
export interface ValueTextProps extends ComponentProps<typeof ValueText> {}

interface SimpleSelectProps<T> {
  label?: string;
  id: string;
  items: { label: string; value: T }[];
  value: T[];
  onValueChange: (newValue: T) => void;
  renderItem: (item: { label: string; value: T }) => JSX.Element;
}

export const SimpleSelect = <T extends string>(props: SimpleSelectProps<T>) => {
  return (
    <Root positioning={{ sameWidth: true }} items={props.items} value={props.value} onValueChange={e => props.onValueChange(e.value[0] as T)}>
      <Label>{props.label}</Label>
      <Control>
        <Trigger>
          <ValueText placeholder={props.label} />
        </Trigger>
      </Control>
      <Positioner>
        <Content>
          <ItemGroup id={props.id}>
            <Show when={props.label}>
              <ItemGroupLabel for={props.id}>{props.label}</ItemGroupLabel>
            </Show>
            <For each={props.items}>
              {x => (
                <Item item={x}>
                  <ItemText>{props.renderItem(x)}</ItemText>
                  <ItemIndicator>
                    <CheckIcon />
                  </ItemIndicator>
                </Item>
              )}
            </For>
          </ItemGroup>
        </Content>
      </Positioner>
    </Root>
  );
};

function CheckIcon() {
  return (
    <svg
      class="h-6 w-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
    </svg>
  );
}
