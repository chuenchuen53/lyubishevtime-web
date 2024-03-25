import { Index, Show, createMemo } from "solid-js";
import { Dropdown } from "./Dropdown";
import type { DropdownOptions } from "flowbite";

interface Props {
  id: string;
  value: string;
  setValue: (x: string) => void;
  hideSeconds?: boolean;
}

const dropDownOptions: DropdownOptions = {
  placement: "bottom-start",
};

const hrs = [...Array(24).keys()].map(x => x.toString().padStart(2, "0"));
const mins = [...Array(60).keys()].map(x => x.toString().padStart(2, "0"));
const secs = [...Array(60).keys()].map(x => x.toString().padStart(2, "0"));

export const TimePicker = (props: Props) => {
  const selectedHr = createMemo(() => props.value.slice(0, 2));
  const selectedMin = createMemo(() => props.value.slice(3, 5));
  const selectedSec = createMemo(() => props.value.slice(6, 8));

  const setHr = (x: string) => {
    const [_, min, sec] = props.value.split(":");
    props.setValue(`${x}:${min}:${sec}`);
  };

  const setMin = (x: string) => {
    const [hr, _, sec] = props.value.split(":");
    props.setValue(`${hr}:${x}:${sec}`);
  };

  const setSec = (x: string) => {
    const [hr, min] = props.value.split(":");
    props.setValue(`${hr}:${min}:${x}`);
  };

  const cols = [
    {
      values: hrs,
      handleClick: setHr,
      selected: selectedHr,
      show: () => true,
    },
    {
      values: mins,
      handleClick: setMin,
      selected: selectedMin,
      show: () => true,
    },
    {
      values: secs,
      handleClick: setSec,
      selected: selectedSec,
      show: () => !props.hideSeconds,
    },
  ];

  return (
    <Dropdown
      id={props.id}
      options={dropDownOptions}
      dropdownElement={
        <div class="bg-bg-emphasized flex h-[175px] w-full space-x-4 overflow-hidden rounded-md p-2">
          <div class={`grid ${props.hideSeconds ? "grid-cols-2" : "grid-cols-3"}`}>
            <Index each={cols}>
              {x => (
                <Show when={x().show()}>
                  <div class="flex flex-col overflow-y-scroll px-2">
                    <Index each={x().values}>
                      {y => (
                        <button
                          class="rounded-md px-4 py-2 text-neutral-text hover:bg-neutral-fill-secondary"
                          classList={{ "!bg-primary !text-primary-content": y() === x().selected() }}
                          onClick={() => x().handleClick(y())}
                        >
                          {y()}
                        </button>
                      )}
                    </Index>
                  </div>
                </Show>
              )}
            </Index>
          </div>
        </div>
      }
    >
      <div class="w-full rounded-lg border border-neutral-border bg-neutral-bg-container p-2.5 text-sm text-neutral-text">
        {props.hideSeconds ? props.value.slice(0, 5) : props.value}
      </div>
    </Dropdown>
  );
};
