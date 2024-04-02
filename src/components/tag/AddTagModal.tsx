import { createSignal } from "solid-js";
import { ApiUtil } from "@utils/ApiUtil";
import { createStore } from "solid-js/store";
import { TagService } from "../../api-service";
import { TagFormModal } from "./TagFormModal";
import type { TimeEventTag } from "../../openapi";
import type { TagForm } from "./TagFormModal";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccessfulAdd: (x: TimeEventTag) => void;
}

const initialForm: () => TagForm = () => ({
  name: "",
  color: "RED",
});

export const AddTagModal = (props: Props) => {
  const [form, setForm] = createStore<TagForm>(initialForm());
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async () => {
    const { timeEventTag } = await ApiUtil.loadingAndErrHandling(() => TagService.addTimeEventTag(form), setLoading, "新增標籤失敗");
    props.onSuccessfulAdd(timeEventTag);
    setForm(initialForm());
    props.onClose();
  };

  return (
    <TagFormModal
      open={props.open}
      onClose={props.onClose}
      submitText="新增"
      handleSubmit={handleSubmit}
      disableSubmit={!form.name}
      loading={loading()}
      form={form}
      setForm={setForm}
    />
  );
};
