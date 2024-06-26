import { Show, createResource, createSignal } from "solid-js";
import { TagCard } from "@components/tag/TagCard";
import { Button } from "@components/general/Button";
import { AddTagModal } from "@components/tag/AddTagModal";
import { EmptyState } from "@components/common/EmptyState";
import { EditTagModal } from "@components/tag/EditTagModal";
import { useNavigate } from "@solidjs/router";
import { TagPageSkeleton } from "@components/tag/TagPageSkeleton";
import { Message } from "@components/general/Message";
import { AiFillTag } from "solid-icons/ai";
import { ConfirmationModal } from "@components/general/Modal/ConfirmationModal";
import { TransitionList } from "@components/common/TransitionList";
import { TagService } from "../api-service";
import type { TimeEventTag } from "../openapi";

export default function Tag() {
  const navigate = useNavigate();
  const [data, dataActions] = createResource(TagService.listTimeEventTag);
  const [showAddTagModal, setShowAddTagModal] = createSignal(false);
  const [editingTag, setEditingTag] = createSignal<null | TimeEventTag>(null);

  function addTag(newTag: TimeEventTag) {
    dataActions.mutate(x => {
      if (!x) return;
      x.timeEventTags.push(newTag);
      x.timeEventTagOrder.push(newTag.id);
      return { ...x };
    });
  }

  function updateTag(modifiedTag: TimeEventTag) {
    dataActions.mutate(x => {
      if (!x) return x;
      return {
        timeEventTags: x.timeEventTags.map(y => (y.id === modifiedTag.id ? modifiedTag : y)),
        timeEventTagOrder: x.timeEventTagOrder,
      };
    });
  }

  function handleNameClick(id: number) {
    navigate(`/tag/${id}/all-event`);
  }

  async function handleReorder(id: number, direction: "up" | "down") {
    const oldOrder = data()?.timeEventTagOrder;
    if (!oldOrder) return;

    const currentIndex = oldOrder.findIndex(x => x === id);
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= oldOrder.length) return;

    const newOrder = [...oldOrder];
    [newOrder[currentIndex], newOrder[newIndex]] = [newOrder[newIndex], newOrder[currentIndex]];

    dataActions.mutate(x => {
      if (!x) return x;
      return {
        timeEventTags: x.timeEventTags,
        timeEventTagOrder: newOrder,
      };
    });

    try {
      await TagService.reorderTimeEventTag({ tagIds: newOrder });
    } catch (e) {
      Message.createError("重新排序失敗");
      dataActions.mutate(x => {
        return x
          ? {
              timeEventTags: x.timeEventTags,
              timeEventTagOrder: oldOrder,
            }
          : undefined;
      });
    }
  }

  function handleEditClick(id: number) {
    const selected = data()?.timeEventTags.find(x => x.id === id);
    if (selected) setEditingTag(selected);
  }

  async function handleDeleteClick(id: number) {
    const { anyEvent } = await TagService.anyEvent(id);
    if (anyEvent) {
      Message.createError("請先刪除所有相關的活動後再刪除標籤");
      return;
    }
    const confirm = await ConfirmationModal.create({
      title: "確認刪除",
      message: "您確定要刪除這個標籤嗎？",
      confirmButtonVariant: "danger",
    });
    if (!confirm) return;
    await TagService.deleteTimeEventTag(id);
    dataActions.mutate(x => {
      if (!x) return x;
      return {
        timeEventTags: x.timeEventTags.filter(y => y.id !== id),
        timeEventTagOrder: x.timeEventTagOrder.filter(y => y !== id),
      };
    });
  }

  return (
    <div>
      <Show when={data.loading}>
        <TagPageSkeleton />
      </Show>

      <Show when={data()}>
        {nonNullData => (
          <>
            <Show
              when={nonNullData().timeEventTags.length > 0}
              fallback={
                <div class="flex min-h-[400px] items-center justify-center">
                  <EmptyState title="您目前没有標籤" icon={<AiFillTag size="80" />} />
                </div>
              }
            >
              <div class="flex flex-col gap-6 pb-24">
                <TransitionList
                  data={nonNullData().timeEventTags.sort(
                    (a, b) => nonNullData().timeEventTagOrder.findIndex(x => x === a.id) - nonNullData().timeEventTagOrder.findIndex(x => x === b.id),
                  )}
                  key="id"
                  animation="fade-slide-in-out"
                >
                  {x => (
                    <TagCard
                      {...x()}
                      onNameClick={handleNameClick}
                      onReorderClick={handleReorder}
                      onEditClick={handleEditClick}
                      onDeleteClick={handleDeleteClick}
                    />
                  )}
                </TransitionList>
              </div>
            </Show>

            <Button class="fixed bottom-24 left-1/2 -translate-x-1/2" onClick={() => setShowAddTagModal(true)}>
              + 新增
            </Button>
            <AddTagModal open={showAddTagModal()} onClose={() => setShowAddTagModal(false)} onSuccessfulAdd={addTag} />
            <EditTagModal onClose={() => setEditingTag(null)} onSuccessfulEdit={updateTag} editingTag={editingTag()} />
          </>
        )}
      </Show>
    </div>
  );
}
