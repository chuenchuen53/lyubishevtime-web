import { Select } from "@ark-ui/solid";
import { Index } from "solid-js";
import { twMerge } from "tailwind-merge";
import { FaSolidAngleDown } from "solid-icons/fa";
import { FiCheck } from "solid-icons/fi";
import styles from "./index.module.scss";
import type { JSX, JSXElement } from "solid-js";

const { Root, Label, Control, Trigger, ValueText, Positioner, Content, ItemGroup, Item, ItemText, ItemIndicator, Indicator } = Select;

interface SingleSelectProps<T> {
  label?: string;
  id: string;
  items: { label: string; value: T }[];
  value: T;
  onValueChange: (newValue: T) => void;
  renderItem: (item: { label: string; value: T }) => JSX.Element;
  triggerClass?: string;
}

const StyleRoot: typeof Root = props => {
  return <Root class="flex flex-col gap-1.5" {...props} />;
};

const StyledTrigger = (props: { class?: string; children: JSXElement }) => {
  return (
    <Trigger
      class={twMerge(
        styles.trigger,
        "flex w-full items-center justify-between overflow-hidden rounded-lg border border-neutral-border bg-neutral-bg-container p-2.5 text-sm text-neutral-text data-[placeholder-shown]:text-neutral-text-tertiary",
        props.class,
      )}
    >
      {props.children}
    </Trigger>
  );
};

const StyledContent = (props: { children: JSXElement }) => {
  return <Content class={`${styles.dropdown} z-10 rounded-lg bg-neutral-bg-elevated p-1 text-sm`}>{props.children}</Content>;
};

const StyledItem = (props: { item: { label: string; value: string }; children: JSXElement }) => {
  return (
    <Item
      class="flex cursor-pointer items-center justify-between rounded-md px-1.5 py-2 hover:bg-neutral-fill-tertiary data-[state=checked]:bg-primary-bg data-[state=checked]:font-semibold dark:data-[state=checked]:bg-primary/90"
      item={props.item}
    >
      {props.children}
    </Item>
  );
};

const StyledItemIndicator = () => {
  return (
    <ItemIndicator class="data-[state=checked]:text-primary dark:data-[state=checked]:text-primary-200">
      <FiCheck />
    </ItemIndicator>
  );
};

export const SingleSelect = <T extends string>(props: SingleSelectProps<T>) => {
  return (
    <StyleRoot positioning={{ sameWidth: true }} items={props.items} value={[props.value]} onValueChange={e => props.onValueChange(e.value[0] as T)}>
      <Label>{props.label}</Label>
      <Control>
        <StyledTrigger class={props.triggerClass}>
          <ValueText class="truncate" placeholder="請選擇一個" />
          <Indicator>
            <FaSolidAngleDown />
          </Indicator>
        </StyledTrigger>
      </Control>

      <Positioner>
        <StyledContent>
          <ItemGroup id={props.id}>
            <Index each={props.items}>
              {x => (
                <StyledItem item={x()}>
                  <ItemText>{props.renderItem(x())}</ItemText>
                  <StyledItemIndicator />
                </StyledItem>
              )}
            </Index>
          </ItemGroup>
        </StyledContent>
      </Positioner>
    </StyleRoot>
  );
};

interface MultipleSelectProps<T> {
  label?: string;
  id: string;
  items: { label: string; value: T }[];
  value: T[];
  onValueChange: (newValue: T[]) => void;
  renderItem: (item: { label: string; value: T }) => JSX.Element;
  triggerClass?: string;
}

export const MultipleSelect = <T extends string>(props: MultipleSelectProps<T>) => {
  return (
    <StyleRoot
      multiple
      positioning={{ sameWidth: true }}
      items={props.items}
      value={props.value}
      onValueChange={detail => props.onValueChange(detail.value as T[])}
    >
      <Label>{props.label}</Label>
      <Control>
        <StyledTrigger class={props.triggerClass}>
          <ValueText class="truncate" placeholder="請選擇" />
          <Indicator>
            <FaSolidAngleDown />
          </Indicator>
        </StyledTrigger>
      </Control>
      <Positioner>
        <StyledContent>
          <ItemGroup id={props.id}>
            <Index each={props.items}>
              {x => (
                <StyledItem item={x()}>
                  <ItemText>{props.renderItem(x())}</ItemText>
                  <StyledItemIndicator />
                </StyledItem>
              )}
            </Index>
          </ItemGroup>
        </StyledContent>
      </Positioner>
    </StyleRoot>
  );
};
