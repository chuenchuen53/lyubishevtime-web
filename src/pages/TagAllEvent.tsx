import { IconButton } from "@components/general/Button/IconButton";
import { useNavigate, useParams } from "@solidjs/router";
import { RiArrowsArrowLeftSLine } from "solid-icons/ri";
import { createStore, produce } from "solid-js/store";
import { Show, createEffect, on, onMount } from "solid-js";
import { TagAllEventSkeleton, SkeletonCard } from "@components/tag-all-event/TagAllEventSkeleton";
import { ApiUtil } from "@utils/ApiUtil";
import { EmptyState } from "@components/common/EmptyState";
import { IoTime } from "solid-icons/io";
import { EventCard } from "@components/event/EventCard";
import { createScrollPosition } from "@solid-primitives/scroll";
import { ConfirmationModal } from "@components/general/Modal/ConfirmationModal";
import { TransitionList } from "@components/common/TransitionList";
import { EventService, TagService } from "../api-service";
import type { TimeEvent, TimeEventTagColor } from "@openapi";

type Params = {
  tagId: string;
};

interface Tag {
  tagName: string;
  tagColor: TimeEventTagColor;
}

interface EventData {
  tag: Tag | null;
  events: TimeEvent[];
  haveNext: boolean;
  loading: boolean;
}

const PAGE_SIZE = 20;
const OFFSET_LIMIT = 10;

export default function TagAllEvent() {
  const navigate = useNavigate();
  const params = useParams<Params>();
  const tagId = parseInt(params.tagId);
  const [data, setData] = createStore<EventData>({
    tag: null,
    events: [],
    haveNext: false,
    loading: true,
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
    const numOfEventsBeforeDel = data.events.length;
    await EventService.deleteTimeEvent(id);
    const respData = await fetchEvent(1, numOfEventsBeforeDel);
    setData(
      produce(draft => {
        draft.events = respData.timeEvents;
        draft.haveNext = respData.haveNext;
      }),
    );
  };

  onMount(async () => {
    const eventPromise = fetchEvent(1);
    const tagsPromise = TagService.listTimeEventTag();
    const [eventData, tags] = await Promise.all([eventPromise, tagsPromise]);
    const { name: tagName, color: tagColor } = tags.timeEventTags.find(x => x.id === tagId)!;

    setData(
      produce(draft => {
        draft.tag = { tagName, tagColor };
        draft.events.push(...eventData.timeEvents);
        draft.haveNext = eventData.haveNext;
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
      <div class="fixed left-0 right-0 top-16 z-[999] h-11 bg-neutral-bg-layout md:top-[72px]">
        <div class="relative mx-auto flex size-full max-w-screen-lg items-center justify-center">
          <IconButton onClick={() => navigate("/tag")} class="absolute left-2 top-1/2 -translate-y-1/2">
            <RiArrowsArrowLeftSLine size="30" />
          </IconButton>
          <div class="text-lg font-semibold">
            <Show when={data.tag?.tagName} fallback="加載中">
              {data.tag?.tagName}
            </Show>
          </div>
        </div>
      </div>
      <Show when={data.tag} fallback={<TagAllEventSkeleton />}>
        <div>
          <Show
            when={data.events.length > 0}
            fallback={
              <div class="flex min-h-[280px] items-center justify-center">
                <EmptyState title="没有活動" icon={<IoTime size="90" />} />
              </div>
            }
          >
            <div class="space-y-6">
              <TransitionList data={data.events} key="id" animation="fade-in-slide-out">
                {x => (
                  <EventCard
                    id={x().id}
                    tagId={x().tagId}
                    date={x().date}
                    startTime={x().startTime}
                    minute={x().minute}
                    name={x().name}
                    color={data.tag!.tagColor}
                    tagName={data.tag!.tagName}
                    onDeleteClick={handleDeleteClick}
                  />
                )}
              </TransitionList>
              <Show when={data.loading}>
                <SkeletonCard />
              </Show>
              <Show when={!data.haveNext}>
                <div class="text-center text-neutral-text-secondary">己加載所有活動</div>
              </Show>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
}
