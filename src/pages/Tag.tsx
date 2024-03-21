import { For, Show, createResource, createSignal } from "solid-js";
import { TagService } from "../api-service";
import { TagCard } from "@components/tag/TagCard";
import { Button } from "@components/general/Button";
import { AddTagForm, AddTagModal } from "@components/tag/AddTagModal";
import { EmptyState } from "@components/tag/EmptyState";
import { ListTimeEventTagResponse } from "../openapi";
import { produce, unwrap } from "solid-js/store";

export default function Tag() {
  const [tags, tagsActions] = createResource(TagService.listTimeEventTag);

  const [showAddTagModal, setShowAddTagModal] = createSignal(false);

  // todo: add order to db
  async function handleAddTag(x: AddTagForm) {
    const newTag = (await TagService.addTimeEventTag(x)).timeEventTag;
    tagsActions.mutate(x => {
      if (!x) return x;

      return {
        timeEventTags: [...x.timeEventTags, newTag],
        timeEventTagOrder: [...x.timeEventTagOrder, newTag.id],
      };
    });

    setShowAddTagModal(false);
  }

  async function handleNameClick(id: number) {
    console.log(id);
  }

  async function handleEditClick(id: number) {
    console.log("edit", id);
  }

  async function handleDeleteClick(id: number) {
    await TagService._delete(id);
    tagsActions.mutate(x => {
      if (!x) return x;

      return {
        timeEventTags: x.timeEventTags.filter(y => y.id !== id),
        timeEventTagOrder: x.timeEventTagOrder.filter(y => y !== id),
      };
    });
  }

  return (
    <div class="p-6">
      <Show when={tags.loading}>
        <div>Loading...</div>
      </Show>

      <Show when={tags()}>
        {nonNullData => (
          <Show when={nonNullData().timeEventTags.length > 0} fallback={<EmptyState />}>
            <div class="space-y-6">
              <For
                each={nonNullData().timeEventTags.sort(
                  (a, b) => nonNullData().timeEventTagOrder.findIndex(x => x === a.id) - nonNullData().timeEventTagOrder.findIndex(x => x === b.id),
                )}
              >
                {x => <TagCard {...x} onNameClick={handleNameClick} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />}
              </For>
            </div>
          </Show>
        )}
      </Show>

      <Button class="fixed bottom-24 left-1/2 -translate-x-1/2" onClick={() => setShowAddTagModal(true)}>
        + 新增
      </Button>
      <AddTagModal open={showAddTagModal()} setOpen={setShowAddTagModal} handleAddTag={handleAddTag} />
    </div>
  );
}
