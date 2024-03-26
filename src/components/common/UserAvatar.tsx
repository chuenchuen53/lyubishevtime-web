import { user } from "@stores/UserStore";
import { FaSolidUserLarge } from "solid-icons/fa";
import { Show } from "solid-js";

interface Props {
  size: number;
}

export const UserAvatar = (props: Props) => {
  return (
    <div
      style={{ width: props.size + "px", height: props.size + "px" }}
      class="flex items-center justify-center overflow-hidden rounded-full bg-gray-200 text-gray-500 dark:bg-gray-500 dark:text-gray-100"
    >
      <Show
        when={user()?.profilePic}
        fallback={<FaSolidUserLarge style={{ bottom: Math.floor(-props.size / 8) + "px" }} class="relative" size={Math.floor(props.size * 0.75)} />}
      >
        {nonNullProfilePic => (
          <img style={{ width: props.size + "px", height: props.size + "px" }} class="rounded-full" src={nonNullProfilePic()} alt="user photo" />
        )}
      </Show>
    </div>
  );
};
