import { Button } from "@components/general/Button";
import { Show, createSignal } from "solid-js";
import { EditNicknameModal } from "@components/setting/EditNicknameModal";
import { ModifyPasswordModal } from "@components/setting/ModifyPasswordModal";
import { updateProfilePic, user } from "../stores/UserStore";
import { UserService } from "../api-service";
import type { JSX } from "solid-js";

const EditIcon = () => (
  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg">
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

export default function Setting() {
  const [editNickname, setEditNickname] = createSignal(false);
  const [modifyPassword, setModifyPassword] = createSignal(false);

  const handleInputProfilePic: JSX.InputEventHandlerUnion<HTMLInputElement, InputEvent> = event => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const maxSize = 128;
          let width = image.width;
          let height = image.height;

          // Calculate the new dimensions maintaining the aspect ratio
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d")!;

          // Draw the resized image to the canvas
          ctx.drawImage(image, 0, 0, width, height);

          // Convert the canvas to base64 string
          const base64String = canvas.toDataURL("image/webp");

          try {
            UserService.updateProfilePic(base64String);
            updateProfilePic(base64String);
          } catch (e) {
            // todo
            console.log(e);
          }
        };
        // Set the source of the image to the FileReader result to trigger the load event
        image.src = (e.currentTarget! as any).result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div class="p-6">
      <div class="flex flex-col items-center">
        <div class="relative flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
          <Show when={user()?.profilePic} fallback={<UserIcon />}>
            {nonNullProfilePic => <img class="size-32 rounded-full" src={nonNullProfilePic()} alt="user photo" />}
          </Show>
          <label
            for="profile-pic-input"
            class="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-white/80 text-gray-600"
          >
            <EditIcon />
          </label>
          <input class="hidden" id="profile-pic-input" type="file" accept=".png,.jpg,.webp" onInput={handleInputProfilePic} />
        </div>
        <div class="mt-8 text-lg font-semibold">{user()?.username}</div>
        <div>{user()?.nickname}</div>
      </div>
      <div class="mt-8 flex flex-col gap-6">
        <Button onClick={() => setEditNickname(true)}>修改暱稱</Button>
        <Button onClick={() => setModifyPassword(true)}>修改密碼</Button>
      </div>

      <EditNicknameModal open={editNickname()} onClose={() => setEditNickname(false)} />
      <ModifyPasswordModal open={modifyPassword()} onClose={() => setModifyPassword(false)} />
    </div>
  );
}

function UserIcon() {
  return (
    <svg
      class="size-32 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fill-rule="evenodd"
        d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
        clip-rule="evenodd"
      />
    </svg>
  );
}
