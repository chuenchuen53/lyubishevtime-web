import { For, Show, createResource } from "solid-js";
import { TagService } from "../api-service";
import { TagCard } from "@components/tag/TagCard";

export default function Tag() {
  const [data] = createResource(TagService.listTimeEventTag);

  return (
    <div class="p-6">
      <Show when={data()?.data}>
        {nonNullData => (
          <div class="space-y-6">
            <For each={nonNullData().timeEventTags}>{x => <TagCard {...x} onClick={() => console.log(x)} />}</For>
          </div>
        )}
      </Show>
    </div>
  );
}
