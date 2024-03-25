import { Show } from "solid-js";
import { Portal } from "solid-js/web";
import { IoCloseOutline } from "solid-icons/io";
import IconButton from "./Button/IconButton";
import type { JSX } from "solid-js";

interface Props {
  open: boolean;
  title: JSX.Element;
  children: JSX.Element;
  footer?: JSX.Element;
  modalId?: string;
  onClose?: () => void;
}

export const Modal = (props: Props) => {
  return (
    <Show when={props.open}>
      <Portal>
        <div
          id={props.modalId}
          tabindex="-1"
          aria-hidden="true"
          class="fixed left-0 right-0 top-0 z-[1000] flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
        >
          <div class="fixed inset-0 bg-neutral-bg-mask" />

          <div class="shadow-elevated relative max-h-full max-w-[calc(100vw-48px)] rounded-lg bg-neutral-bg-elevated">
            <div class="flex items-center justify-between rounded-t border-b border-solid border-neutral-border p-4 md:p-5">
              <div class="text-xl font-semibold">{props.title}</div>
              <Show when={props.onClose}>
                <IconButton onClick={props.onClose}>
                  <IoCloseOutline size="28" />
                </IconButton>
              </Show>
            </div>
            <div class="p-4 md:p-5">{props.children}</div>
            <Show when={props.footer}>
              <div class="flex items-center rounded-b border-t border-neutral-border p-4 md:p-5">{props.footer}</div>
            </Show>
          </div>
        </div>
      </Portal>
    </Show>
  );
};
