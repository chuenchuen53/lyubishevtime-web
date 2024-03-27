import { TagCard } from "@components/tag/TagCard";
import { timeEventTagColorTranslate } from "@utils/ApiTranslator";
import { EnumUtil } from "@utils/EnumUtil";
import { For } from "solid-js";
import { TimeEventTagColor } from "../../openapi";

function dummyFn() {}

const items = EnumUtil.values(TimeEventTagColor).map(x => ({
  name: timeEventTagColorTranslate(x),
  color: x,
  onNameClick: dummyFn,
  onReorderClick: dummyFn,
  onEditClick: dummyFn,
  onDeleteClick: dummyFn,
}));

export const TagsColor = () => {
  return <For each={items}>{(x, index) => <TagCard id={index()} {...x} />}</For>;
};
