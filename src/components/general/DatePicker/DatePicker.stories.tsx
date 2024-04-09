import { createSignal } from "solid-js";
import { DateUtil } from "@utils/DateUtil";
import { DatePicker as DatePickerComp } from ".";
import type { Meta, StoryObj } from "storybook-solidjs";

const [date, setDate] = createSignal(DateUtil.todayString());

const meta: Meta<typeof DatePickerComp> = {
  title: "general/DatePicker",
  component: DatePickerComp,
  render: _args => {
    return (
      <div class="flex items-center gap-6">
        <div>Selected Date: {date()}</div>
        <DatePickerComp value={date()} setValue={setDate} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof DatePickerComp>;

export const DatePicker: Story = {};
