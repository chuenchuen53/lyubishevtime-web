import { TagForm, TagFormModal } from "./TagFormModal";

interface Props {
  open: boolean;
  onClose: () => void;
  handleSubmitEditTag: (x: TagForm) => void;
  initialForm: TagForm;
}

export const EditTagModal = (props: Props) => {
  return (
    <TagFormModal open={props.open} onClose={props.onClose} handleSubmit={props.handleSubmitEditTag} mode="edit" initialForm={props.initialForm} />
  );
};
