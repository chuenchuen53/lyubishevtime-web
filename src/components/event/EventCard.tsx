import { FaSolidPen, FaSolidTrash } from "solid-icons/fa";
import IconButton from "@components/general/Button/IconButton";
import { DateUtil } from "@utils/DateUtil";
import { TagColorUtil } from "@utils/TagColorUtil";
import { Show } from "solid-js";
import type { TimeEventTagColor } from "../../openapi";

interface Props {
  id: number;
  tagId: number;
  tagName: string;
  color: TimeEventTagColor;
  startTime: string;
  minute: number;
  name: string;
  onDeleteClick: (id: number) => void;
  date?: string;
  onEditClick?: (id: number) => void;
}

export const EventCard = (props: Props) => {
  return (
    <div class={`flex flex-col overflow-hidden rounded-xl shadow-sm ${TagColorUtil.shadow(props.color)}`}>
      <div class={`h-10 px-4 text-center leading-10 text-white ${TagColorUtil.main(props.color)}`}>{props.tagName}</div>
      <div class={`h-20 bg-gradient-to-b ${TagColorUtil.bgGradient(props.color)}`}>
        <div class="px-4 py-2 text-neutral-text dark:text-neutral-900">{props.name}</div>
        <div class="relative flex h-10 items-center justify-center px-4 text-sm text-neutral-600/80">
          <div class="absolute left-4 text-nowrap">
            {(props.date ? DateUtil.shortDateString(props.date) + " " : "") + DateUtil.removeSec(props.startTime)}
          </div>
          <div>{props.minute}分鐘</div>
          <div class="absolute right-4 space-x-2">
            <Show when={props.onEditClick}>
              <IconButton class="size-8 text-neutral-600/80 dark:hover:bg-neutral-600/30" onClick={() => props.onEditClick?.(props.id)}>
                <FaSolidPen />
              </IconButton>
            </Show>
            <IconButton class="size-8 text-neutral-600/80 dark:hover:bg-neutral-600/30" onClick={() => props.onDeleteClick(props.id)}>
              <FaSolidTrash />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};
