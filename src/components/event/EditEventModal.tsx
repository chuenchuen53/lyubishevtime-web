import { TimeEventTag } from "src/openapi";
import { EventForm, EventFormModal } from "./EventFormModal";

interface Props {
  open: boolean;
  onClose: () => void;
  handleSubmit: (x: EventForm) => void;
  tags: TimeEventTag[];
  initialForm: EventForm;
}

export const EditEventModal = (props: Props) => {
  return (
    <EventFormModal
      open={props.open}
      onClose={props.onClose}
      tags={props.tags}
      handleSubmit={props.handleSubmit}
      mode="edit"
      initialForm={props.initialForm}
    />
  );
};
