import { useSearchParams } from "@solidjs/router";
import { Show, createEffect, createMemo, createResource, createSignal, untrack } from "solid-js";
import { z } from "zod";
import { EmptyState } from "@components/common/EmptyState";
import { EventCard } from "@components/event/EventCard";
import { Button } from "@components/general/Button";
import { AddEventModal } from "@components/event/AddEventModal";
import { EditEventModal } from "@components/event/EditEventModal";
import { MultipleSelect } from "@components/general/Select";
import { DatePicker } from "@components/general/DatePicker";
import { DateUtil } from "@utils/DateUtil";
import { RiArrowsArrowLeftSLine, RiArrowsArrowRightSLine } from "solid-icons/ri";
import IconButton from "@components/general/Button/IconButton";
import { createStore } from "solid-js/store";
import { IoTime } from "solid-icons/io";
import { PageLoading } from "@components/common/PageLoading";
import { useDelayedLoading } from "@reactivity/useDelayedLoading";
import { ConfirmationModal } from "@components/general/Modal/ConfirmationModal";
import { TransitionList } from "@components/common/TransitionList";
import { EventService, TagService } from "../api-service";
import type { ListOneDayTimeEventResponse, TimeEvent } from "../openapi";

interface Filter {
  date?: string;
  tagIds?: number[];
}

const tagIdsSchema = z
  .string()
  .refine(x => {
    try {
      return atob(x).match(/^(\d+,)*\d+$/);
    } catch (e) {
      return false;
    }
  })
  .transform(tagIds => atob(tagIds))
  .optional();

const dateStringSchema = z.string().refine(DateUtil.isValidDate).optional();

const ParamsSchema = z.object({
  date: dateStringSchema,
  tagIds: tagIdsSchema,
});

type Params = z.infer<typeof ParamsSchema>;

function parseParams(searchParams: Params): Filter {
  const result = ParamsSchema.safeParse(searchParams);
  if (result.success) {
    return {
      date: result.data.date,
      tagIds: result.data.tagIds?.split(",").map(Number),
    };
  }
  return {
    date: undefined,
    tagIds: undefined,
  };
}

async function fetchEvents(filter: Filter): Promise<ListOneDayTimeEventResponse> {
  return await EventService.getOneDayEvents(filter.date ?? DateUtil.todayString(), filter.tagIds);
}

