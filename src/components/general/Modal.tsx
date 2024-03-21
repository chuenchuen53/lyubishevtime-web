import { JSX, Show } from "solid-js";
import { Portal } from "solid-js/web";

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
          <div class="fixed inset-0 bg-gray-900/50"></div>

          <div class="relative max-h-full max-w-[calc(100vw-48px)] rounded-lg bg-white shadow dark:bg-gray-700">
            <div class="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{props.title}</h3>
              <Show when={props.onClose}>
                <button
                  type="button"
                  class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={props.onClose}
                >
                  <svg class="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </Show>
            </div>
            <div class="space-y-4 p-4 md:p-5">{props.children}</div>
            <Show when={props.footer}>
              <div class="flex items-center rounded-b border-t border-gray-200 p-4 dark:border-gray-600 md:p-5">{props.footer}</div>
            </Show>
          </div>
        </div>
      </Portal>
    </Show>
  );
};
