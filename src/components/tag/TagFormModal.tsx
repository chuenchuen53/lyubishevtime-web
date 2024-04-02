import { Button } from "@components/general/Button";
import { Modal } from "@components/general/Modal";
import { SingleSelect } from "@components/general/Select";
import { Input } from "@components/general/Input";
import { timeEventTagColorTranslate } from "@utils/ApiTranslator";
import { EnumUtil } from "@utils/EnumUtil";
import { TagColorUtil } from "@utils/TagColorUtil";
import { TimeEventTagColor } from "../../openapi";
import type { SetStoreFunction } from "solid-js/store";

export interface TagForm {
  color: TimeEventTagColor;
  name: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  submitText: string;
  disableSubmit: boolean;
  handleSubmit: () => Promise<void>;
  loading: boolean;
  form: TagForm;
  setForm: SetStoreFunction<TagForm>;
}

const colorItems = EnumUtil.values(TimeEventTagColor).map(x => ({
  label: timeEventTagColorTranslate(x),
  value: x,
}));

export const TagFormModal = (props: Props) => {
  return (
    <Modal
      open={props.open}
      title="活動標籤"
      onClose={props.onClose}
      footer={
        <div class="w-full space-x-4 text-end">
          <Button disabled={props.disableSubmit} loading={props.loading} onClick={props.handleSubmit}>
            {props.submitText}
          </Button>
          <Button variant="gray" onClick={props.onClose}>
            取消
          </Button>
        </div>
      }
    >
      <div class="w-[320px] max-w-full space-y-6">
        <div>
          <label for="name-input" class="mb-2 block text-sm font-medium">
            標籤名稱 *
          </label>
          <Input
            id="name-input"
            class="w-full"
            type="text"
            value={props.form.name}
            required
            onInput={e => props.setForm("name", e.currentTarget.value)}
          />
        </div>

        <SingleSelect
          items={colorItems}
          value={props.form.color}
          onValueChange={x => props.setForm("color", x)}
          label="標籤顏色 *"
          id="tag-color-select"
          renderItem={item => (
            <div class="flex items-center gap-2">
              <div class={`size-4 ${TagColorUtil.main(item.value)}`} />
              {item.label}
            </div>
          )}
          renderSelected={vt => (
            <div class="flex items-center gap-2">
              <div class={`size-4 ${TagColorUtil.main(props.form.color)}`} />
              {vt}
            </div>
          )}
        />
      </div>
    </Modal>
  );
};
