import { For, Match, Switch, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { AiFillCloseCircle, AiFillCheckCircle, AiFillInfoCircle } from "solid-icons/ai";
import { nanoid } from "nanoid";
import { TransitionGroup } from "solid-transition-group";
import type { SetStoreFunction } from "solid-js/store";
import "./index.scss";

interface MessageItem {
  id: string;
  message: string;
  type?: "success" | "error";
}

interface MessageItemProps extends MessageItem {
  index: number;
}

export class Message {
  private static readonly DURATION = 2000;
  private static setStore: SetStoreFunction<MessageItem[]> | null = null;

  public static create(message: string, type?: "success" | "error") {
    if (Message.setStore) {
      const newItem = { id: this.generateId(), message, type };

      Message.setStore(prev => [...prev, newItem]);

      setTimeout(() => {
        if (Message.setStore) Message.setStore(prev => prev.filter(x => x !== newItem));
      }, Message.DURATION);
    }
  }

  public static createSuccess(message: string) {
    Message.create(message, "success");
  }

  public static createError(message: string) {
    Message.create(message, "error");
  }

  public static Root = () => {
    const [store, setStore] = createStore<MessageItem[]>([]);
    Message.setStore = setStore;

    onCleanup(() => {
      setStore([]);
      Message.setStore = null;
    });

    return (
      <div class="fixed left-1/2 top-24 z-10 flex -translate-x-1/2 flex-col items-center">
        <TransitionGroup name="message-item-animation">
          <For each={store}>{(x, index) => <Message.Item {...x} index={index()} />}</For>
        </TransitionGroup>
      </div>
    );
  };

  private static generateId() {
    return nanoid();
  }

  private static Item = (props: MessageItemProps) => {
    return (
      <div
        style={{ top: props.index * 50 + "px" }}
        class="absolute flex h-9 items-center gap-2 text-nowrap rounded-md bg-neutral-bg-elevated px-3 py-2 text-sm shadow-elevated transition-all duration-300"
      >
        <span>
          <Switch>
            <Match when={props.type === undefined}>
              <AiFillInfoCircle size="16" class="text-primary" />
            </Match>
            <Match when={props.type === "success"}>
              <AiFillCheckCircle size="16" class="text-[#7bb972] dark:text-[#7bb972]" />
            </Match>
            <Match when={props.type === "error"}>
              <AiFillCloseCircle size="16" class="text-danger" />
            </Match>
          </Switch>
        </span>
        <span>{props.message}</span>
      </div>
    );
  };
}
