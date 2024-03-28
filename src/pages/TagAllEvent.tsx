import IconButton from "@components/general/Button/IconButton";
import { useNavigate, useParams } from "@solidjs/router";
import { RiArrowsArrowLeftSLine } from "solid-icons/ri";
import { createStore, produce } from "solid-js/store";
import { Show, createEffect, on, onMount } from "solid-js";
import { TagAllEventSkeleton, Card } from "@components/tag/TagAllEventSkeleton";
import { ApiUtil } from "@utils/ApiUtil";
import { EmptyState } from "@components/common/EmptyState";
import { IoTime } from "solid-icons/io";
import { TransitionGroup } from "solid-transition-group";
import { Key } from "@solid-primitives/keyed";
import { EventCard } from "@components/event/EventCard";
import { createScrollPosition } from "@solid-primitives/scroll";
import { ConfirmationModal } from "@components/general/ConfirmationModal";
import { EventService } from "../api-service";
import type { TimeEvent, TimeEventTag } from "@openapi";

interface Data {
  tagName: string | null;
  events: TimeEvent[];
  haveNext: boolean;
  loading: boolean;
  tags: TimeEventTag[];
}

const PAGE_SIZE = 4;
const OFFSET_LIMIT = 10;

export default function TagAllEvent() {
  const params = useParams();
  const tagId = parseInt(params.tagId);
  const navigate = useNavigate();
  const [data, setData] = createStore<Data>({
    tagName: null,
    events: [],
    haveNext: false,
    loading: true,
    tags: [],
  });

  const rootElement = document.querySelector<HTMLDivElement>("#root")!;
  const scroll = createScrollPosition(rootElement);

  const fetchEvent = async (page: number, pageSize = PAGE_SIZE) => {
    try {
      return await ApiUtil.loadingAndErrHandling(
        () => EventService.getAllTagEvents(tagId, page, pageSize),
        x => setData("loading", x),
        "加載失敗",
      );
    } finally {
      setData("loading", false);
    }
  };

  const fetchMore = async () => {
    const page = Math.ceil(data.events.length / PAGE_SIZE) + 1;
    const respData = await fetchEvent(page);

    setData(
      produce(draft => {
        draft.events.push(...respData.timeEvents);
        draft.haveNext = respData.haveNext;
      }),
    );
  };

  const handleDeleteClick = async (id: number) => {
    const confirm = await ConfirmationModal.create({
      title: "刪除活動",
      message: "確定要刪除這個活動嗎？",
      confirmButtonVariant: "danger",
    });
    if (!confirm) return;
    const numbOfEvents = data.events.length;
    await EventService.deleteTimeEvent(id);
    const respData = await fetchEvent(1, numbOfEvents);
    setData(
      produce(draft => {
        draft.events = respData.timeEvents;
        draft.haveNext = respData.haveNext;
      }),
    );
  };

  onMount(async () => {
    const respData = await fetchEvent(1);
    const tagName = respData.timeEventTags.find(x => x.id === tagId)!.name;

    setData(
      produce(draft => {
        draft.tags = respData.timeEventTags;
        draft.tagName = tagName;
        draft.events.push(...respData.timeEvents);
        draft.haveNext = respData.haveNext;
      }),
    );
  });

  createEffect(
    on(
      () => scroll.y,
      () => {
        if (data.haveNext && !data.loading && scroll.y !== 0 && rootElement.scrollHeight - rootElement.clientHeight - scroll.y < OFFSET_LIMIT) {
          fetchMore();
        }
      },
    ),
  );

  return (
    <div class="mt-3 pt-6 md:mt-5">
      <div class="fixed left-0 right-0 top-16 z-[1000] h-11 bg-neutral-bg-layout md:top-[72px]">
        <div class="relative mx-auto flex size-full max-w-screen-lg items-center justify-center">
          <IconButton onClick={() => navigate("/tag")} class="absolute left-2 top-1/2 -translate-y-1/2">
            <RiArrowsArrowLeftSLine size="30" />
          </IconButton>
          <div class="text-lg font-semibold">
            <Show when={data.tagName !== null} fallback="加載中">
              {data.tagName}
            </Show>
          </div>
        </div>
      </div>
      <Show when={data.tagName !== null} fallback={<TagAllEventSkeleton />}>
        <div class="relative">
          <Show
            when={data.events.length > 0}
            fallback={
              <div class="flex min-h-[280px] items-center justify-center">
                <EmptyState title="没有活動" icon={<IoTime size="90" />} />
              </div>
            }
          >
            <div class="space-y-6">
              <TransitionGroup name="group-item-2">
                <Key each={data.events} by={x => x.id}>
                  {x => (
                    <div class="group-item-2">
                      <EventCard
                        id={x().id}
                        tagId={x().tagId}
                        date={x().date}
                        startTime={x().startTime}
                        minute={x().minute}
                        name={x().name}
                        color={data.tags.find(y => y.id === x().tagId)!.color}
                        tagName={data.tagName!}
                        onDeleteClick={handleDeleteClick}
                      />
                    </div>
                  )}
                </Key>
              </TransitionGroup>
              <Show when={data.loading}>
                <Card />
              </Show>
              <Show when={!data.haveNext}>
                <div class="text-center">己加載所有活動</div>
              </Show>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
}
