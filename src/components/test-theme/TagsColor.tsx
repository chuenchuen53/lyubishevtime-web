import { TagCard } from "@components/tag/TagCard";
import { timeEventTagColorTranslate } from "@utils/ApiTranslator";
import { EnumUtil } from "@utils/EnumUtil";
import { For } from "solid-js";
import { EventCard } from "@components/event/EventCard";
import { TimeEventTagColor } from "../../openapi";

function dummyFn() {}

const tagItems = EnumUtil.values(TimeEventTagColor).map(x => ({
  name: timeEventTagColorTranslate(x),
  color: x,
  onNameClick: dummyFn,
  onReorderClick: dummyFn,
  onEditClick: dummyFn,
  onDeleteClick: dummyFn,
}));

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

export const TagColor = () => {
  return (
    <>
      <For each={tagItems}>{(x, index) => <TagCard id={index()} {...x} />}</For>
      <For each={eventItems}>{(x, index) => <EventCard id={index()} {...x} />}</For>
    </>
  );
};
