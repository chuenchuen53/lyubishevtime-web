import { createSignal } from "solid-js";
import { ApiUtil } from "@utils/ApiUtil";
import { EventService } from "../../api-service";
import { EventFormModal } from "./EventFormModal";
import type { TimeEvent, TimeEventTag, UpdateTimeEventRequest } from "@openapi";
import type { EventForm } from "./EventFormModal";

interface Props {
  onClose: () => void;
  onSuccessfulEdit: (x: TimeEvent) => void;
  tags: TimeEventTag[];
  initialForm: TimeEvent;
}

export const EditEventModal = (props: Props) => {
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (editedEvent: EventForm) => {
    const newEvent: UpdateTimeEventRequest = {
      id: props.initialForm.id,
      tagId: editedEvent.tagId,
      name: editedEvent.name,
      startTime: editedEvent.startTime,
      minute: editedEvent.minute,
    };
    await ApiUtil.loadingAndErrHandling(() => EventService.updateTimeEvent(newEvent), setLoading, "修改活動失敗");
    props.onSuccessfulEdit({ ...newEvent, date: props.initialForm.date });
    props.onClose();
  };

  return (
    <EventFormModal
      open
      onClose={props.onClose}
      submitText="編輯"
      handleSubmit={handleSubmit}
      disableSubmit={x =>
        !x.name ||
        (x.tagId === props.initialForm.tagId &&
          x.name === props.initialForm.name &&
          x.startTime === props.initialForm.startTime &&
          x.minute === props.initialForm.minute)
      }
      loading={loading()}
      tags={props.tags}
      initialForm={props.initialForm}
    />
  );
};
