import { Button } from "@components/general/Button";
import { Modal } from "@components/general/Modal";
import * as Select from "@components/general/Select";
import { createStore } from "solid-js/store";
import { Input } from "@components/general/Input";
import { TimePicker } from "@components/general/TimePicker";
import type { TimeEventTag } from "../../openapi";

export interface EventForm {
  date: string;
  tagId: number;
  name: string;
  startTime: string;
  minute: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  submitText: string;
  handleSubmit: (x: EventForm) => Promise<void>;
  disableSubmit: (eventForm: EventForm) => boolean;
  loading: boolean;
  tags: TimeEventTag[];
  initialForm: EventForm;
}

export const EventFormModal = (props: Props) => {
  const [form, setForm] = createStore<EventForm>({ ...props.initialForm });

  const handleSubmit = async () => {
    await props.handleSubmit(form);
  };

  return (
    <Modal
      open={props.open}
      title="活動"
      onClose={props.onClose}
      footer={
        <div class="w-full space-x-4 text-end">
          <Button disabled={props.disableSubmit(form)} loading={props.loading} onClick={handleSubmit}>
            {props.submitText}
          </Button>
          <Button variant="gray" onClick={props.onClose}>
            取消
          </Button>
        </div>
      }
    >
      <div class="w-[320px] max-w-full space-y-6">
        <Select.SingleSelect
          items={props.tags.map(x => ({ label: x.name, value: x.id.toString() }))}
          value={form.tagId.toString()}
          onValueChange={x => setForm("tagId", parseInt(x))}
          label="標籤 *"
          id="tag-select"
          renderItem={item => item.label}
        />

        <div>
          <label for="event-name-input" class="mb-2 block text-sm font-medium">
            活動名稱 / 簡介
          </label>
          <Input id="event-name-input" class="w-full" type="text" value={form.name} required onInput={e => setForm("name", e.currentTarget.value)} />
        </div>

        <div>
          <label for="event-start-time-input" class="mb-2 block text-sm font-medium">
            開始時間 *
          </label>
          <TimePicker id="event-form-time-picker" value={form.startTime} setValue={x => setForm("startTime", x)} hideSeconds />
        </div>

        <div>
          <label for="event-start-time-input" class="mb-2 block text-sm font-medium">
            分鐘 *
          </label>
          <Input
            id="event-minute-input"
            class="w-full"
            type="number"
            value={form.minute}
            required
            onBlur={e => {
              const value = parseInt(e.currentTarget.value);
              if (!isNaN(value) && value > 0 && value < 1440) {
                setForm("minute", value);
                e.currentTarget.value = value.toString();
              } else {
                e.currentTarget.value = form.minute.toString();
              }
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
