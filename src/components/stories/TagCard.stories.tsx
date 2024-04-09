import { For } from "solid-js";
import { TimeEventTagColor } from "@openapi";
import { timeEventTagColorTranslate } from "@utils/ApiTranslator";
import { EnumUtil } from "@utils/EnumUtil";
import { TagCard as TagCardComp } from "@components/tag/TagCard";
import type { Meta, StoryObj } from "storybook-solidjs";

function dummyFn() {}

const tagItems = EnumUtil.values(TimeEventTagColor).map(x => ({
  name: timeEventTagColorTranslate(x),
  color: x,
  onNameClick: dummyFn,
  onReorderClick: dummyFn,
  onEditClick: dummyFn,
  onDeleteClick: dummyFn,
}));

const meta: Meta<typeof TagCardComp> = {
  title: "app/TagCard",
  component: TagCardComp,
  render: _args => {
    return (
      <div class="mx-auto flex max-w-2xl flex-col gap-6">
        <For each={tagItems}>{(x, index) => <TagCardComp id={index()} {...x} />}</For>
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof TagCardComp>;

export const TagCard: Story = {};
