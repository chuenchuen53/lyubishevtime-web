import { createEffect, createSignal } from "solid-js";
import { ApiUtil } from "@utils/ApiUtil";
import { createStore } from "solid-js/store";
import { DateUtil } from "@utils/DateUtil";
import { EventService } from "../../api-service";
import { EventFormModal } from "./EventFormModal";
import type { TimeEvent, TimeEventTag, UpdateTimeEventRequest } from "@openapi";
import type { EventForm } from "./EventFormModal";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccessfulEdit: (x: TimeEvent) => void;
  tags: TimeEventTag[];
  editingEvent: TimeEvent | null;
}

export const EditEventModal = (props: Props) => {
  const [form, setForm] = createStore<EventForm>({
    date: DateUtil.todayString(),
    tagId: -1,
    minute: 1,
    name: "",
    startTime: "00:00:00",
  });
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async () => {
    if (!props.editingEvent) return;
    const newEvent: UpdateTimeEventRequest = {
      id: props.editingEvent.id,
      tagId: form.tagId,
      name: form.name,
      startTime: form.startTime,
      minute: form.minute,
    };
    await ApiUtil.loadingAndErrHandling(() => EventService.updateTimeEvent(newEvent), setLoading, "修改活動失敗");
    props.onSuccessfulEdit({ ...newEvent, date: props.editingEvent.date });
    props.onClose();
  };

  createEffect(() => {
    if (props.editingEvent) {
      setForm({
        date: props.editingEvent.date,
        tagId: props.editingEvent.tagId,
        minute: props.editingEvent.minute,
        name: props.editingEvent.name,
        startTime: props.editingEvent.startTime,
      });
    }
  });

  return (
    <EventFormModal
      open={props.open}
      onClose={props.onClose}
      submitText="編輯"
      handleSubmit={handleSubmit}
      disableSubmit={
        props.editingEvent === null ||
        !form.name ||
        (form.tagId === props.editingEvent.tagId &&
          form.name === props.editingEvent.name &&
          form.startTime === props.editingEvent.startTime &&
          form.minute === props.editingEvent.minute)
      }
      loading={loading()}
      tags={props.tags}
      form={form}
      setForm={setForm}
    />
  );
};
