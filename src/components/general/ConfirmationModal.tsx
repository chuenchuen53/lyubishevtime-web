import { Show, createSignal, onCleanup, onMount } from "solid-js";
import { Modal } from "./Modal";
import { Button } from "./Button";
import type { Accessor, Setter } from "solid-js";

interface CreateOption {
  title: string;
  message: string;
  confirmButtonVariant: "primary" | "danger";
}

interface ModalOption extends CreateOption {
  confirm: () => void;
  cancel: () => void;
}

export class ConfirmationModal {
  private static option: Accessor<ModalOption | null> | null = null;
  private static setOption: Setter<ModalOption | null> | null = null;

  public static Root = () => {
    const [option, setOption] = createSignal<ModalOption | null>(null);

    onMount(() => {
      ConfirmationModal.option = option;
      ConfirmationModal.setOption = setOption;
    });

    onCleanup(() => {
      ConfirmationModal.option = null;
      ConfirmationModal.setOption = null;
    });

    return (
      <Show when={option()}>
        {nonNullOption => (
          <Modal
            open
            onClose={nonNullOption().cancel}
            title={nonNullOption().title}
            footer={
              <div class="flex w-full justify-end gap-6">
                <Button onClick={nonNullOption().confirm} variant={nonNullOption().confirmButtonVariant}>
                  確定
                </Button>
                <Button onClick={nonNullOption().cancel} variant="gray">
                  取消
                </Button>
              </div>
            }
          >
            <div class="flex h-32 w-72 flex-col items-center justify-center">{nonNullOption().message}</div>
          </Modal>
        )}
      </Show>
    );
  };

  public static create(option: CreateOption): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (!ConfirmationModal.setOption) throw reject("ConfirmationModal.Root is not mounted");

      const setOption = ConfirmationModal.setOption;
      setOption({
        ...option,
        confirm: () => {
          setOption(null);
          resolve(true);
        },
        cancel: () => {
          setOption(null);
          resolve(false);
        },
      });
    });
  }
}
