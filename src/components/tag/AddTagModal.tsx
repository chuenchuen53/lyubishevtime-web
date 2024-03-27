import { createSignal } from "solid-js";
import { ApiUtil } from "@utils/ApiUtil";
import { TagService } from "../../api-service";
import { TagFormModal } from "./TagFormModal";
import type { TimeEventTag } from "../../openapi";
import type { TagForm } from "./TagFormModal";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccessfulAdd: (x: TimeEventTag) => void;
}

export const AddTagModal = (props: Props) => {
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (tag: TagForm) => {
    const { timeEventTag } = await ApiUtil.loadingAndErrHandling(() => TagService.addTimeEventTag(tag), setLoading, "新增標籤失敗");
    props.onClose();
    props.onSuccessfulAdd(timeEventTag);
  };

  return (
    <TagFormModal
      open={props.open}
      onClose={props.onClose}
      submitText="新增"
      handleSubmit={handleSubmit}
      disableSubmit={x => !x.name}
      loading={loading()}
    />
  );
};