export default function Event() {
  const [searchParams, setSearchParams] = useSearchParams<Params>();
  const [filter, setFilter] = createStore<Filter>(parseParams(searchParams));
  const [events, eventsActions] = createResource(() => ({ ...filter }), fetchEvents);
  const [tags, _tagsActions] = createResource(TagService.listTimeEventTag);
  const [tagIdsForSelect, setTagIdsForSelect] = createSignal<string[]>(untrack(() => filter.tagIds?.map(String)) ?? []);
  const [showAddEventModal, setShowAddEventModal] = createSignal(false);
  const [editingEvent, setEditingTag] = createSignal<TimeEvent | null>(null);
  const [loading, setDeferLoading, setNotLoading] = useDelayedLoading(750);

  const pageDate = createMemo(() => filter.date ?? DateUtil.todayString());

  createEffect(() => {
    setSearchParams({
      date: filter.date,
      tagIds: filter.tagIds ? btoa(filter.tagIds.join(",")) : undefined,
    });
  });

  createEffect(() => {
    if (events.loading) {
      setDeferLoading();
    } else {
      setNotLoading();
    }
  });

  const handleEditClick = (id: number) => {
    const selected = events()?.timeEvents.find(x => x.id === id);
    if (selected) setEditingTag(selected);
  };

  const updateEvent = async (editedEvent: TimeEvent) => {
    eventsActions.mutate(data => {
      if (!data) return data;
      return {
        timeEvents: data.timeEvents.map(x => (x.id === editedEvent.id ? editedEvent : x)),
      } satisfies ListOneDayTimeEventResponse;
    });
  };

  const handleDeleteClick = async (id: number) => {
    const confirm = await ConfirmationModal.create({
      title: "刪除活動",
      message: "確定要刪除這個活動嗎？",
      confirmButtonVariant: "danger",
    });
    if (!confirm) return;
    await EventService.deleteTimeEvent(id);
    eventsActions.mutate(data => {
      if (!data) return data;
      return {
        timeEvents: data.timeEvents.filter(x => x.id !== id),
      } satisfies ListOneDayTimeEventResponse;
    });
  };

  const addEvent = async (newEvent: TimeEvent) => {
    eventsActions.mutate(data => {
      if (!data) return data;
      return {
        timeEvents: [...data.timeEvents, newEvent],
      } satisfies ListOneDayTimeEventResponse;
    });
  };

  return (
    <div>
      <Show when={loading()}>
        <PageLoading />
      </Show>

      <div class="relative -mt-4 mb-6 h-10">
        <div class="flex h-10 flex-grow items-center justify-center gap-2">
          <IconButton onClick={() => setFilter("date", DateUtil.prevDayString(pageDate()))}>
            <RiArrowsArrowLeftSLine size="24" />
          </IconButton>
          <div class="font-bold">{pageDate()}</div>
          <IconButton onClick={() => setFilter("date", DateUtil.nextDayString(pageDate()))}>
            <RiArrowsArrowRightSLine size="24" />
          </IconButton>
        </div>

        <div class="absolute right-0 top-0">
          <DatePicker value={pageDate()} setValue={x => setFilter("date", x)} />
        </div>
      </div>

      <Show when={tags()}>
        {nonNullTags => (
          <Show when={events()}>
            {nonNullEvents => (
              <>
                <div class="mb-6">
                  <MultipleSelect
                    label="標籤"
                    placeholder="全部"
                    id="tags-filter"
                    items={nonNullTags().timeEventTags.map(x => ({ label: x.name, value: x.id.toString() }))}
                    value={tagIdsForSelect()}
                    onValueChange={setTagIdsForSelect}
                    onExitComplete={() => setFilter("tagIds", tagIdsForSelect().map(Number))}
                    renderItem={x => x.label}
                  />
                </div>
                <Show
                  when={nonNullEvents().timeEvents.length > 0}
                  fallback={
                    <div class="flex min-h-[280px] items-center justify-center">
                      <EmptyState title="這天没有活動記錄" icon={<IoTime size="90" />} />
                    </div>
                  }
                >
                  <div class="space-y-6 pb-24">
                    <TransitionList
                      data={nonNullEvents()
                        .timeEvents.slice()
                        .sort((a, b) => DateUtil.minsFromTimeString(a.startTime) - DateUtil.minsFromTimeString(b.startTime))}
                      key="id"
                      animation="fade-slide-in-out"
                    >
                      {x => (
                        <EventCard
                          id={x().id}
                          tagId={x().tagId}
                          startTime={x().startTime}
                          minute={x().minute}
                          name={x().name}
                          color={nonNullTags().timeEventTags.find(y => y.id === x().tagId)!.color}
                          tagName={nonNullTags().timeEventTags.find(y => y.id === x().tagId)!.name}
                          onEditClick={handleEditClick}
                          onDeleteClick={handleDeleteClick}
                        />
                      )}
                    </TransitionList>
                  </div>
                </Show>
                <Show when={nonNullTags()?.timeEventTags.length}>
                  <Button class="fixed bottom-24 left-1/2 -translate-x-1/2" onClick={() => setShowAddEventModal(true)}>
                    + 新增
                  </Button>
                </Show>
                <AddEventModal
                  open={showAddEventModal()}
                  onClose={() => setShowAddEventModal(false)}
                  onSuccessfulAdd={addEvent}
                  tags={nonNullTags().timeEventTags}
                  pageDate={pageDate()}
                />
                <EditEventModal
                  open={Boolean(editingEvent())}
                  onClose={() => setEditingTag(null)}
                  onSuccessfulEdit={updateEvent}
                  tags={nonNullTags().timeEventTags}
                  editingEvent={editingEvent()}
                />
              </>
            )}
          </Show>
        )}
      </Show>
    </div>
  );
}
