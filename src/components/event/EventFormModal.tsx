import { Button } from "@components/general/Button";
import { Modal } from "@components/general/Modal";
import { ListTimeEventTagResponse, TimeEventTag, TimeEventTagColor } from "../../openapi";
import * as Select from "@components/general/Select";
import { createStore } from "solid-js/store";
import { Input } from "@components/general/Input";
import { timeEventTagColorTranslate } from "@utils/ApiTranslator";
import { EnumUtil } from "@utils/EnumUtil";
import { TimePicker } from "@components/general/TimePicker";

export interface EventForm {
  tagId: number;
  name: string;
  startTime: string;
  minute: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  handleSubmit: (x: EventForm) => void;
  tags: TimeEventTag[];
  initialForm?: EventForm;
  mode: "add" | "edit";
}

export const EventFormModal = (props: Props) => {
  const [form, setForm] = createStore<EventForm>(
    props.initialForm ?? {
      tagId: props.tags[0].id,
      name: "",
      startTime: "00:00:00",
      minute: 1,
    },
  );

  const handleSubmit = async () => {
    props.handleSubmit(form);
  };

  return (
    <Modal
      open={props.open}
      title="活動"
      onClose={props.onClose}
      footer={
        <div class="w-full space-x-4 text-end">
          <Button
            disabled={
              form.name === "" ||
              (props.mode === "edit" &&
                form.tagId === props.initialForm?.tagId &&
                form.name === props.initialForm?.name &&
                form.startTime === props.initialForm?.startTime &&
                form.minute === props.initialForm?.minute)
            }
            onClick={handleSubmit}
          >
            {props.mode === "add" ? "新增" : "編輯"}
          </Button>
          <Button variant="gray" onClick={props.onClose}>
            取消
          </Button>
        </div>
      }
    >
      <div class="w-[320px] max-w-full space-y-6">
        <Select.SimpleSelect
          items={props.tags.map(x => ({ label: x.name, value: x.id.toString() }))}
          value={[form.tagId.toString()]}
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
          <TimePicker value={form.startTime} setValue={x => setForm("startTime", x)} />
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
