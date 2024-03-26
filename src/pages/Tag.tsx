import { For, Show, createResource, createSignal } from "solid-js";
import { TagCard } from "@components/tag/TagCard";
import { Button } from "@components/general/Button";
import { AddTagModal } from "@components/tag/AddTagModal";
import { EmptyState } from "@components/tag/EmptyState";
import { EditTagModal } from "@components/tag/EditTagModal";
import { useNavigate } from "@solidjs/router";
import { ApiUtil } from "@utils/ApiUtil";
import { TagService } from "../api-service";
import type { TagForm } from "@stores/TagStore";
import type { TimeEventTag } from "../openapi";

export default function Tag() {
  const [tags, tagsActions] = createResource(TagService.listTimeEventTag);
  const [showAddTagModal, setShowAddTagModal] = createSignal(false);
  const [editingTag, setEditingTag] = createSignal<null | TimeEventTag>(null);
  const navigate = useNavigate();

  async function handleAddTag(x: TagForm) {
    const newTag = (await ApiUtil.fetchWithErrorMessage("新增標籤失敗", TagService.addTimeEventTag, x))?.timeEventTag;
    if (!newTag) return;
    tagsActions.mutate(x => {
      if (!x) return;
      x.timeEventTags.push(newTag);
      x.timeEventTagOrder.push(newTag.id);
      return { ...x };
    });
    setShowAddTagModal(false);
  }

  async function handleSubmitEditTag(editedTag: TagForm) {
    const initTag = editingTag();
    if (!initTag) return;

    const newTag: TimeEventTag = {
      id: initTag.id,
      name: editedTag.name,
      color: editedTag.color,
    };
    await TagService.updateTimeEventTag(newTag);
    setEditingTag(null);
    tagsActions.mutate(x => {
      if (!x) return x;
      return {
        timeEventTags: x.timeEventTags.map(y => (y.id === newTag.id ? newTag : y)),
        timeEventTagOrder: [...x.timeEventTagOrder],
      };
    });
  }

  async function handleNameClick(id: number) {
    navigate(`/event/?tagIds=${btoa(id.toString())}`);
  }

  async function handleReorder(id: number, direction: "up" | "down") {
    const oldOrder = tags()?.timeEventTagOrder;
    if (!oldOrder) return;

    const currentIndex = oldOrder.findIndex(x => x === id);
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= oldOrder.length) return;

    const newOrder = [...oldOrder];
    [newOrder[currentIndex], newOrder[newIndex]] = [newOrder[newIndex], newOrder[currentIndex]];

    tagsActions.mutate(x => {
      if (!x) return x;
      return {
        timeEventTags: [...x.timeEventTags],
        timeEventTagOrder: newOrder,
      };
    });

    try {
      TagService.reorderTimeEventTag({ tagIds: newOrder });
    } catch (e) {
      console.log("todo error");
      tagsActions.mutate(x => {
        return x
          ? {
              timeEventTags: x.timeEventTags,
              timeEventTagOrder: oldOrder,
            }
          : undefined;
      });
    }
  }

  async function handleEditClick(id: number) {
    const selected = tags()?.timeEventTags.find(x => x.id === id);
    if (selected) setEditingTag(selected);
  }

  async function handleDeleteClick(id: number) {
    await TagService.deleteTimeEventTag(id);
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
            <div class="space-y-6 pb-24">
              <For
                each={nonNullData().timeEventTags.sort(
                  (a, b) => nonNullData().timeEventTagOrder.findIndex(x => x === a.id) - nonNullData().timeEventTagOrder.findIndex(x => x === b.id),
                )}
              >
                {x => (
                  <TagCard
                    {...x}
                    onNameClick={handleNameClick}
                    onReorderClick={handleReorder}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                  />
                )}
              </For>
            </div>
          </Show>
        )}
      </Show>

      <Button class="fixed bottom-24 left-1/2 -translate-x-1/2" onClick={() => setShowAddTagModal(true)}>
        + 新增
      </Button>
      <AddTagModal open={showAddTagModal()} onClose={() => setShowAddTagModal(false)} handleAddTag={handleAddTag} />
      <Show when={editingTag()}>
        {nonNullEditingTag => (
          <EditTagModal open onClose={() => setEditingTag(null)} handleSubmitEditTag={handleSubmitEditTag} initialForm={{ ...nonNullEditingTag() }} />
        )}
      </Show>
    </div>
  );
}
