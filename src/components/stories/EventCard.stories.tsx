import { For } from "solid-js";
import { TimeEventTagColor } from "@openapi";
import { timeEventTagColorTranslate } from "@utils/ApiTranslator";
import { EnumUtil } from "@utils/EnumUtil";
import { EventCard as EventCardComp } from "@components/event/EventCard";
import type { Meta, StoryObj } from "storybook-solidjs";

function dummyFn() {}

const eventItems = EnumUtil.values(TimeEventTagColor).map(x => ({
  tagId: 1,
  tagName: timeEventTagColorTranslate(x),
  color: x,
  startTime: "00:00:00",
  minute: 60,
  name: timeEventTagColorTranslate(x),
  onEditClick: dummyFn,
  onDeleteClick: dummyFn,
}));

const meta: Meta<typeof EventCardComp> = {
  title: "app/EventCard",
  component: EventCardComp,
  render: _args => {
    return (
      <div class="mx-auto flex max-w-2xl flex-col gap-6">
        <For each={eventItems}>{(x, index) => <EventCardComp id={index()} {...x} />}</For>
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof EventCardComp>;

export const EventCard: Story = {};
