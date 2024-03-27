import { useSearchParams } from "@solidjs/router";
import { Show, createEffect, createResource, createSignal } from "solid-js";
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
import { TransitionGroup } from "solid-transition-group";
import { Key } from "@solid-primitives/keyed";
import { PageLoading } from "@components/common/PageLoading";
import { useDelayedLoading } from "@reactivity/useDelayWhen";
import { EventService } from "../api-service";
import type { ListTimeEventResponse, TimeEvent } from "../openapi";
import type { EventForm } from "@components/event/EventFormModal";

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

const emptyFilter: Filter = {
  date: undefined,
  tagIds: undefined,
};

function parseParams(searchParams: Params): Filter {
  const result = ParamsSchema.safeParse(searchParams);
  if (result.success) {
    return {
      date: result.data.date,
      tagIds: result.data.tagIds?.split(",").map(Number),
    };
  }
  return emptyFilter;
}

async function fetchEvents(filter: Omit<Filter, "tagIdsForSelect">): Promise<ListTimeEventResponse> {
  return await EventService.getEvents(filter.date ?? DateUtil.getTodayString(), filter.tagIds);
}

export default function Event() {
  const [searchParams, setSearchParams] = useSearchParams<Params>();
  const [filter, setFilter] = createStore<Filter>(parseParams(searchParams));
  const [events, eventsActions] = createResource(() => ({ ...filter }), fetchEvents);
  const [tagIdsForSelect, setTagIdsForSelect] = createSignal<string[]>([]);
  const [showAddEventModal, setShowAddEventModal] = createSignal(false);
  const [editingEvent, setEditingTag] = createSignal<TimeEvent | null>(null);
  const [loading, setDeferLoading, setNotLoading] = useDelayedLoading(750);

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

  const newInitialForm: () => EventForm = () => ({
    date: filter.date ?? DateUtil.todayString(),
    tagId: events()!.timeEventTags[0].id,
    name: "",
    startTime: "00:00:00",
    minute: 1,
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
        timeEventTags: data.timeEventTags,
        timeEventTagOrder: data.timeEventTagOrder,
      } satisfies ListTimeEventResponse;
    });
  };

  const handleDeleteClick = async (id: number) => {
    await EventService.deleteTimeEvent(id);
    eventsActions.mutate(data => {
      if (!data) return data;
      return {
        timeEvents: data.timeEvents.filter(x => x.id !== id),
        timeEventTags: [...data.timeEventTags],
        timeEventTagOrder: [...data.timeEventTagOrder],
      } satisfies ListTimeEventResponse;
    });
  };

  const addEvent = async (newEvent: TimeEvent) => {
    eventsActions.mutate(data => {
      if (!data) return data;
      return {
        timeEvents: [...data.timeEvents, newEvent],
        timeEventTags: data.timeEventTags,
        timeEventTagOrder: data.timeEventTagOrder,
      } satisfies ListTimeEventResponse;
    });
  };

  return (
    <div>
      <Show when={loading()}>
        <PageLoading />
      </Show>

      <div class="relative -mt-4 mb-6 h-10">
        <div class="flex h-10 flex-grow items-center justify-center gap-2">
          <IconButton onClick={() => setFilter("date", DateUtil.prevDayString(filter.date ?? DateUtil.todayString()))}>
            <RiArrowsArrowLeftSLine size="24" />
          </IconButton>
          <Button variant="text" class="text-[16px] font-bold leading-none">
            {filter.date ?? DateUtil.todayString()}
          </Button>
          <IconButton onClick={() => setFilter("date", DateUtil.nextDayString(filter.date ?? DateUtil.todayString()))}>
            <RiArrowsArrowRightSLine size="24" />
          </IconButton>
        </div>

        <div class="absolute right-0 top-0">
          <DatePicker value={filter.date ?? DateUtil.todayString()} setValue={x => setFilter("date", x)} />
        </div>
      </div>

      <Show when={events()}>
        {nonNullEvents => (
          <div class="mb-6">
            <MultipleSelect
              label="標籤"
              placeholder="全部"
              id="tags-filter"
              items={nonNullEvents().timeEventTags.map(x => ({ label: x.name, value: x.id.toString() }))}
              value={tagIdsForSelect()}
              onValueChange={tagIds => setTagIdsForSelect(tagIds)}
              onExitComplete={() => setFilter("tagIds", tagIdsForSelect().map(Number))}
              renderItem={x => <span>{x.label}</span>}
            />
          </div>
        )}
      </Show>

      <Show when={events()}>
        {nonNullData => (
          <Show
            when={nonNullData().timeEvents.length > 0}
            fallback={
              <div class="flex min-h-[400px] items-center justify-center">
                <EmptyState title="這天没有活動記錄" icon={<IoTime size="90" />} />
              </div>
            }
          >
            <div class="space-y-6 pb-24">
              <TransitionGroup name="group-item">
                <Key
                  each={nonNullData()
                    .timeEvents.slice()
                    .sort((a, b) => DateUtil.minsFromTimeString(a.startTime) - DateUtil.minsFromTimeString(b.startTime))}
                  by={x => x.id}
                >
                  {x => (
                    <div class="group-item">
                      <EventCard
                        id={x().id}
                        tagId={x().tagId}
                        startTime={x().startTime}
                        minute={x().minute}
                        name={x().name}
                        color={nonNullData().timeEventTags.find(y => y.id === x().tagId)!.color}
                        tagName={nonNullData().timeEventTags.find(y => y.id === x().tagId)!.name}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteClick}
                      />
                    </div>
                  )}
                </Key>
              </TransitionGroup>
            </div>
          </Show>
        )}
      </Show>

      <Show when={events()?.timeEventTags.length}>
        <Button class="fixed bottom-24 left-1/2 -translate-x-1/2" onClick={() => setShowAddEventModal(true)}>
          + 新增
        </Button>
      </Show>

      <Show when={events()?.timeEventTags}>
        {nonNullTags => (
          <>
            <Show when={showAddEventModal()}>
              <AddEventModal
                onClose={() => setShowAddEventModal(false)}
                onSuccessfulAdd={addEvent}
                tags={nonNullTags()}
                initialForm={newInitialForm()}
              />
            </Show>
            <Show when={editingEvent()}>
              {nonNullEvent => (
                <EditEventModal
                  onClose={() => setEditingTag(null)}
                  onSuccessfulEdit={updateEvent}
                  tags={nonNullTags()}
                  initialForm={{ ...nonNullEvent() }}
                />
              )}
            </Show>
          </>
        )}
      </Show>
    </div>
  );
}
