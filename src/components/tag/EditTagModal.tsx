import { createMemo, createSignal } from "solid-js";
import { ApiUtil } from "@utils/ApiUtil";
import { TagService } from "../../api-service";
import { TagFormModal } from "./TagFormModal";
import type { TimeEventTag } from "../../openapi";
import type { TagForm } from "./TagFormModal";

interface Props {
  onClose: () => void;
  onSuccessfulEdit: (x: TimeEventTag) => void;
  editingTag: TimeEventTag;
}

export const EditTagModal = (props: Props) => {
  const initialForm = createMemo<TagForm>(() => ({ name: props.editingTag.name, color: props.editingTag.color }));

  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (tag: TagForm) => {
    const newTag: TimeEventTag = {
      id: props.editingTag.id,
      name: tag.name,
      color: tag.color,
    };
    await ApiUtil.loadingAndErrHandling(async () => TagService.updateTimeEventTag(newTag), setLoading, "修改標籤失敗");
    props.onClose();
    props.onSuccessfulEdit(newTag);
  };

  return (
    <TagFormModal
      open
      onClose={props.onClose}
      submitText="編輯"
      handleSubmit={handleSubmit}
      disableSubmit={x => !x.name || (x.color === initialForm().color && x.name === initialForm().name)}
      loading={loading()}
      initialForm={initialForm()}
    />
  );
};
