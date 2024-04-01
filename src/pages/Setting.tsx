import { Button } from "@components/general/Button";
import { createSignal } from "solid-js";
import { EditNicknameModal } from "@components/setting/EditNicknameModal";
import { ModifyPasswordModal } from "@components/setting/ModifyPasswordModal";
import { FaSolidPen } from "solid-icons/fa";
import { UserAvatar } from "@components/common/UserAvatar";
import { Message } from "@components/general/Message";
import { updateProfilePic, user } from "../stores/UserStore";
import { UserService } from "../api-service";
import type { JSX } from "solid-js";

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
          const base64String = canvas.toDataURL("image/webp", 0.8);

          try {
            UserService.updateProfilePic({ profilePic: base64String });
            updateProfilePic(base64String);
          } catch (e) {
            Message.createError("更新頭像失敗");
          }
        };
        // Set the source of the image to the FileReader result to trigger the load event
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        image.src = (e.currentTarget! as any).result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div class="p-6">
      <div class="flex flex-col items-center">
        <div class="relative flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
          <UserAvatar size={128} />
          <label
            for="profile-pic-input"
            class="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-white text-gray-600 shadow"
          >
            <FaSolidPen size="16" />
          </label>
          <input class="hidden" id="profile-pic-input" type="file" accept=".png,.jpg,.webp" onInput={handleInputProfilePic} />
        </div>
        <div class="mt-8 text-lg font-semibold">{user()?.username}</div>
        <div class="text-neutral-text-secondary">{user()?.nickname}</div>
      </div>
      <div class="mx-auto mt-8 flex max-w-xs flex-col gap-6">
        <Button onClick={() => setEditNickname(true)}>修改暱稱</Button>
        <Button onClick={() => setModifyPassword(true)}>修改密碼</Button>
      </div>

      <EditNicknameModal open={editNickname()} onClose={() => setEditNickname(false)} />
      <ModifyPasswordModal open={modifyPassword()} onClose={() => setModifyPassword(false)} />
    </div>
  );
}
