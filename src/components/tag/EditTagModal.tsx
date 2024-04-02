import { createEffect, createSignal } from "solid-js";
import { ApiUtil } from "@utils/ApiUtil";
import { createStore } from "solid-js/store";
import { TagService } from "../../api-service";
import { TagFormModal } from "./TagFormModal";
import type { TimeEventTag } from "../../openapi";
import type { TagForm } from "./TagFormModal";

interface Props {
  onClose: () => void;
  onSuccessfulEdit: (x: TimeEventTag) => void;
  editingTag: TimeEventTag | null;
}

export const EditTagModal = (props: Props) => {
  const [form, setForm] = createStore<TagForm>({ name: "", color: "RED" });
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async () => {
    if (!props.editingTag) return;

    const newTag: TimeEventTag = {
      id: props.editingTag.id,
      name: form.name,
      color: form.color,
    };
    await ApiUtil.loadingAndErrHandling(async () => TagService.updateTimeEventTag(newTag), setLoading, "修改標籤失敗");
    props.onSuccessfulEdit(newTag);
    props.onClose();
  };

  createEffect(() => {
    if (props.editingTag) {
      setForm({ name: props.editingTag.name, color: props.editingTag.color });
    }
  });

  return (
    <TagFormModal
      open={props.editingTag !== null}
      onClose={props.onClose}
      submitText="編輯"
      handleSubmit={handleSubmit}
      disableSubmit={props.editingTag === null || !form.name || (form.color === props.editingTag.color && form.name === props.editingTag.name)}
      loading={loading()}
      form={form}
      setForm={setForm}
    />
  );
};
