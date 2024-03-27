import { Button } from "@components/general/Button";
import { Modal } from "@components/general/Modal";
import { SingleSelect } from "@components/general/Select";
import { createStore } from "solid-js/store";
import { Input } from "@components/general/Input";
import { timeEventTagColorTranslate } from "@utils/ApiTranslator";
import { EnumUtil } from "@utils/EnumUtil";
import { TagColorUtil } from "@utils/TagColorUtil";
import { TimeEventTagColor } from "../../openapi";

export interface TagForm {
  color: TimeEventTagColor;
  name: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  submitText: string;
  handleSubmit: (x: TagForm) => Promise<void>;
  disableSubmit: (tagForm: TagForm) => boolean;
  loading: boolean;
  initialForm?: TagForm;
}

const colorItems = EnumUtil.values(TimeEventTagColor).map(x => ({
  label: timeEventTagColorTranslate(x),
  value: x,
}));

export const TagFormModal = (props: Props) => {
  const [form, setForm] = createStore<TagForm>(
    props.initialForm
      ? { ...props.initialForm }
      : {
          color: colorItems[0].value,
          name: "",
        },
  );

  const handleSubmit = async () => {
    await props.handleSubmit(form);
  };

  return (
    <Modal
      open={props.open}
      title="活動標籤"
      onClose={props.onClose}
      footer={
        <div class="w-full space-x-4 text-end">
          <Button disabled={props.disableSubmit(form)} loading={props.loading} onClick={handleSubmit}>
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
          <Input id="name-input" class="w-full" type="text" value={form.name} required onInput={e => setForm("name", e.currentTarget.value)} />
        </div>

        <SingleSelect
          items={colorItems}
          value={form.color}
          onValueChange={x => setForm("color", x)}
          label="標籤顏色 *"
          id="tag-color-select"
          renderItem={item => (
            <div class="flex items-center gap-2">
              <div class={`size-4 ${TagColorUtil.main(item.value)}`} />
              {item.label}
            </div>
          )}
        />
      </div>
    </Modal>
  );
};
