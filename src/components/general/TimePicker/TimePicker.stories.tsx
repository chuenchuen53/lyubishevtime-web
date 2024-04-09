import { createSignal } from "solid-js";
import { TimePicker as TimePickerComp } from ".";
import type { Meta, StoryObj } from "storybook-solidjs";

const [time, setTime] = createSignal("00:00:00");

const meta: Meta<typeof TimePickerComp> = {
  title: "general/TimePicker",
  component: TimePickerComp,
  render: _args => {
    return (
      <div class="grid w-fit grid-cols-2 grid-rows-2 items-center gap-6">
        <div>Time: {time()}</div>
        <TimePickerComp id="time-picker-demo" value={time()} setValue={setTime} />
        <div>Time: {time().slice(0, 5)}</div>
        <TimePickerComp id="time-picker-no-sec-demo" value={time()} setValue={setTime} hideSeconds />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof TimePickerComp>;

export const TimePicker: Story = {};
