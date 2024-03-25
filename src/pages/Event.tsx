import { useSearchParams } from "@solidjs/router";
import { For, Show, createEffect, createResource, createSignal } from "solid-js";
import { z } from "zod";
import { EmptyState } from "@components/tag/EmptyState";
import { EventCard } from "@components/event/EventCard";
import { Button } from "@components/general/Button";
import { AddEventModal } from "@components/event/AddEventModal";
import { EditEventModal } from "@components/event/EditEventModal";
import { MultipleSelect } from "@components/general/Select";
import { SimpleDatePicker } from "@components/general/DatePicker";
import { EventService } from "../api-service";
import type { ListTimeEventResponse, TimeEvent, UpdateTimeEventRequest } from "../openapi";
import type { EventForm } from "@components/event/EventFormModal";

const isValidDate = (dateString: string) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && date.toISOString().startsWith(dateString);
};

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

const dateStringSchema = z.string().refine(isValidDate).optional();

const ParamsSchema = z.object({
  date: dateStringSchema,
  tagIds: tagIdsSchema,
});

type Params = {
  date?: string;
  tagIds?: string;
};

interface Filter {
  date?: string;
  tagIds?: number[];
}

const emptyFilter: Filter = {
  date: undefined,
  tagIds: undefined,
};

function parseParams(searchParams: Params): Filter {
  const result = ParamsSchema.safeParse(searchParams);
  if (result.success) {
    return {
      date: result.data.date,
      tagIds: result.data.tagIds ? result.data.tagIds.split(",").map(Number) : undefined,
    };
  }
  return emptyFilter;
}

async function fetchEvents(filter: Filter): Promise<ListTimeEventResponse> {
  console.log("fetching events", filter);
  const today = new Date().toISOString().split("T")[0];

  return await EventService.getEvents(filter.date ?? today, filter.tagIds);
}

export default function Event() {
  const [searchParams, setSearchParams] = useSearchParams<Params>();
  const [filter, setFilter] = createSignal<Filter>(parseParams(searchParams));
  const [events, eventsActions] = createResource(filter, fetchEvents);
  const [showAddEventModal, setShowAddEventModal] = createSignal(false);
  const [editingEvent, setEditingTag] = createSignal<TimeEvent | null>(null);

  createEffect(() => {
    const f = filter();
    setSearchParams({
      date: f.date,
      tagIds: f.tagIds ? btoa(f.tagIds.join(",")) : undefined,
    });
  });

  const handleEditClick = (id: number) => {
    const selected = events()?.timeEvents.find(x => x.id === id);
    if (selected) setEditingTag(selected);
  };

  const handleSubmitEditEvent = async (editedEvent: EventForm) => {
    const initEvent = editingEvent();
    if (!initEvent) return;

    await EventService.updateTimeEvent({
      id: initEvent.id,
      tagId: editedEvent.tagId,
      name: editedEvent.name,
      startTime: editedEvent.startTime,
      minute: editedEvent.minute,
    } satisfies UpdateTimeEventRequest);

    setEditingTag(null);
    eventsActions.mutate(data => {
      if (!data) return data;
      return {
        timeEvents: data.timeEvents.map(x => (x.id === initEvent.id ? { ...x, ...editedEvent } : x)),
        timeEventTags: [...data.timeEventTags],
        timeEventTagOrder: [...data.timeEventTagOrder],
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

  const handleAddTag = async (x: EventForm) => {
    const newEvent = (await EventService.addTimeEvent({ ...x, date: filter().date ?? todayString() })).timeEvent;

    eventsActions.mutate(data => {
      if (!data) return data;
      return {
        timeEvents: [...data.timeEvents, newEvent],
        timeEventTags: [...data.timeEventTags],
        timeEventTagOrder: [...data.timeEventTagOrder],
      } satisfies ListTimeEventResponse;
    });

    setShowAddEventModal(false);
  };

  return (
    <div class="p-6">
      <Show when={events.loading}>
        <div>Loading...</div>
      </Show>

      <div class="relative mb-6 h-10">
        <div class="flex h-10 flex-grow items-center justify-center gap-6">
          <button onClick={() => setFilter({ ...filter, date: prevDayString(filter().date ?? todayString()) })}>
            <LeftArrow />
          </button>
          <div class="font-bold">{filter().date ?? todayString()}</div>
          <button onClick={() => setFilter({ ...filter, date: nextDayString(filter().date ?? todayString()) })}>
            <RightArrow />
          </button>
        </div>

        <div class="absolute right-0 top-0">
          <SimpleDatePicker value={filter().date ?? todayString()} setValue={x => setFilter({ ...filter(), date: x })} />
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
              value={filter().tagIds?.map(String) ?? []}
              onValueChange={tagIds => setFilter({ ...filter(), tagIds: tagIds.map(Number) })}
              renderItem={x => <span>{x.label}</span>}
            />
          </div>
        )}
      </Show>

      <Show when={events()}>
        {nonNullData => (
          <Show when={nonNullData().timeEvents.length > 0} fallback={<EmptyState />}>
            <div class="space-y-6 pb-24">
              <For
                each={nonNullData()
                  .timeEvents.slice()
                  .sort((a, b) => minsFromTimeString(a.startTime) - minsFromTimeString(b.startTime))}
              >
                {x => (
                  <EventCard
                    id={x.id}
                    tagId={x.tagId}
                    startTime={x.startTime}
                    minute={x.minute}
                    name={x.name}
                    color={nonNullData().timeEventTags.find(y => y.id === x.tagId)?.color ?? "PURPLE"}
                    tagName={nonNullData().timeEventTags.find(y => y.id === x.tagId)?.name ?? ""}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                  />
                )}
              </For>
            </div>
          </Show>
        )}
      </Show>

      <Button class="fixed bottom-24 left-1/2 -translate-x-1/2" onClick={() => setShowAddEventModal(true)}>
        + 新增
      </Button>

      <Show when={events()?.timeEventTags}>
        {nonNullTags => (
          <>
            <AddEventModal open={showAddEventModal()} onClose={() => setShowAddEventModal(false)} handleSubmit={handleAddTag} tags={nonNullTags()} />
            <Show when={editingEvent()}>
              {nonNullEvent => (
                <EditEventModal
                  open
                  onClose={() => setEditingTag(null)}
                  handleSubmit={handleSubmitEditEvent}
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

function minsFromTimeString(timeString: string) {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

function todayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function nextDayString(dateString: string) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function prevDayString(dateString: string) {
  const date = new Date(dateString);
  date.setDate(date.getDate() - 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function LeftArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function RightArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
