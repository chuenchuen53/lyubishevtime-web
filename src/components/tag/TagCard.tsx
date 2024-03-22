import { TimeEventTagColor } from "../../openapi";

interface Props {
  id: number;
  name: string;
  color: TimeEventTagColor;
  onNameClick: (id: number) => void;
  onReorderClick: (id: number, direction: "up" | "down") => void;
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

const EditIcon = () => (
  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg">
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
  </svg>
);

const DeleteIcon = () => (
  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg">
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
  </svg>
);

const ArrowUpIcon = () => (
  <svg
    class="h-6 w-6 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v13m0-13 4 4m-4-4-4 4" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg
    class="h-6 w-6 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19V5m0 14-4-4m4 4 4-4" />
  </svg>
);

export const TagCard = (props: Props) => {
  return (
    <div class={`flex flex-col overflow-hidden rounded-xl shadow-sm ${colorMapper(props.color)}`}>
      <div class="h-10 text-center leading-10">
        <button onClick={() => props.onNameClick(props.id)}>{props.name}</button>
      </div>
      <div class="flex h-10 items-center justify-between bg-black/35 px-4">
        <div class="space-x-3">
          <button onClick={() => props.onReorderClick(props.id, "up")}>
            <ArrowUpIcon />
          </button>
          <button onClick={() => props.onReorderClick(props.id, "down")}>
            <ArrowDownIcon />
          </button>
        </div>
        <div class="space-x-3">
          <button onClick={() => props.onEditClick(props.id)}>
            <EditIcon />
          </button>
          <button onClick={() => props.onDeleteClick(props.id)}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

function colorMapper(x: TimeEventTagColor): string {
  switch (x) {
    case TimeEventTagColor.RED:
      return "bg-red-700";
    case TimeEventTagColor.ORANGE:
      return "bg-orange-700";
    case TimeEventTagColor.YELLOW:
      return "bg-yellow-700";
    case TimeEventTagColor.GREEN:
      return "bg-green-700";
    case TimeEventTagColor.CYAN:
      return "bg-cyan-700";
    case TimeEventTagColor.BLUE:
      return "bg-blue-700";
    case TimeEventTagColor.PURPLE:
      return "bg-purple-700";
    case TimeEventTagColor.GREY:
      return "bg-gray-700";
  }
}
