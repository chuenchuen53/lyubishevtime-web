import { TagFormModal } from "./TagFormModal";
import type { TagForm } from "./TagFormModal";

interface Props {
  open: boolean;
  onClose: () => void;
  handleAddTag: (x: TagForm) => void;
}

export const AddTagModal = (props: Props) => {
  return <TagFormModal open={props.open} onClose={props.onClose} handleSubmit={props.handleAddTag} mode="add" />;
};
