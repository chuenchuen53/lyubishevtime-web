import { ApiUtil } from "@utils/ApiUtil";
import { createSignal } from "solid-js";
import { EventService } from "../../api-service";
import { EventFormModal } from "./EventFormModal";
import type { TimeEvent, TimeEventTag } from "@openapi";
import type { EventForm } from "./EventFormModal";

interface Props {
  onClose: () => void;
  onSuccessfulAdd: (x: TimeEvent) => void;
  tags: TimeEventTag[];
  initialForm: EventForm;
}

export const AddEventModal = (props: Props) => {
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (event: EventForm) => {
    const { timeEvent } = await ApiUtil.loadingAndErrHandling(() => EventService.addTimeEvent(event), setLoading, "新增活動失敗");
    props.onClose();
    props.onSuccessfulAdd(timeEvent);
  };

  return (
    <EventFormModal
      open
      onClose={props.onClose}
      submitText="新增"
      handleSubmit={handleSubmit}
      disableSubmit={x => !x.name}
      loading={loading()}
      tags={props.tags}
      initialForm={props.initialForm}
    />
  );
};
