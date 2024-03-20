import { For, Show, createResource, createSignal } from "solid-js";
import { TagService } from "../api-service";
import { TagCard } from "@components/tag/TagCard";
import { Modal } from "@components/general/Modal";
import { Button } from "@components/general/Button";
import { AddTagModal } from "@components/tag/AddTagModal";

export default function Tag() {
  const [data] = createResource(TagService.listTimeEventTag);

  const [showAddTagModal, setShowAddTagModal] = createSignal(true);

  function closeModal() {
    setShowAddTagModal(false);
  }

  function handleAddTag() {
    console.log("Add tag");
  }

  return (
    <div class="p-6">
      <Show when={data()?.data}>
        {nonNullData => (
          <div class="space-y-6">
            <For each={nonNullData().timeEventTags}>{x => <TagCard {...x} onClick={() => console.log(x)} />}</For>
          </div>
        )}
      </Show>

      <Button onClick={() => setShowAddTagModal(true)}>+ 新增</Button>
      <AddTagModal open={showAddTagModal()} setOpen={setShowAddTagModal} handleAddTag={handleAddTag} />
    </div>
  );
}
