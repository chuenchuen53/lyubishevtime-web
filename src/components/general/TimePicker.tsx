import { DropdownOptions } from "flowbite";
import { Dropdown } from "./Dropdown";

interface Props {
  value: string;
  setValue: (x: string) => void;
}

const dropDownOptions: DropdownOptions = {
  placement: "bottom-start",
};

const hrs = [...Array(24).keys()].map(x => x.toString().padStart(2, "0"));
const mins = [...Array(60).keys()].map(x => x.toString().padStart(2, "0"));

export const TimePicker = (props: Props) => {
  const setHr = (x: string) => {
    const [_, min] = props.value.split(":");
    props.setValue(`${x}:${min}:00`);
  };

  const setMin = (x: string) => {
    const [hr, _] = props.value.split(":");
    props.setValue(`${hr}:${x}:00`);
  };

  return (
    <Dropdown
      id="time-picker"
      options={dropDownOptions}
      dropDownElement={
        <div class="flex h-[175px] w-full space-x-4 overflow-hidden rounded-md bg-bg-emphasized p-2">
          <div class="flex flex-col overflow-y-scroll px-2">
            {hrs.map(x => (
              <div class="p-2" onClick={() => setHr(x)}>
                {x}
              </div>
            ))}
          </div>
          <div class="flex flex-col overflow-y-scroll px-2">
            {mins.map(x => (
              <div class="p-2" onClick={() => setMin(x)}>
                {x}
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
        {props.value.slice(0, 5)}
      </div>
    </Dropdown>
  );
};
