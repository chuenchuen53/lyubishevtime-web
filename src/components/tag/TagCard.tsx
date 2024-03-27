import { FaSolidPen, FaSolidTrash, FaSolidArrowDownLong, FaSolidArrowUpLong } from "solid-icons/fa";
import IconButton from "@components/general/Button/IconButton";
import { TagColorUtil } from "@utils/TagColorUtil";
import { Button } from "@components/general/Button";
import { createEffect } from "solid-js";
import type { TimeEventTagColor } from "../../openapi";

interface Props {
  id: number;
  name: string;
  color: TimeEventTagColor;
  onNameClick: (id: number) => void;
  onReorderClick: (id: number, direction: "up" | "down") => void;
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

export const TagCard = (props: Props) => {
  createEffect(() => {
    console.log("create card " + props.name);
  });

  return (
    <div class={`flex flex-col overflow-hidden rounded-xl shadow-sm ${TagColorUtil.main(props.color)}`}>
      <div class="h-10 px-4 text-center leading-10">
        <Button variant="text" class="text-[16px] font-medium leading-none text-white" onClick={() => props.onNameClick(props.id)}>
          {props.name}
        </Button>
      </div>
      <div class={`flex h-10 items-center justify-between bg-neutral-200/30 px-4 ${TagColorUtil.secondary(props.color)}`}>
        <div class="space-x-2">
          <IconButton class="size-8 text-white" onClick={() => props.onReorderClick(props.id, "up")}>
            <FaSolidArrowUpLong />
          </IconButton>
          <IconButton class="size-8 text-white" onClick={() => props.onReorderClick(props.id, "down")}>
            <FaSolidArrowDownLong />
          </IconButton>
        </div>
        <div class="space-x-2">
          <IconButton class="size-8 text-white" onClick={() => props.onEditClick(props.id)}>
            <FaSolidPen />
          </IconButton>
          <IconButton class="size-8 text-white" onClick={() => props.onDeleteClick(props.id)}>
            <FaSolidTrash />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
