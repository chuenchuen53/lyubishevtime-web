import { EventFormModal } from "./EventFormModal";
import type { TimeEventTag } from "src/openapi";
import type { EventForm } from "./EventFormModal";

interface Props {
  open: boolean;
  onClose: () => void;
  handleSubmit: (x: EventForm) => void;
  tags: TimeEventTag[];
}

export const AddEventModal = (props: Props) => {
  return <EventFormModal open={props.open} onClose={props.onClose} tags={props.tags} handleSubmit={props.handleSubmit} mode="add" />;
};
